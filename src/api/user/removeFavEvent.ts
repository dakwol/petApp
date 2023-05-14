import {API_BASE_URL, API_REMOVE_EVENT_FROM_FAV_URL, apiCall} from '../api';

export const removeEventFromFavorite = async (token: any, data: FormData) => {
  const resp = await apiCall(
    'post',
    API_BASE_URL + API_REMOVE_EVENT_FROM_FAV_URL,
    data,
      token
  );
  return resp;
};
