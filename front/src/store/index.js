import { createStore, applyMiddleware, compose } from 'redux';

import reducer from 'src/reducers';
// import recipeApiMiddleware from './middlewares/recipeApiMiddleware';
import appMiddleware from './middlewares/appMiddleware';
import authMiddleware from './middlewares/authMiddleware';
import userMiddleware from './middlewares/userMiddleware';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
  applyMiddleware(
    appMiddleware,
    userMiddleware,
    authMiddleware,
  ),
);

const store = createStore(
  reducer,
  enhancers,
);

export default store;
