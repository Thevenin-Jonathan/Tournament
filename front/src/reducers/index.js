import { combineReducers } from 'redux';

import userReducer from './user';
import uiReducer from './ui';

const rootReducer = combineReducers({
  user: userReducer,
  interface: uiReducer,
});

export default rootReducer;
