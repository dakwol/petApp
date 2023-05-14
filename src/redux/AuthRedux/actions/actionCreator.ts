import {SET_IS_LOGGED_IN, SET_USER_DATA, SET_USER_DATA_FULL, SET_USER_DATA_LIVE, UPDATE_REGISTER_FIELD} from './actionTypes';

export const updateRegistrationField = (value: any) => ({
  type: UPDATE_REGISTER_FIELD,
  payload: value,
});

export const updateUserData = (value: any) => ({
  type: SET_USER_DATA,
  payload: value,
});
export const updateUserDataFull = (value: any) => ({
  type: SET_USER_DATA_FULL,
  payload: value,
});

export const setIsLoggedIn = (value: any) => ({
  type: SET_IS_LOGGED_IN,
  payload: value,
});

export const updateUserDataLive = (value: any) => ({
  type: SET_USER_DATA_LIVE,
  payload: value,
});

