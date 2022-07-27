import axios from 'axios';
import config from 'src/config';

const appMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case 'GET_ROLES': {
      const axiosConfig = {
        method: 'get',
        url: `${config.api.baseUrl}/roles`,
      };
      next(action);
      axios(axiosConfig)
        .then((response) => {
          store.dispatch({ type: 'GET_ROLES_SUCCESS', value: response.data });
        })
        .catch((error) => {
          throw new Error(error);
        });
      break;
    }
    case 'GET_GENDERS': {
      const axiosConfig = {
        method: 'get',
        url: `${config.api.baseUrl}/genders`,
      };
      next(action);
      axios(axiosConfig)
        .then((response) => {
          store.dispatch({ type: 'GET_GENDERS_SUCCESS', value: response.data });
        })
        .catch((error) => {
          throw new Error(error);
        });
      break;
    }
    default:
      next(action);
      break;
  }
};

export default appMiddleware;
