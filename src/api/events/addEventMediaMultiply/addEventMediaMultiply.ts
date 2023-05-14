import {API_EVENTS_MODEL} from "../const";
import {API_BASE_URL, apiCall} from "../../api";
import {Dictionary} from "../../../locales/dictionary";

export const addEventMediaMultiply = async (payload:any) => {
    const methodUrl = [API_EVENTS_MODEL.url,API_EVENTS_MODEL.methods.addEventMediaMultiply.url].join('/');
    const resp = await apiCall(
        'post',
        API_BASE_URL + methodUrl,
        payload
    );

    if(resp?.data?.status == "success") {
        return {"success": true, data: {}, message: Dictionary.common.uploadMediaSuccess, originResp: resp};
    } else {
        return {"success": false, data: {}, message: resp?.data?.message ?? 'unknownError', originResp: resp};
    }
    /*
    if(resp && resp.data.status && resp.data.message) {
        return resp.data.message;
    } else {
        return [];
    }

     */
};
