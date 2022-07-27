import axios from 'axios';
import config from 'src/config';
import { deleteNullOrFalsyKeyInObject } from 'src/utils';
import qs from 'qs';

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

      const data = {
        firstname: state.user.addMemberfirstname,
        lastname: state.user.addMemberlastname,
        address: state.user.addMemberaddress,
        birthdate: state.user.addMemberbirthdate,
        email: state.user.addMemberemail,
        player_license: state.user.addMemberplayerLicense,
        phone: state.user.addMemberphone,
        gender_id: state.user.addMembergenderId,
        club_id: 1,
        role_id: 2,
        password: 'tomtom',
        is_active: true,
      };

      // supprimer les clés invalides pour l'api
      deleteNullOrFalsyKeyInObject(data);

      const axiosConfig = {
        method: 'post',
        url: `${config.api.baseUrl}/users`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: qs.stringify(data),
      };
      next(action);
      axios(axiosConfig)
        .then((response) => {
          store.dispatch({ type: 'CREATE_MEMBER_SUCCESS', value: response.data });
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
