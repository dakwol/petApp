import { API_BASE_URL, API_REGISTER_URL, apiCall } from '../api';

export const signup = async (data: FormData) => {
  const extraHeaders: any = {
    "content-type": "multipart/form-data"
  };
  const resp = await apiCall('post', API_BASE_URL + API_REGISTER_URL, data, extraHeaders);
  return resp;
};
