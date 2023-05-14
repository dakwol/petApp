import {API_BASE_URL, API_EVENTS_URL, apiCall} from '../api';
import {IEvent} from "../../types";

export const getEvents = async (data:any) => {
  console.log('SEARCH API FUNC', data)
  const resp = await apiCall('post', API_BASE_URL + API_EVENTS_URL, data);
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
