import axios from 'axios';

const authMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case 'SUBMIT_LOGIN': {
      const state = store.getState();
      const config = {
        method: 'post',
        url: 'https://cassini-tournament.herokuapp.com/login',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          email: state.user.email,
          password: state.user.password,
        },
      };
      next(action);
      axios(config)
        .then((response) => {
          store.dispatch({ type: 'SUBMIT_LOGIN_SUCCESS', value: response.data });
          // set token in local storage
          localStorage.setItem('authToken', JSON.stringify(response.data));
          // redirect on dashboard
          // window.location.replace('/tableau-de-bord');
          // window.history.replaceState(
          //   { additionalInformation: 'Login Success' }, 'Tableau de Bord', '/tableau-de-bord'
          // );
        })
        .catch((error) => {
          store.dispatch({ type: 'SUBMIT_LOGIN_FAILED', value: 'Login error' });
          throw new Error(error);
        });
      break;
    }

    case 'LOGOUT': {
      localStorage.removeItem('authToken');
      next(action);
      break;
    }

    default:
      next(action);
      break;
  }
};

export default authMiddleware;
