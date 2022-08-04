import axios from 'axios';
import qs from 'qs';
import config from 'src/config';
import { deleteNullOrFalsyKeyInObject, convertDate, findUserTeam } from 'src/utils';

const tournamentMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    // récupérer tous les tournois
    case 'GET_TOURNAMENTS': {
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

    // récupérer UN tournoi par son slug
    case 'GET_TOURNAMENT': {
      next(action);
      axios.get(`${config.api.baseUrl}/tournaments/slug/${action.value.slug}`)
        .then((response) => {
          store.dispatch({ type: 'GET_TOURNAMENT_SUCCESS', value: response.data });
        })
        .catch((error) => {
          throw new Error(error);
        });
      break;
    }

    // générer les matchs du tournoi !
    case 'TOURNAMENT_GENERATE': {
      const state = store.getState();
      next(action);
      axios.get(`${config.api.baseUrl}/tournaments/${state.tournament.tournament.id}/generate`)
        .then((response) => {
          store.dispatch({ type: 'TOURNAMENT_GENERATE_SUCCESS', value: response.data });
        })
        .catch((error) => {
          throw new Error(error);
        });
      break;
    }

    // inscription à un tournoi de simple (pas de gestion d'équipe)
    case 'SINGLE_TOURNAMENT_SUBSCRIBE': {
      const state = store.getState();
      const data = {
        tournament_id: state.tournament.tournament.id,
        user_ids: [action.value],
      };
      const axiosConfig = {
        method: 'post',
        url: `${config.api.baseUrl}/teams`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: qs.stringify(data),
      };
      axios(axiosConfig)
        .then((response) => {
          store.dispatch({ type: 'GET_TOURNAMENT_SUCCESS', value: response.data });
          store.dispatch({
            type: 'NEW_TOAST',
            newToast: {
              id: state.interface.toastCounter,
              message: 'inscription réussie',
              type: 'success',
            },
          });
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

    // desinscription d'un tournoi de simple (on suppr l'equipe)
    case 'SINGLE_TOURNAMENT_UNSUBSCRIBE': {
      const state = store.getState();
      // trouver la team
      const teamId = findUserTeam(state.tournament.tournament.teams, action.value).id;

      axios.delete(`${config.api.baseUrl}/teams/${teamId}`)
        .then((response) => {
          store.dispatch({ type: 'GET_TOURNAMENT_SUCCESS', value: response.data });
          store.dispatch({
            type: 'NEW_TOAST',
            newToast: {
              id: state.interface.toastCounter,
              message: 'désinscription réussie',
              type: 'success',
            },
          });
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

    // créer un tournoi
    case 'CREATE_TOURNAMENT': {
      const state = store.getState();

      const data = {
        title: state.tournament.tournamanentName,
        date: convertDate(state.tournament.tournamanentDate),
        description: state.tournament.tournamentDescription,
        picture_url: state.tournament.tournamentPictureUrl,
        nb_playground: state.tournament.tournamentNbPlayground,
        player_limit: state.tournament.tournamentPlayerLimit,
        discipline_id: state.tournament.tournamentDiscipline,
        type_id: state.tournament.tournamentType,
        state_id: 1,
        club_id: 1,
        notification: state.tournament.tournamentNotification,
      };

      // supprimer les clés invalides pour l'api
      deleteNullOrFalsyKeyInObject(data);

      const axiosConfig = {
        method: 'post',
        url: `${config.api.baseUrl}/tournaments`,
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
              message: `Nouveau Tournoi Crée : ${response.data.title}`,
              type: 'success',
            },
          });
          store.dispatch({ type: 'CREATE_TOURNAMENT_SUCCESS', value: response.data });

          store.dispatch({ type: 'REDIRECT', value: '/tableau-de-bord' });
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

    // définir le score d'un match
    case 'SET_MATCH_SCORES': {
      const state = store.getState();
      const data = action.value.matchResult;
      console.log(data);
      const axiosConfig = {
        method: 'patch',
        url: `${config.api.baseUrl}/matches/${action.value.matchId}/score`,
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
              message: 'Score mis à jour',
              type: 'success',
            },
          });
          store.dispatch({ type: 'SET_MATCH_SCORES_SUCCESS', value: response.data });
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
    default:
      next(action);
  }
};

export default tournamentMiddleware;
