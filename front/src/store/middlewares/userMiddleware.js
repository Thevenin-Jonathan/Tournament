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

    case 'CREATE_MEMBER': {
      const state = store.getState();

      const firstname = state.user.addMemberfirstname;
      const lastname = state.user.addMemberlastname;
      const address = state.user.addMemberaddress;
      const birthdate = state.user.addMemberbirthdate;
      const email = state.user.addMemberemail;
      const player_license = Number(state.user.addMemberplayerLicense);
      const phone = Number(state.user.addMemberphone);
      const gender_id = Number(state.user.addMembergenderId);

      const axiosConfig = {
        method: 'post',
        url: `${config.api.baseUrl}/users`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          firstname,
          lastname,
          address,
          birthdate,
          email,
          player_license,
          phone,
          gender_id,
          // pas coté front
          club_id: 1,
          role_id: 2,
          password: 'tomtom',
          is_active: true,
        },
      };
      next(action);
      axios(axiosConfig)
        .then((response) => {
          store.dispatch({ type: 'CREATE_MEMBER_SUCCESS' });
          console.log(response.data);
        })

        .catch((error) => {
          store.dispatch({ type: 'CREATE_MEMBER_FAILED', value: 'Data error' });
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
