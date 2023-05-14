import {API_BASE_URL, apiCall} from "../../api";
import {API_USERS_MODEL} from "../const";

interface IUpdatePasswordProps {
    "old_password": string,
    "new_password": string,
    "new_password_confirmation": string,
}
export const updatePassword = async (payload:IUpdatePasswordProps) => {
    const methodUrl = [API_USERS_MODEL.url, API_USERS_MODEL.methods.updatePassword.url].join('/');
    const resp = await apiCall('post', API_BASE_URL + methodUrl, payload);
    if(resp && resp.data.status && resp.data.status == "success") {
        return {"success": true, data: {}, message: resp?.data?.message?? ''};
    } else {
        return {"success": false, data: {}, message: resp?.data?.message?? 'unknownError'};
    }

}
