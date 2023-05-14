import {API_BASE_URL, apiCall} from "../../api";
import {API_USERS_MODEL} from "../const";

export const userCheckFreeEmail = async (email:string) => {
    const methodUrl = [API_USERS_MODEL.url, API_USERS_MODEL.methods.userCheckFreeEmail.url].join('/');
    const resp = await apiCall('post', API_BASE_URL + methodUrl,  { email:email } );
    if(resp?.data?.status == "success") {
        return {"success": true, data: (resp?.data?.result == 0) };
    } else {
        return {"success": false, data: {}, message: resp?.data?.message ?? 'unknownError'};
    }

}
