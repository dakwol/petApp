import {API_BASE_URL, apiCall} from '../../api';
import {API_EVENTS_MODEL} from "../const";
import {IEvent} from "../../../types";

export const getEvents = async (payload: any) => {
    const methodUrl = [API_EVENTS_MODEL.url,API_EVENTS_MODEL.methods.getEvents.url].join('/');
    //TODO::заменить на передачу
    if(payload.limit == undefined) {
        payload.limit = 1000;
    }
    const resp = await apiCall('post', API_BASE_URL + methodUrl, payload);

    if(resp && resp.data.status && resp.data.events) {
        let output = resp.data.events.map( (item:IEvent) => {
            let tmp = item.evt_address.trim().split(',');
            if(tmp.length > 1 && tmp[1] != '') {
                return {...item};
            }

            return {...item, evt_address: tmp[0]};
        });
        return output;
    } else {
        return [];
    }
};
