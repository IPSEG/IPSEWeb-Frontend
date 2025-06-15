import {useLocation, useNavigate, useParams} from "react-router-dom";
// @ts-ignore
import React, {useEffect, useMemo, useState} from "react";

// @ts-ignore
import {fetchBusArriveInfoByBusStopId, fetchBusRouteBasicInfoByCityCodeAndRouteId} from "../../../api/bus/BusApi.ts";
// @ts-ignore
import {
    ArrivalInfo, BackButton,
    BusInfoContainer,
    BusListContainer, BusNumber,
    BusStopContainer, BusStopId, BusStopIdAndNameContainer, BusStopName, BusTypeTag,
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
    const navigate = useNavigate();

    const {isLoading: isLoadingBusArrival, data: busArrivalData} = useQuery<BusArrivalData[]>({
            queryKey: ["busArrivalData"],
            queryFn: () => fetchBusArriveInfoByBusStopId(busStopId),
        }
    )

    const memoizedQueries = useMemo(() => {
        if (!busArrivalData) return [];

        return busArrivalData.map((busArrival) => ({
            queryKey: ["busRouteBasicInfo", cityCode, busArrival.route_id], // cityCode 포함
            queryFn: () =>
                fetchBusRouteBasicInfoByCityCodeAndRouteId(cityCode, busArrival.route_id),
            staleTime: 1000 * 60 * 5,
        }));
    }, [busArrivalData, cityCode]);

    const busRouteBasicInfoQueries = useQueries({
        queries: memoizedQueries,
    });

    const isLoadingBusRouteBasicInfo = busRouteBasicInfoQueries.every(query => query.isLoading);

    const busRouteBasicInfo: BusRouteBasicInfo[] = busRouteBasicInfoQueries
        .map(query => query.data)
        .filter((data): data is BusRouteBasicInfo => data !== undefined);

    const busArrivalMap = useMemo(() => {
        if (!busArrivalData) return new Map<number, BusArrivalData>();

        const newMap = new Map<number, BusArrivalData>();
        busArrivalData.forEach((bus) => newMap.set(bus.route_no, bus));

        return newMap;
    }, [busArrivalData]);


    return (
        <Container>
            <BusStopContainer>
                <BusStopIdAndNameContainer>
                    <BackButton onClick={() => navigate(-1)}>←</BackButton>
                    <BusStopName>{state.bus_stop_name}</BusStopName>
                    (<BusStopId>{busStopId}</BusStopId>)
                </BusStopIdAndNameContainer>
            </BusStopContainer>


            <Divider/>
            <div>
                {isLoadingBusRouteBasicInfo || isLoadingBusArrival || busArrivalMap.size === 0 ? (
                    <p>Loading more...</p>
                ) : busRouteBasicInfo.length === 0 ? (
                        <p>No data available.</p>
                    ) :
                    (
                        <BusListContainer>
                            {busRouteBasicInfo.map((busRoute) => (
                                <BusInfoContainer key={busRoute.route_id}>
                                    <div>
                                        <BusNumber>{busRoute.route_no}</BusNumber>
                                        <RegionTag>{state.city}</RegionTag>
                                        {(() => {
                                            const busArrival = busArrivalMap.get(String(busRoute.route_no));
                                            return busArrival?.route_type ? (
                                                <BusTypeTag isExpress={busArrival.route_type === "급행버스"}>
                                                    {busArrival.route_type}
                                                </BusTypeTag>
                                            ) : null;
                                        })()}
                                        <RouteInfo>{busRoute.end_node_name} 방면</RouteInfo>
                                    </div>
                                    <ArrivalInfo>
                                        {(() => {
                                            const busArrival = busArrivalMap.get(String(busRoute.route_no));
                                            if (!busArrival) return "정보 없음";

                                            const arrive_minutes = Math.floor(Number(busArrival.arrive_seconds) / 60);
                                            return `${arrive_minutes.toFixed(0)}분 후 도착`;
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