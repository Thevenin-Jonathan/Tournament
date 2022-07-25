import axios from 'axios';

const userMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case 'GET_PROFILE': {
      const config = {
        method: 'get',
<<<<<<< HEAD
        url: `http://localhost:3001/api/v1/users/${action.value}`,
=======
        url: `https://cassini-tournament.herokuapp.com/api/v1/users/${action.value}`,
>>>>>>> facf28050335341c3ee6a17fbdfde4178ef45d4c
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
