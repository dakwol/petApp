import { API_BASE_URL, apiCall } from "../../api";
import { API_SERVICES_MODEL } from "../const";


export const findByOccupation = async (payload:any) => {
    const methodUrl = [API_SERVICES_MODEL.url, API_SERVICES_MODEL.methods.findByOccupation.url].join('/');
    const resp = await apiCall('get', API_BASE_URL + methodUrl + '?ids=' + payload);
    //@ts-ignore
    if (resp?.status == 200) {
        return { "success": true, data: resp.data };
    } else {
        return { "success": false, data: {}, message: resp?.data?.message ?? 'unknownError' };
    }

}
