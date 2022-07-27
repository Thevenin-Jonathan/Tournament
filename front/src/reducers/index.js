import { combineReducers } from 'redux';

import userReducer from './user';
import uiReducer from './ui';
import clubReducer from './club';

const rootReducer = combineReducers({
  user: userReducer,
  interface: uiReducer,
  club: clubReducer,
});

export default rootReducer;
