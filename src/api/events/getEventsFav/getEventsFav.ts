import {API_BASE_URL, apiCall} from '../../api';
import {IAPI_GET_EVENTS_FAV_PROPS} from "../types";
import {API_EVENTS_MODEL} from "../const";

export const getEventsFav = async (payload: IAPI_GET_EVENTS_FAV_PROPS) => {
    const methodUrl = [API_EVENTS_MODEL.url,API_EVENTS_MODEL.methods.getEventsFav.url].join('/');
    const resp = await apiCall('post', API_BASE_URL + methodUrl, payload);
    if(resp && resp.data.status && resp.data.events) {
        return resp.data.events;
    } else {
        return [];
    }
};
