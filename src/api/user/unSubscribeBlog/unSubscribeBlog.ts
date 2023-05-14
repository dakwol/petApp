import { API_BASE_URL, apiCall } from "../../api";
import { API_USERS_MODEL } from "../const";

export const unSubscribeBlog = async (event_id: any) => {
    const methodUrl = [API_USERS_MODEL.url, API_USERS_MODEL.methods.unSubscribeBlog.url].join('/');
    const resp = await apiCall('post', API_BASE_URL + methodUrl + '/' + event_id);

    if (resp?.data?.status == "success") {
        return { "success": true, data: resp?.data };
    } else {
        return { "success": false, data: {}, message: resp?.data?.message ?? 'unknownError' };
    }

}

