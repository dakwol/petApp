import { API_BASE_URL, API_EVENT_BY_ID_URL, apiCall } from '../api';

export const getEventById = async (evt_id: FormData) => {
  const resp = await apiCall('post', API_BASE_URL + API_EVENT_BY_ID_URL, { evt_id });
  return resp;
};
