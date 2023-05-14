import { API_EVENTS_MODEL } from "../../events/const";
import { API_BASE_URL, apiCall } from "../../api";
import { translate } from "../../../utils/translate";
import { Dictionary } from "../../../locales/dictionary";

export const eventClaimClaims = async () => {
    const methodUrl = [API_EVENTS_MODEL.url, API_EVENTS_MODEL.methods.eventClaimClaims.url].join('/');
    const resp = await apiCall('get', API_BASE_URL + methodUrl);

    if (resp && resp.data.status && resp.data.status == "success") {
        return { "success": true, data: resp.data, message: Dictionary.event.addSuccess, originResp: resp };
    } else {
        return { "success": false, data: 0, message: resp?.data?.message ?? 'unknownError', originResp: resp };
    }
}
