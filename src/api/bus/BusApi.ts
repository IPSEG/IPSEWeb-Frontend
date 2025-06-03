import {BASE_TRAFFIC_VERSION_1, BASE_URL, fetchData, TEST, TEST_URL, WEB_PORT} from "../CommonApi.ts";


export async function fetchBusStopListByNameOrId(busStopNameOrId: string, pageNumber : number) {

    const url: string = TEST ? `${TEST_URL}/busstop` :
        `${BASE_URL}:${WEB_PORT}/${BASE_TRAFFIC_VERSION_1}/bus-stop?pageNumber=${pageNumber}&busStopName=${busStopNameOrId}`;

    return await fetchData(url);
}

export async function fetchBusArriveInfoByBusStopId(busStopId: string) {

    const url: string = TEST ? `${TEST_URL}/busarrival` :
        `${BASE_URL}:${WEB_PORT}/${BASE_TRAFFIC_VERSION_1}/bus-arrival?busStopId=${busStopId}`;

    return await fetchData(url);
}

export async function fetchBusRouteBasicInfoByCityCodeAndRouteId(cityCode: string, routeId: string) {

    const url: string = TEST ? `${TEST_URL}/busroute/basic` :
        `${BASE_URL}:${WEB_PORT}/${BASE_TRAFFIC_VERSION_1}/bus-route/basic?cityCode=${cityCode}&routeId=${routeId}`;

    return await fetchData(url);
}