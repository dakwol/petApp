import {
  SET_CATEGORIES,
  SET_EVENTS, SET_GEO_LOCATION,
  SET_MAP_LOCATION,
  SET_USER_DEVICE_TOKEN,
  SET_USER_LOCATION,
  SET_USER_PETS
} from './actionTypes';

export const setCategories = (value: any) => ({
  type: SET_CATEGORIES,
  payload: value,
});

export const setUserPets = (value: any) => ({
  type: SET_USER_PETS,
  payload: value,
});

export const setEvents = (value: any) => ({
  type: SET_EVENTS,
  payload: value,
});

export const setUserLocation = (value: any) => ({
  type: SET_USER_LOCATION,
  payload: value,
});
export const setMapLocation = (value: any) => ({
  type: SET_MAP_LOCATION,
  payload: value,
});
export const setGeoLocation = (value: any) => ({
  type: SET_GEO_LOCATION,
  payload: value,
});

export const setDeviceToken = (value: any) => ({
  type: SET_USER_DEVICE_TOKEN,
  payload: value,
});
