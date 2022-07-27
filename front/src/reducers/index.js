import { combineReducers } from 'redux';

import appReducer from './app';
import uiReducer from './ui';
import userReducer from './user';

const rootReducer = combineReducers({
  app: appReducer,
  interface: uiReducer,
  user: userReducer,
});

export default rootReducer;
