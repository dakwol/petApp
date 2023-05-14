import { API_BASE_URL, apiCall } from "../../api";
import { API_EVENTS_MODEL } from "../../events/const";

export const createClaimClaims = async (payload: { event_id: any, topic_id: any, text: string }) => {
    const methodUrl = [API_EVENTS_MODEL.url, API_EVENTS_MODEL.methods.eventClaimCreate.url].join('/');
    console.log(API_BASE_URL + methodUrl)
    console.log(payload)
    const resp = await apiCall('post', API_BASE_URL + methodUrl, payload);

    if (resp?.data?.status == "success") {
        return { "success": true, data: resp?.data?.message };
    } else {
        return { "success": false, data: {}, message: resp?.data?.message ?? 'unknownError' };
    }

}

