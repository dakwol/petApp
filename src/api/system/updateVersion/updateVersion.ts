import { API_BASE_URL, apiCall } from "../../api";
import { API_SYSTEM_MODEL } from "../const";

export const updateVersion = async (payload: any) => {
    const methodUrl = [API_SYSTEM_MODEL.url, API_SYSTEM_MODEL.methods.getVersion.url].join('/');
    const resp = await apiCall('post', API_BASE_URL + methodUrl, payload);
    //@ts-ignore
    if (resp?.data?.status == "success") {
        return { "success": true, data: resp.data };
    } else {
        return { "success": false, data: {}, message: resp?.data?.message ?? 'unknownError' };
    }

}
