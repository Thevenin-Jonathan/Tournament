import axios from 'axios';
import config from 'src/config';

const userMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case 'GET_PROFILE': {
      const axiosConfig = {
        method: 'get',
        url: `${config.api.baseUrl}/users/${action.value}`,
      };
      next(action);
      axios(axiosConfig)
        .then((response) => {
          store.dispatch({ type: 'GET_PROFILE_SUCCESS', value: response.data });
        })
        .catch((error) => {
          store.dispatch({ type: 'GET_PROFILE_FAILED', value: 'Data error' });
          throw new Error(error);
        });
      break;
    }

    case 'GET_MEMBERS': {
      const axiosConfig = {
        method: 'get',
        url: `${config.api.baseUrl}/users`,
      };
      next(action);
      axios(axiosConfig)
        .then((response) => {
          store.dispatch({ type: 'GET_MEMBERS_SUCCESS', value: response.data });
        })

        .catch((error) => {
          store.dispatch({ type: 'GET_MEMBERS_FAILED', value: 'Data error' });
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
