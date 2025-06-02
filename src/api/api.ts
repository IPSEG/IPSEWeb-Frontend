const BASE_URL = `http://localhost`;
const WEB_PORT = `8081`;
const BASE_TRAFFIC_VERSION_1 = `api/v1/traffic`;

const TEST_URL = `https://my-json-server.typicode.com/IPSEG/IPSEWeb-Frontend-DB`;
const TEST: boolean = true;

async function fetchData(url: string) {
    try {
        const response = await fetch(url);
        const json = await response.json();

        if (json.code !== 200 || json.status !== "OK" || json.message !== "success") {
            alert(`Error: ${json.message || "API 요청 중 문제가 발생했습니다."}`);
            return [];
        }
        return json.data;
    } catch (error) {
        alert(`네트워크 오류가 발생했습니다. : ${error}`);
        return [];
    }
}

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