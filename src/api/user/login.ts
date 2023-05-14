import {API_BASE_URL, API_LOGIN_URL, apiCall} from '../api';

export const login = async (data: FormData) => {
  const resp = await apiCall('post', API_BASE_URL + API_LOGIN_URL, data);
  return resp;
};
