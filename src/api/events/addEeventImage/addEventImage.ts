import {API_EVENTS_MODEL} from "../const";
import {API_BASE_URL, apiCall} from "../../api";
import {apiToken} from "../../../../app.json";

export const addEventImage = async (payload:any) => {
    const extraHeaders:any = {
        "content-type": "multipart/form-data"
    };
    const methodUrl = [API_EVENTS_MODEL.url,API_EVENTS_MODEL.methods.addEventImage.url].join('/');
    const resp = await apiCall(
        'post',
        API_BASE_URL + methodUrl,
        payload,
        apiToken,
        extraHeaders
    );

    if(resp && resp.data.status && resp.data.message) {
        return resp.data.message;
    } else {
        return [];
    }
};
