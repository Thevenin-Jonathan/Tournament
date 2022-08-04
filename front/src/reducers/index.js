import { combineReducers } from 'redux';

import appReducer from './app';
import uiReducer from './ui';
import clubReducer from './club';
import userReducer from './user';
import tournamentReducer from './tournament';
import statsReducer from './stats';

const rootReducer = combineReducers({
  app: appReducer,
  interface: uiReducer,
  club: clubReducer,
  user: userReducer,
  tournament: tournamentReducer,
  stats: statsReducer,
});

export default rootReducer;
