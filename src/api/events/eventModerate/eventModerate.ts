import { API_BASE_URL, apiCall } from '../../api';
import { API_EVENTS_MODEL } from "../const";

export const eventModerate = async (payload: any) => {
    const methodUrl = [API_EVENTS_MODEL.url, API_EVENTS_MODEL.methods.eventModerate.url].join('/');
    const resp = await apiCall('post', API_BASE_URL + methodUrl, payload);
    console.log(resp);
    if (resp && resp.data.status && resp.data.status == 'success') {
        return { "success": true, data: {}, message: resp?.data?.message ?? "common.success", originResp: resp };
    } else {
        return { "success": false, data: {}, message: resp?.data?.message ?? 'unknownError', originResp: resp ?? {} };
    }
};
