const BASE_URL = `http://localhost`;
const WEB_PORT = `8080`;
const VERSION_1 = `v1`;
const BASE_TRAFFIC = `api/traffic`;

const TEST_URL = `https://my-json-server.typicode.com/IPSEG/IPSEWeb-Frontend-DB`;
const TEST: boolean = false;

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

export async function fetchBusStopListByNameOrId(busStopNameOrId: string) {

    const url: string = TEST ? `${TEST_URL}/busstop` :
        `${BASE_URL}:${WEB_PORT}/${BASE_TRAFFIC}/bus-stop/${VERSION_1}?busStopName=${busStopNameOrId}`;

    return await fetchData(url);
}