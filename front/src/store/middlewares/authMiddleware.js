import axios from 'axios';
import config from 'src/config';

const authMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case 'SUBMIT_LOGIN': {
      const state = store.getState();
      const axiosConfig = {
        method: 'post',
        url: `${config.serverUrl}/login`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          email: state.user.email,
          password: state.user.password,
        },
      };
      next(action);
      axios(axiosConfig)
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

    case 'VERIFY_TOKEN': {
      // console.log('verify token');
      const axiosConfig = {
        method: 'post',
        url: `${config.serverUrl}/refresh_token`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          token: localStorage.getItem('authToken'),
        },
      };
      next(action);
      axios(axiosConfig)
        .then((response) => {
          // si je reçois un token
          if (response.data.token) {
            localStorage.setItem('authToken', JSON.stringify(response.data.token));
          }
          else {
            throw new Error(response.data.msg);
          }
          // Tout est ok on laisse la connexion et on rafraichit le token

          // Si error on logout
        })
        .catch((error) => {
          store.dispatch({ type: 'LOGOUT' });
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
