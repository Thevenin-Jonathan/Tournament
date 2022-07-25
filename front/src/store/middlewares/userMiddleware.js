import axios from 'axios';

const userMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case 'GET_PROFILE': {
      const state = store.getState();
      const config = {
        method: 'get',
        url: `http://localhost:3001/api/v1/users/${action.value}`,
      };
      next(action);
      axios(config)
        .then((response) => {
          store.dispatch({ type: 'GET_PROFILE_SUCCESS', value: response.data });
        })
        .catch((error) => {
          store.dispatch({ type: 'GET_PROFILE_FAILED', value: 'Data error' });
          throw new Error(error);
        });
      break;
    }

    default:
      next(action);
      break;
  }
};

export default userMiddleware;
