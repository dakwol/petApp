import { API_BASE_URL, apiCall } from "../../api";
import { API_OCCUPATION_MODEL } from "../const";


export const occupationList = async () => {
    const methodUrl = [API_OCCUPATION_MODEL.url, API_OCCUPATION_MODEL.methods.occupationList.url].join('/');
    const resp = await apiCall('get', API_BASE_URL + methodUrl);
    //@ts-ignore
    if (resp?.status == 200) {
        return { "success": true, data: resp.data };
    } else {
        return { "success": false, data: {}, message: resp?.data?.message ?? 'unknownError' };
    }

}
