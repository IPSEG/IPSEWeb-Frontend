import {useLocation, useParams} from "react-router-dom";
// @ts-ignore
import React, {useEffect, useMemo, useState} from "react";

// @ts-ignore
import {fetchBusArriveInfoByBusStopId, fetchBusRouteBasicInfoByCityCodeAndRouteId} from "../../../api/api.ts";
// @ts-ignore
import {
    ArrivalInfo,
    BusInfoContainer,
    BusListContainer, BusNumber,
    BusStopContainer, BusStopId, BusStopIdAndNameContainer, BusStopName,
    Container, Divider, RegionTag, RouteInfo,
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

    // const [busArrivalMap, setBusArrivalMap] = useState<Map<number, BusArrivalData>>(new Map());

    // useEffect(() => {
    //     if (busArrivalData) {
    //         const newMap = new Map<number, BusArrivalData>();
    //         busArrivalData.forEach((bus) => newMap.set(bus.route_no, bus));
    //
    //         console.log(newMap);
    //         setBusArrivalMap(newMap);
    //
    //     }
    // }, [busArrivalData]); // busArrivalData 변경 시 실행
    const busArrivalMap = useMemo(() => {
        if (!busArrivalData) return new Map<number, BusArrivalData>();

        const newMap = new Map<number, BusArrivalData>();
        busArrivalData.forEach((bus) => newMap.set(bus.route_no, bus));

        console.log(newMap);

        return newMap;
    }, [busArrivalData]);


    return (
        <Container>
            <BusStopContainer>
                <BusStopIdAndNameContainer>
                    <BusStopName>{state.bus_stop_name}</BusStopName>
                    (<BusStopId>{busStopId}</BusStopId>)
                </BusStopIdAndNameContainer>
            </BusStopContainer>


            <Divider/>
            {/*도착 예정 버스 정보를 보여준다. 우선 routeNo만 보여줘볼까 : 완료*/}
            {/*리스트를 좀더 고급지게 만들어봐야겠군 : 진행중..*/}
            <div>
                {isLoadingBusRouteBasicInfo || isLoadingBusArrival || busArrivalMap.size === 0 ? (
                    <p>Loading more...</p>
                ) : busRouteBasicInfo.length === 0 ? ( // 배열이 비어 있으면
                        <p>No data available.</p>
                    ) :
                    (
                        <BusListContainer>
                            {busRouteBasicInfo.map((busRoute)=> (
                                <BusInfoContainer key={busRoute.route_id}>
                                    <div>
                                        <BusNumber>{busRoute.route_no}</BusNumber>
                                        <RegionTag>{state.city}</RegionTag>
                                        <RouteInfo>{busRoute.end_node_name} 방면</RouteInfo>
                                    </div>
                                    <ArrivalInfo>
                                        {(() => {
                                            console.log(`Route No: ${busRoute.route_no}, Arrival Time:`, busArrivalMap.get(busRoute.route_no));
                                            return "정보 없음";
                                        })()}
                                    </ArrivalInfo>
                                </BusInfoContainer>

                            ))}
                        </BusListContainer>

                    )
                }
            </div>


        </Container>
    );
}

export default BusArrival;