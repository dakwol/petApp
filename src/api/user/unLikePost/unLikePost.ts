import { API_BASE_URL, apiCall } from "../../api";
import { API_EVENTS_MODEL } from "../../events/const";

export const unLikePost = async (event_id: any) => {
    const methodUrl = [API_EVENTS_MODEL.url, API_EVENTS_MODEL.methods.eventUnLike.url].join('/');
    const resp = await apiCall('post', API_BASE_URL + methodUrl + '/' + event_id);

    if (resp?.data?.status == "success") {
        return { "success": true, data: resp?.data?.message };
    } else {
        return { "success": false, data: {}, message: resp?.data?.message ?? 'unknownError' };
    }

}

