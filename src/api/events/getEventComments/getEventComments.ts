import {API_BASE_URL, apiCall} from '../../api';
import {IAPI_GET_EVENTS_FAV_PROPS} from "../types";
import {API_EVENTS_MODEL} from "../const";

export const getEventComments = async (payload: IAPI_GET_EVENTS_FAV_PROPS) => {
    const methodUrl = [API_EVENTS_MODEL.url,API_EVENTS_MODEL.methods.getEventComments.url].join('/');
    const resp = await apiCall('post', API_BASE_URL + methodUrl, payload);


    if(resp && resp.data.status && resp.data.comments) {
        return resp.data.comments;
    } else {
        return [];
    }
};
