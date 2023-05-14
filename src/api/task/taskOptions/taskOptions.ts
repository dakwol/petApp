import { API_BASE_URL, apiCall } from "../../api";
import { API_TASK_MODEL } from "../const";
import { IApiReturn } from "../../../types/api";

export const taskOptions = async (service_id: any): Promise<IApiReturn<any>> => {
    const methodUrl = [API_TASK_MODEL.url, API_TASK_MODEL.methods.taskOptions.url].join('/');
    const resp = await apiCall('get', API_BASE_URL + methodUrl + '?service_id=' + service_id);
    console.log('TASKOPTIONs', resp)
    if (resp?.status == 200) {
        return { "success": true, data: resp?.data };
    } else {
        return { "success": false, data: {}, message: resp ?? 'unknownError' };
    }

}
