import { API_BASE_URL, apiCall } from "../../api";
import { API_TASK_MODEL } from "../const";
import { IApiReturn } from "../../../types/api";

export const taskSearch = async (user_id: any): Promise<IApiReturn<any>> => {
    const methodUrl = [API_TASK_MODEL.url, API_TASK_MODEL.methods.taskSearch.url].join('/');
    const resp = await apiCall('post', API_BASE_URL + methodUrl, user_id);
    if (resp) {
        return { "success": true, data: resp?.data };
    } else {
        return { "success": false, data: {}, message: resp ?? 'unknownError' };
    }

}