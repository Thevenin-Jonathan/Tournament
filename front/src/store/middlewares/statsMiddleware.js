import axios from 'axios';
import config from 'src/config';

const statsMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case 'GET_STATS': {
      const axiosConfig = {
        method: 'get',
        url: `${config.api.baseUrl}/stats`,
      };
      next(action);
      axios(axiosConfig)
        .then((response) => {
          store.dispatch({ type: 'GET_STATS_SUCCESS', value: response.data });
        })
        .catch((error) => {
          throw new Error(error);
        });
      break;
    }

    case 'GET_USER_STATS': {
      const axiosConfig = {
        method: 'get',
        url: `${config.api.baseUrl}/stats/${action.value}`,
      };
      next(action);
      axios(axiosConfig)
        .then((response) => {
          store.dispatch({ type: 'GET_USER_STATS_SUCCESS', value: response.data });
        })
        .catch((error) => {
          throw new Error(error);
        });
      break;
    }

    default:
      next(action);
  }
};

export default statsMiddleware;
