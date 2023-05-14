import { API_BASE_URL, apiCall } from "../../api";
import { API_SERVICES_MODEL } from "../const";
import { IApiReturn } from "../../../types/api";

export const getServices = async (services: any): Promise<IApiReturn<any>> => {
    const methodUrl = [API_SERVICES_MODEL.url, API_SERVICES_MODEL.methods.getServices.url].join('/');
    const resp = await apiCall('get', API_BASE_URL + methodUrl + ('?query=') + services);
    if (resp?.status == 200) {
        return { "success": true, data: resp?.data?.services };
    } else {
        return { "success": false, data: {}, message: resp?.data?.message ?? 'unknownError' };
    }

}
