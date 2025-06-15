export const BASE_URL = `http://localhost`;
export const WEB_PORT = `8081`;
export const BASE_TRAFFIC_VERSION_1 = `api/v1/traffic`;

export const TEST_URL = `https://my-json-server.typicode.com/IPSEG/IPSEWeb-Frontend-DB`;
export const TEST: boolean = false;

export async function fetchData(url: string) {
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