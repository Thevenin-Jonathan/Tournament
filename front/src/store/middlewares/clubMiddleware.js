import axios from 'axios';
import config from 'src/config';

const clubMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case 'GET_CLUB': {
      // requête Axios pour récupérer les infos d'un club
      const axiosConfig = {
        method: 'get',
        url: `${config.api.baseUrl}/clubs/${action.value}`,
      };
      next(action);
      axios(axiosConfig)
        .then((response) => {
          store.dispatch({ type: 'GET_CLUB_SUCCESS', value: response.data });
        })
        .catch((error) => {
          store.dispatch({ type: 'GET_CLUB_FAILED', value: 'Data error' });
          throw new Error(error);
        });
      break;
    }
    default:
      next(action);
  }
};

export default clubMiddleware;
