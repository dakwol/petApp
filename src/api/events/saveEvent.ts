import {API_BASE_URL, API_SAVE_EVENTS_URL, apiCall} from '../api';

export const saveEvent = async (data: FormData) => {
  const resp = await apiCall('post', API_BASE_URL + API_SAVE_EVENTS_URL, data);
  console.log(resp);
  return resp;
};
