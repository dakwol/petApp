import { API_EVENTS_MODEL } from "../../events/const";
import { API_BASE_URL, apiCall } from "../../api";

export const getEventClaimTopics = async () => {
    const methodUrl = [API_EVENTS_MODEL.url, API_EVENTS_MODEL.methods.eventClaimTopics.url].join('/');
    const resp = await apiCall('get', API_BASE_URL + methodUrl);

    if (resp) {
        console.log(resp.data)
        return resp.data;

    } else {
        return [];
    }
}
