import {API_EVENTS_MODEL} from "../const";
import {API_BASE_URL, apiCall} from "../../api";
import {Dictionary} from "../../../locales/dictionary";

export const updateEvent = async (payload: any, id: any) => {
    const methodUrl = [API_EVENTS_MODEL.url,API_EVENTS_MODEL.methods.updateEvent.url,id].join('/');
    const resp = await apiCall(
        API_EVENTS_MODEL.methods.updateEvent.method,
        API_BASE_URL + methodUrl,
        payload
    );

    if(resp?.data?.status == "success") {
        return {"success": true, data: id, message: Dictionary.event.saveSuccess, originResp: resp};
    } else {
        return {"success": false, data: 0, message: resp?.data?.message ?? 'unknownError', originResp: resp};
    }
}
