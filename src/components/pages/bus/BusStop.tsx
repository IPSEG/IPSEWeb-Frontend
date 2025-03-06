import {useForm, useWatch} from "react-hook-form";
import {useQuery, useInfiniteQuery} from "react-query";
// @ts-ignore
import {fetchBusStopListByNameOrId} from "../../../api/api.ts";
import {useEffect, useMemo, useRef} from "react";
// @ts-ignore
import {BusStopBottomRow, BusStopInfo, BusStopLocation, BusStopName, BusStopTopRow, Wrapper} from "../../../css/bus/BusStop.styles.ts";


interface IForm {
    busStopNameOrId: string
}


interface IBusStopList {
    bus_stop_id: string,
    bus_stop_name: string,
    city_code: string,
    city: string,
    detail_city: string
}


interface IBusStopPageData {
    bus_stop_list : IBusStopList[],
    has_next : boolean,
    has_previous : boolean,
    page_count : number,
    current_page_number: number;
}


function BusStop() {
    const {control, handleSubmit} = useForm<IForm>();

    const search = useWatch({control, name: "busStopNameOrId"});

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["search", search],
        queryFn: ({ pageParam = 0 }) => fetchBusStopListByNameOrId(search, pageParam),
        initialPageParam: 0,
        getNextPageParam: (lastPage : IBusStopPageData, allPages: IBusStopPageData[]) => {
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
            { threshold: 1 }
        );

        if (observerRef.current) observer.observe(observerRef.current);

        return () => observer.disconnect();
    }, [hasNextPage, fetchNextPage]);

    const groupedData = useMemo(() => {


        if (!data) return {};

        return data.pages.flatMap((page) => page.bus_stop_list).reduce<Record<string, IBusStopList[]>>((acc, busStop : IBusStopList) => {
            if (!acc[busStop.city]) {
                acc[busStop.city] = [];
            }
            acc[busStop.city].push(busStop);
            return acc;
        }, {});
    }, [data]);


    return (
        <Wrapper>
            <form onChange={handleSubmit(() => {
                console.log(data)
            })}>
                <input {...control.register("busStopNameOrId")} type="text" placeholder="정류장, 정류장 번호(ID) 검색"/>
            </form>

            { (
                Object.entries(groupedData).map(([city, busStops]) => (
                    <div key={city}>
                        <BusStopLocation>{city}</BusStopLocation>
                        <ul>
                            {busStops.slice(0, 10).map((busStop) => (
                                <BusStopInfo key={busStop.bus_stop_id}>
                                    <BusStopTopRow>
                                        <BusStopName>{busStop.bus_stop_name}</BusStopName>
                                    </BusStopTopRow>
                                    <BusStopBottomRow>{busStop.bus_stop_id}</BusStopBottomRow>
                                </BusStopInfo>
                            ))}
                        </ul>
                    </div>
                ))
            )
            }

            {/* 로딩 중일 때 표시 */}
            {isFetchingNextPage && <p>Loading more...</p>}

            {/* 마지막 요소 (Intersection Observer 대상) */}
            <div ref={observerRef} style={{ height: "10px" }} />

        </Wrapper>


    )
}

export default BusStop;