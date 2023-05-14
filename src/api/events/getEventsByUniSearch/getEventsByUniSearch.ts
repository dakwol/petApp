import {API_BASE_URL, apiCall} from '../../api';
import {API_EVENTS_MODEL} from "../const";

export const getEventsByUniSearch = async (payload: any) => {
    const methodUrl = [API_EVENTS_MODEL.url,API_EVENTS_MODEL.methods.getEventsByUniSearch.url].join('/');
    const resp = await apiCall('post', API_BASE_URL + methodUrl, payload);
    if(resp && resp.data.status && resp.data.events) {
        return resp.data.events;
    } else {
        return [];
    }
};
