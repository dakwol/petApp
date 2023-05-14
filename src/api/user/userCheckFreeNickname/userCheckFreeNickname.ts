import {API_BASE_URL, apiCall} from "../../api";
import {API_USERS_MODEL} from "../const";

export const userCheckFreeNickname = async (data:string) => {
    const methodUrl = [API_USERS_MODEL.url, API_USERS_MODEL.methods.userCheckFreeNickname.url].join('/');
    const resp = await apiCall('post', API_BASE_URL + methodUrl,  { nickname :data } );
    if(resp?.data?.status == "success") {
        return {"success": true, data: (resp?.data?.exist == false) };
    } else {
        return {"success": false, data: {}, message: resp?.data?.message ?? 'unknownError'};
    }
}
