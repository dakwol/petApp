import {API_BASE_URL, apiCall} from "../../api";
import {API_USERS_MODEL} from "../const";
import {IResetPasswordByEmailProps} from "../types";

export const resetPasswordByEmail = async (payload:IResetPasswordByEmailProps) => {
    const methodUrl = [API_USERS_MODEL.url, API_USERS_MODEL.methods.resetPasswordByEmail.url].join('/');
    const resp = await apiCall('post', API_BASE_URL + methodUrl, payload);
    if(resp && resp.data.status && resp.data.status == "success") {
        return {"success": true, data: {}, message: resp?.data?.message?? ''};
    } else {
        return {"success": false, data: {}, message: resp?.data?.message?? 'unknownError'};
    }

}
