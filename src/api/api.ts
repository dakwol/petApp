import { apiToken } from '../../app.json';
// @ts-ignore
import { APP_API_SERVER } from '@env';
import axios, { AxiosRequestConfig, Method } from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const API_BASE_URL = APP_API_SERVER;
export const API_CATEGORIES_URL = 'category/get-categories';
export const API_EVENTS_URL = 'event/get-events';

export const API_SAVE_EVENTS_URL = 'event/events';
export const API_EVENT_BY_ID_URL = 'event/get-event-by-id';
export const API_EVENT_GET_FAV_URL = 'event/get-user-fav-events';


export const API_LOGIN_URL = 'auth/login';
export const API_LOGIN2FA_URL = 'auth/login2fa';
export const API_USER_PET_LIST_URL = 'pet/get-pets-by-user-id';
export const API_REGISTER_URL = 'auth/signup';
export const API_SAVE_EVENT_TO_FAV_URL = 'event/save-event-to-favourite';
export const API_REMOVE_EVENT_FROM_FAV_URL =
  'event/remove-event-from-favourite';

//export const apiCall = async (method: Method, url: string, data: FormData, token?: string) => {
export const apiCall = async (method: Method, url: string, data?: any, token?: string, extraHeaders: any = {}, extraData: any[] = []) => {

  const storageToken = await AsyncStorage.getItem('apiToken');
  //console.log('STORAGE TOKEN', storageToken);
  let userToken = (storageToken) ? storageToken : apiToken;
  userToken = (token) ? token : userToken;

  const options: AxiosRequestConfig = {

    method: method,
    url: url,
    headers: {
      "Authorization": 'Bearer ' + userToken,
      ...extraHeaders
    },
  };
  if (data) {
    options.data = data;
  }

  console.log('--- AXIOS ---');
  console.log('url', options);
  console.log('options', options);
  const res = await axios(options).then((res) => {
    console.log('res', res);
    return res;
  }).catch((err) => {
    console.log('ERROR1', res);
    console.log('ERROR2', err);
    return {
      data: err?.response?.data ?? { success: 'error' }
    }
  });
  console.log(res);
  console.log('--- /AXIOS ---');
  return res;
};
