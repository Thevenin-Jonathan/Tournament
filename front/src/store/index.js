import { createStore, applyMiddleware, compose } from 'redux';

import reducer from 'src/reducers';
// import recipeApiMiddleware from './middlewares/recipeApiMiddleware';
import authMiddleware from './middlewares/authMiddleware';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
  applyMiddleware(
    // recipeApiMiddleware,
    authMiddleware,
  ),
);

const store = createStore(
  reducer,
  enhancers,
);

export default store;
