import { API_BASE_URL, apiCall } from "../../api";
import { API_SERVICE_MEDIA_MODEL } from "../const";
import { IApiReturn } from "../../../types/api";

export const deleteServiceMedia = async (id: any): Promise<IApiReturn<any>> => {
    const methodUrl = [API_SERVICE_MEDIA_MODEL.url, API_SERVICE_MEDIA_MODEL.methods.deleteServicesMedia.url].join('/');
    const resp = await apiCall('delete', API_BASE_URL + methodUrl, id);
    if (resp) {
        return { "success": true, data: resp?.data };
    } else {
        return { "success": false, data: {}, message: resp ?? 'unknownError' };
    }

}
