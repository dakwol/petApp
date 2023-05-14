import { API_BASE_URL, apiCall } from "../../api";
import { API_USERS_MODEL } from "../const";

export const userNotification = async () => {
    const methodUrl = [API_USERS_MODEL.url, API_USERS_MODEL.methods.userNotification.url].join('/');
    const resp = await apiCall('get', API_BASE_URL + methodUrl);
    if (resp.data) {
        return { "success": true, data: resp?.data };
    } else {
        return { "success": false, data: {}, message: resp?.data?.message ?? 'unknownError' };
    }

}
