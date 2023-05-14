import {API_EVENTS_MODEL} from "../const";
import {API_BASE_URL, apiCall} from "../../api";
import {translate} from "../../../utils/translate";
import {Dictionary} from "../../../locales/dictionary";

export const createEvent = async (payload: any) => {
    const methodUrl = [API_EVENTS_MODEL.url,API_EVENTS_MODEL.methods.createEvent.url].join('/');
    const resp = await apiCall('post', API_BASE_URL + methodUrl, payload);

    if(resp && resp.data.status && resp.data.status == "success" && resp.data.event_id) {
        return {"success": true, data: resp.data.event_id, message: Dictionary.event.addSuccess, originResp: resp};
    } else {
        return {"success": false, data: 0, message: resp?.data?.message ?? 'unknownError', originResp: resp};
    }
}
