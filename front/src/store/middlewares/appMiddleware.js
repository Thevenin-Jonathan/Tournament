import axios from 'axios';
import config from 'src/config';

const appMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case 'GET_APP_DATA': {
      // get roles
      const axiosConfig = {
        method: 'get',
        url: `${config.api.baseUrl}/roles`,
      };
      next(action);
      axios(axiosConfig)
        .then((response) => {
          console.log(response);
          store.dispatch({ type: 'GET_ROLES', value: response.data });
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
