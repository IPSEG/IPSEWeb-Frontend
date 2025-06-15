import {BASE_TRAFFIC_VERSION_1, BASE_URL, fetchData, TEST, TEST_URL, WEB_PORT} from "../CommonApi.ts";


export async function fetchCardGroupList() {

    const url: string = TEST ? `${TEST_URL}/card-group` :
        `${BASE_URL}:${WEB_PORT}/${BASE_TRAFFIC_VERSION_1}/card-group`;

    return await fetchData(url);

}