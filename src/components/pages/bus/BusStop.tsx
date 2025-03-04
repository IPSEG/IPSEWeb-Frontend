import {useForm, useWatch} from "react-hook-form";
import {useQuery} from "react-query";
// @ts-ignore
import {fetchBusStopListByNameOrId} from "../../../api/api.ts";
import {useMemo} from "react";
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


function BusStop() {
    const {control, handleSubmit} = useForm<IForm>();

    const search = useWatch({control, name: "busStopNameOrId"});

    const {data, isLoading} = useQuery<IBusStopList[]>({
            queryKey: ["search", search],
            queryFn: () => fetchBusStopListByNameOrId(search),
            enabled: !!search,
        }
    );

    const groupedData = useMemo(() => {

        if (!data) return {}; // 데이터가 없으면 빈 객체 반환

        return data.reduce<Record<string, IBusStopList[]>>((acc, busStop) => {
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

            {isLoading ? <p>Loading....</p> : (
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

        </Wrapper>


    )
}

export default BusStop;