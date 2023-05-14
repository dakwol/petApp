import { API_BASE_URL, apiCall } from "../../api";
import { API_EVENTS_MODEL } from "../../events/const";

export const eventClaimUpdate = async (payload: { event_claim_id: any, is_open: number, moderator_comment: string }) => {
    const methodUrl = [API_EVENTS_MODEL.url, API_EVENTS_MODEL.methods.eventClaimUpdate.url].join('/');
    console.log(API_BASE_URL + methodUrl)
    console.log(payload)
    const resp = await apiCall('post', API_BASE_URL + methodUrl, payload);

    if (resp?.data?.status == "success") {
        return { "success": true, data: resp };
    } else {
        return { "success": false, data: {}, message: resp?.data?.message ?? 'unknownError' };
    }

}

