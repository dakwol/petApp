
import { API_BASE_URL, apiCall } from "../../api";
import { API_USERS_MODEL } from "../const";

export const userRequestCode = async (payload: any) => {
    const methodUrl = [API_USERS_MODEL.url, API_USERS_MODEL.methods.userRequestCode.url].join('/');
    const resp = await apiCall('post', API_BASE_URL + methodUrl, payload);
    // @ts-ignore
    if (resp?.status == 201) {
        return { "success": true, data: resp.data.data.request_code };
    } else {
        return { "success": false, message: resp.data?.message ?? 'unknownError' };
    }

}
