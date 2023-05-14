import {API_BASE_URL, API_LOGIN2FA_URL, apiCall} from '../../api';

export const userLogin2fa = async (data: FormData) => {
  const resp = await apiCall('post', API_BASE_URL + API_LOGIN2FA_URL, data);
  return resp;
};
