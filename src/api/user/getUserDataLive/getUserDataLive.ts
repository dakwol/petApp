import { API_BASE_URL, apiCall } from "../../api";
import { API_USERS_MODEL } from "../const";
import { IApiReturn } from "../../../types/api";

export const getUserDataLive = async(payload:any) => {
    const methodUrl = [API_USERS_MODEL.url, API_USERS_MODEL.methods.getUserDataLive.url].join('/');
    const resp = await apiCall('post', API_BASE_URL + methodUrl, payload);
    if (resp?.data) {
        return { "success": true, data: resp?.data?.data };
    } else {
        return { "success": false, data: {}, message: resp?.data?.message ?? 'unknownError' };
    }

}
