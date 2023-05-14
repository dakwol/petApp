import {
  SET_CATEGORIES,
  SET_EVENTS, SET_GEO_LOCATION, SET_MAP_LOCATION,
  SET_USER_DEVICE_TOKEN,
  SET_USER_LOCATION,
  SET_USER_PETS
} from '../actions/actionTypes';
import {IGlobalState} from "../../types";

const initialState:IGlobalState = {
  categories: [],
  pets: [],
  events: [],
  location: {
    timestamp:0
  },
  mapLocation: undefined,
  geoLocation: undefined,
  deviceToken: '',
};



const globalReducer = (state:IGlobalState = initialState, action: any) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return {...state, categories: action.payload};
    case SET_USER_PETS:
      return {...state, pets: action.payload};
    case SET_EVENTS:
      return {...state, events: action.payload};
    case SET_USER_LOCATION:
      return {...state, location: action.payload};
    case SET_MAP_LOCATION:
      return {...state, mapLocation: action.payload};
    case SET_GEO_LOCATION:
      if(action.payload) {
        ["latitude","longitude","latitudeDelta","longitudeDelta"].map(item => {
          if(action?.payload?.[item] && typeof  action?.payload?.[item] == "string") {
            action.payload[item] = parseFloat(action.payload[item]);
          }
        })
      }
      return {...state, geoLocation: action.payload};
    case SET_USER_DEVICE_TOKEN:
      return {...state, deviceToken: action.payload};
    default:
      return state;
  }
};

export default globalReducer;
