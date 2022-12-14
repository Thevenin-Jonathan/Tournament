import axios from 'axios';
import qs from 'qs';
import config from 'src/config';
import { deleteNullOrFalsyKeyInObject } from 'src/utils';

const userMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    // mon profil
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
          throw new Error(error);
        });
      break;
    }

    // Tous les users
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
          throw new Error(error);
        });
      break;
    }

    // un seul user
    case 'GET_MEMBER': {
      const axiosConfig = {
        method: 'get',
        url: `${config.api.baseUrl}/users/${action.value.id}`,
      };
      next(action);
      axios(axiosConfig)
        .then((response) => {
          // console.log(response.data);
          store.dispatch({ type: 'GET_MEMBER_SUCCESS', value: response.data });
        })
        .catch((error) => {
          throw new Error(error);
        });
      break;
    }

    // enregistrer un user
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

      // supprimer les cl??s invalides pour l'api
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
          store.dispatch({
            type: 'NEW_TOAST',
            newToast: {
              id: state.interface.toastCounter,
              message: `Nouveau membre ${response.data.user.firstname} ${response.data.user.lastname} enregistr??`,
              type: 'success',
            },
          });
          store.dispatch({ type: 'CREATE_MEMBER_SUCCESS', value: response.data });
        })
        .catch((error) => {
          store.dispatch({
            type: 'NEW_TOAST',
            newToast: {
              id: state.interface.toastCounter,
              message: `${error.response.data.message}`,
              type: 'error',
            },
          });
          throw new Error(error);
        });
      break;
    }

    // mettre ?? jour son profil
    case 'UPDATE_PROFILE': {
      const state = store.getState();
      // console.log('action.value.id :', action.value.id);
      const axiosConfig = {
        method: 'patch',
        url: `${config.api.baseUrl}/users/${state.user.id}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: qs.stringify({
          firstname: state.user.updateFirstname,
          lastname: state.user.updateLastname,
          birthdate: state.user.updateBirthdate,
          // email: state.user.updateEmail,
          // phone: state.user.updatePhone,
          address: state.user.updateAddress,
        }),
      };
      next(action);
      axios(axiosConfig)
        .then((response) => {
          store.dispatch({
            type: 'UPDATE_PROFILE_SUCCESS',
            value: response.data,
          });
          store.dispatch({
            type: 'NEW_TOAST',
            newToast: {
              id: state.interface.toastCounter,
              message: 'Modifications enregistr??es',
              type: 'success',
            },
          });
          store.dispatch({ type: 'REDIRECT', value: '/profil' });
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

export default userMiddleware;
