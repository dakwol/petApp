import { API_BASE_URL, apiCall } from "../../api";
import { API_USERS_MODEL } from "../const";
import { IApiReturn } from "../../../types/api";

export const getStories = async (): Promise<IApiReturn<any>> => {
    const methodUrl = [API_USERS_MODEL.url, API_USERS_MODEL.methods.getStories.url].join('/');
    const resp = await apiCall('post', API_BASE_URL + methodUrl, { is_active: 1 });
    if (resp?.data?.status == "success") {
        return { "success": true, data: resp?.data?.stories };
    } else {
        return { "success": false, data: {}, message: resp?.data?.message ?? 'unknownError' };
    }

}
