import {createStore, combineReducers, applyMiddleware} from 'redux';
import sessionReducer from './AuthRedux/reducers';
import globalReducer from './GlobalRedux/reducers';


import { persistReducer, persistStore } from "redux-persist";
import {createLogger} from 'redux-logger';
import storage from '@react-native-async-storage/async-storage';
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  session: sessionReducer,
  global: globalReducer,
});

const middleware = [];
middleware.push(thunk);
const persistConfig = {
  version: 0,
  key: 'root',
  whitelist: ['session'],
  storage,
};

const loggerConfig = {
  duration: true,
  diff: true,
};
const loggerMiddleware = createLogger(loggerConfig);
if (__DEV__) {
  // log only in dev
  middleware.push(loggerMiddleware);
}
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(...middleware));
const persister = persistStore(store);

export { store };
export { persister };
