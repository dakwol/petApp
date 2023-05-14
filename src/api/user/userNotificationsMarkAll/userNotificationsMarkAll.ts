
import { API_BASE_URL, apiCall } from "../../api";
import { API_USERS_MODEL } from "../const";

export const userNotificationsMarkAll = async () => {
    const methodUrl = [API_USERS_MODEL.url, API_USERS_MODEL.methods.userNotificationsMarkAll.url].join('/');
    const resp = await apiCall('post', API_BASE_URL + methodUrl);
    if (resp) {
        return { "success": true, data: resp };
    } else {
        return { "error": false, message: 'unknownError' };
    }

}
