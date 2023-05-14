import { API_BASE_URL, apiCall } from "../../api";
import { API_USERS_MODEL } from "../const";

export const userSubscribes = async (user_id: any) => {
    const methodUrl = [API_USERS_MODEL.url, API_USERS_MODEL.methods.userSubscribes.url].join('/');
    const resp = await apiCall('post', API_BASE_URL + methodUrl + ('/') + user_id);
    //@ts-ignore
    if (resp?.data?.status == "success") {
        return { "success": true, data: resp.data };
    } else {
        return { "success": false, data: {}, message: resp?.data?.message ?? 'unknownError' };
    }

}
