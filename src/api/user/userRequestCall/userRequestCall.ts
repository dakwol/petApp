
import { API_BASE_URL, apiCall } from "../../api";
import { API_USERS_MODEL } from "../const";

export const userRequestCall = async (payload: any) => {
    const methodUrl = [API_USERS_MODEL.url, API_USERS_MODEL.methods.userRequestCall.url].join('/');
    const resp = await apiCall('post', API_BASE_URL + methodUrl, payload);
    console.log('DANITESE', resp)
    if (resp?.status == 201) {
        return { "success": true, data: resp.data.data.request_call };
    } else {
        return { "success": false, message: resp.data?.message ?? 'unknownError' };
    }

}
