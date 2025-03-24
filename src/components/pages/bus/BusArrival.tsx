import {useLocation, useParams} from "react-router-dom";
// @ts-ignore
import React, {useEffect} from "react";

// @ts-ignore
import {fetchBusArriveInfoByBusStopId, fetchBusRouteBasicInfoByCityCodeAndRouteId} from "../../../api/api.ts";
// @ts-ignore
import {
    BusStopContainer, BusStopId, BusStopIdAndNameContainer, BusStopName,
    Container, Divider,
    Title
} from "../../../css/bus/BusArrival.styles.ts";
// @ts-ignore
import {BusArrivalData, BusRouteBasicInfo, IBusStopList} from "../../../type/bus/Bus.ts";
import {useQueries, useQuery} from "@tanstack/react-query";


interface RouteParams {
    cityCode: string;
    busStopId: string;
}


function BusArrival() {

    const {cityCode, busStopId} = useParams<RouteParams>();
    const location = useLocation();
    const state: { busStop: IBusStopList } | null = location.state as { busStop: IBusStopList } | null;

    const {isLoading: isLoadingBusArrival, data: busArrivalData} = useQuery<BusArrivalData[]>({
            queryKey: ["busArrivalData"],
            queryFn: () => fetchBusArriveInfoByBusStopId(busStopId),
        }
    )

    // busArrivalData가 로드되었을 때만 useQueries를 호출하도록 변경
    const busRouteBasicInfoQueries = useQueries({
        queries: busArrivalData
            ? busArrivalData.map((busArrival) => ({
                queryKey: ["busRouteBasicInfo", busArrival.route_id],
                queryFn: () =>
                    fetchBusRouteBasicInfoByCityCodeAndRouteId(cityCode, busArrival.route_id),
            }))
            : [], // busArrivalData가 없을 경우 빈 배열을 넘겨줍니다.
    });

    const isLoadingBusRouteBasicInfo = busRouteBasicInfoQueries.every(query => query.isLoading);

    const busRouteBasicInfo: BusRouteBasicInfo[] = busRouteBasicInfoQueries
        .map(query => query.data)
        .filter((data): data is BusRouteBasicInfo => data !== undefined);

    useEffect(() => {
        console.log("busRouteBasicInfo updated : ", busRouteBasicInfo)
    }, [busRouteBasicInfo])


    return (
        <Container>
            <BusStopContainer>
                <BusStopIdAndNameContainer>
                    <BusStopId>{busStopId}</BusStopId>
                    <BusStopName>{state.bus_stop_name}</BusStopName>
                </BusStopIdAndNameContainer>
            </BusStopContainer>


            <Divider/>
            {/*도착 예정 버스 정보를 보여준다. 우선 routeNo만 보여줘볼까*/}
            <div>
                {isLoadingBusRouteBasicInfo ? (
                    <p>Loading more...</p>
                ) : busRouteBasicInfo.length === 0 ? ( // 배열이 비어 있으면
                        <p>No data available.</p>
                    ) :
                    (
                        <ul>
                            {busRouteBasicInfo.map((busRoute) => (
                                <li key={busRoute.route_id}>{busRoute.route_no}|{busRoute.end_node_name}방면
                                </li>
                            ))}
                        </ul>
                    )
                }
            </div>


        </Container>
    );
}

export default BusArrival;