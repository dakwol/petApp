import { API_BASE_URL, apiCall } from "../../api";
import { API_REGION_MODEL } from "../const";


export const findRegion = async () => {
    const methodUrl = [API_REGION_MODEL.url, API_REGION_MODEL.methods.findRegion.url].join('/');
    const resp = await apiCall('get', API_BASE_URL + methodUrl);
    //@ts-ignore
    if (resp?.status == 200) {
        return { "success": true, data: resp.data };
    } else {
        return { "success": false, data: {}, message: resp?.data?.message ?? 'unknownError' };
    }

}
