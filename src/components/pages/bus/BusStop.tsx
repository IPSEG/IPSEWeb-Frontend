// @ts-ignore
import {useForm, useWatch} from "react-hook-form";

// @ts-ignore
import {fetchBusStopListByNameOrId} from "../../../api/api.ts";
// @ts-ignore
import React, {useEffect, useMemo, useRef} from "react";
// @ts-ignore
import {
    BusStopBottomRow,
    BusStopInfo,
    BusStopLocation,
    BusStopName,
    BusStopTopRow, StyledLink,
    Wrapper
} from "../../../css/bus/BusStop.styles.ts";
// @ts-ignore
import {IBusStopList, IBusStopPageData, IForm} from "../../../type/bus/Bus.ts";
import {useInfiniteQuery} from "@tanstack/react-query";
import {useSearchParams} from "react-router-dom";


function BusStop() {
    const [searchParams, setSearchParams] = useSearchParams();
    const defaultSearch = searchParams.get("q") || "";

    const {control, handleSubmit, register, setValue} = useForm<IForm>({
        defaultValues: { busStopNameOrId: defaultSearch}
    });

    const search = useWatch({control, name: "busStopNameOrId"});

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["search", search],
        queryFn: ({pageParam = 0}) => fetchBusStopListByNameOrId(search, pageParam),
        initialPageParam: 0,
        getNextPageParam: (lastPage: IBusStopPageData, allPages: IBusStopPageData[]) => {
            return lastPage.has_next ? lastPage.current_page_number + 1 : undefined;
        },
        enabled: !!search,
    });

    const observerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage) {
                    fetchNextPage();
                }
            },
            {threshold: 1}
        );

        if (observerRef.current) observer.observe(observerRef.current);

        return () => observer.disconnect();
    }, [hasNextPage, fetchNextPage]);

    const groupedData = useMemo(() => {

        if (!data) return {};

        return data.pages.flatMap((page) => page.bus_stop_list).reduce<Record<string, IBusStopList[]>>((acc, busStop: IBusStopList) => {
            if (!acc[busStop.city]) {
                acc[busStop.city] = [];
            }
            acc[busStop.city].push(busStop);
            return acc;
        }, {});
    }, [data]);


    return (
        <Wrapper>
            <form onChange={handleSubmit((values) => {
                setSearchParams({q: values.busStopNameOrId});
            })}>
                <input {...control.register("busStopNameOrId")} type="text" placeholder="정류장, 정류장 번호(ID) 검색"/>
            </form>

            {(
                Object.entries(groupedData).map(([city, busStops]) => (
                    <div key={city}>
                        <BusStopLocation>{city}</BusStopLocation>
                        <ul>
                            {busStops.slice(0, 10).map((busStop) => (
                                <StyledLink to={`${busStop.city_code}/${busStop.bus_stop_id}`} state={busStop}>
                                    <BusStopInfo key={busStop.bus_stop_id}>
                                        <BusStopTopRow>
                                            <BusStopName>{busStop.bus_stop_name}</BusStopName>
                                        </BusStopTopRow>
                                        <BusStopBottomRow>{busStop.bus_stop_id}</BusStopBottomRow>
                                    </BusStopInfo>
                                </StyledLink>
                            ))}
                        </ul>
                    </div>
                ))
            )
            }
            {isFetchingNextPage && <p>Loading more...</p>}

            <div ref={observerRef} style={{height: "10px"}}/>

        </Wrapper>


    )
}

export default BusStop;