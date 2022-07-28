import { combineReducers } from 'redux';

import appReducer from './app';
import uiReducer from './ui';
import clubReducer from './club';
import userReducer from './user';
import tournamentReducer from './tournament';

const rootReducer = combineReducers({
  app: appReducer,
  interface: uiReducer,
  club: clubReducer,
  user: userReducer,
  tournament: tournamentReducer,
});

export default rootReducer;
