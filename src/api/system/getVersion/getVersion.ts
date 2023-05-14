import { API_BASE_URL, apiCall } from "../../api";
import { API_SYSTEM_MODEL } from "../const";

export const getVersion = async (version: any) => {
    const methodUrl = [API_SYSTEM_MODEL.url, API_SYSTEM_MODEL.methods.getVersion.url].join('/');
    const resp = await apiCall('get', API_BASE_URL + methodUrl + ('/') + ('version_') + version);
    console.log('TEST', resp)
    //@ts-ignore
    if (resp?.status == 200) {
        return { "success": true, data: resp.data };
    } else {
        return { "success": false, data: {}, message: resp?.data?.message ?? 'unknownError' };
    }

}
