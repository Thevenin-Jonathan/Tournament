import { combineReducers } from 'redux';

import userReducer from './user';

const rootReducer = combineReducers({
  user: userReducer,
  // recipes: recipesReducer,
});

export default rootReducer;
