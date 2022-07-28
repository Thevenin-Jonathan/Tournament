import axios from 'axios';
import config from 'src/config';

const tournamentMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case 'GET_TOURNAMENTS': {
      // requête Axios pour récupérer tous les tournois
      const axiosConfig = {
        method: 'get',
        url: `${config.api.baseUrl}/tournaments`,
      };
      next(action);
      axios(axiosConfig)
        .then((response) => {
          store.dispatch({ type: 'GET_TOURNAMENTS_SUCCESS', value: response.data });
        })
        .catch((error) => {
          store.dispatch({ type: 'GET_TOURNAMENTS_FAILED', value: 'Data error' });
          throw new Error(error);
        });
      break;
    }
    default:
      next(action);
  }
};

export default tournamentMiddleware;
