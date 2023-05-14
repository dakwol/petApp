import {SET_IS_LOGGED_IN, SET_USER_DATA, SET_USER_DATA_FULL, SET_USER_DATA_LIVE, UPDATE_REGISTER_FIELD} from '../actions/actionTypes';
import {IUser} from "../../../types";
interface ISessionReducer {
  userDataFull: IUser | null,
  [x:string]: any,
}
const initialState:ISessionReducer = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
  role: null,
  userData: null,
  userDataFull: null,
  isLoggedIn: false,
};

const sessionReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_REGISTER_FIELD:
      return {...state, [action.payload.field]: action.payload.value};
    case SET_USER_DATA:
      return {...state, userData: action.payload};
    case SET_USER_DATA_FULL:
      return {...state, userDataFull: action.payload};
    case SET_IS_LOGGED_IN:
      return {...state, isLoggedIn: action.payload, ...(action.payload === false && {userData: null})};
    case SET_USER_DATA_LIVE:
      return {...state, userDataLive: action.payload};
    default:
      return state;
  }
};

export default sessionReducer;
