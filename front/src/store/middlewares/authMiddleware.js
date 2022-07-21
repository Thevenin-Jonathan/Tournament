import axios from 'axios';

const authMiddleware = (store) => (next) => (action) => {
  if (action.type === 'SUBMIT_LOGIN') {
    const state = store.getState();
    const config = {
      method: 'post',
      url: 'http://localhost:3001/login',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        email: state.user.email,
        password: state.user.password,
      },
    };
    next(action);
    // Requete de connexion
    // axios(config)
    //   .then((response) => {
    //     store.dispatch({ type: 'SUBMIT_LOGIN_SUCCESS', value: response.data });
    //   })
    //   .catch((error) => {
    //     store.dispatch({ type: 'SUBMIT_LOGIN_FAILED', value: 'Login error' });
    //     throw new Error(error);
    //   });

    // fake response
    const response = {
      data: {
        lastName: 'Roche',
        firstName: 'Tom',
        token: 'qsfqgQSZ565QE4F534',
        logged: true,
      },
    };
    store.dispatch({ type: 'SUBMIT_LOGIN_SUCCESS', value: response.data });
  }
  else {
    next(action);
  }
};

export default authMiddleware;
