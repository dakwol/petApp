import {API_USERS_MODEL} from "../const";
import {API_BASE_URL, apiCall} from "../../api";

export const addUserMediaMultiply = async (payload:any) => {
    //const extraHeaders = {
        //"Content-Type": "application/x-www-form-urlencoded",
        //Accept: "application/json"
    //}
    const methodUrl = [API_USERS_MODEL.url,API_USERS_MODEL.methods.addMediaMultiply.url].join('/');
    const resp = await apiCall(
        'post',
        API_BASE_URL + methodUrl,
        payload
    );
    //console.log('TEST 0', resp);
    if(resp?.data?.status == "success") {
        //console.log('TEST1');
        return {"success": true, data: resp.data, message:''};
    } else {
        //console.log('TEST2');
        return {"success": false, data: resp.data, message: resp.data.message};
    }
};
