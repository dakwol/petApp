import {API_BASE_URL, API_SAVE_EVENT_TO_FAV_URL, apiCall} from '../api';

export const saveEventToFavorite = async (token: any, data: FormData) => {
  const resp = await apiCall(
    'post',
    API_BASE_URL + API_SAVE_EVENT_TO_FAV_URL,
    data,
      token
  );
  return resp;
};
