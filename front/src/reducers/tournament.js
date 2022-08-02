const today = () => {
  const date = new Date();
  return date.toISOString().slice(0, 10);
  // wanted : 2022-07-29
};

export const initialState = {
  tournaments: [],

  // champs controlés AddTournamentForm
  tournamanentName: '',
  tournamanentDate: today(),
  tournamentDescription: '',
  tournamentPictureUrl: '',
  tournamentPicturePreview: null,
  tournamentNbPlayground: 7,
  tournamentPlayerLimit: null,
  tournamentType: 1,
  tournamentDiscipline: 1,
  tournamentNotification: false,

  // champs controlés filtres Tournaments
  filterState0: true,
  filterState1: false,
  filterState2: false,
  filterState3: false,
  filterState4: false,
  filterDiscipline0: true,
  filterDiscipline1: false,
  filterDiscipline2: false,
  filterDiscipline3: false,
  filterDiscipline4: false,
  filterDiscipline5: false,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'CHANGE_FIELD_TOURNAMENT':
      return {
        ...state,
        [action.input]: action.value,
      };
    case 'GET_TOURNAMENTS_SUCCESS':
      return {
        ...state,
        tournaments: action.value,
      };
    case 'CREATE_TOURNAMENT_SUCCESS':
      return {
        ...state,
        tournamanentName: '',
        tournamanentDate: today(),
        tournamentDescription: '',
        tournamentPictureUrl: '',
        tournamentPicturePreview: null,
        tournamentNbPlayground: 7,
        tournamentPlayerLimit: null,
        tournamentType: 1,
        tournamentDiscipline: 1,
        tournamentNotification: false,
      };
    case 'FILTER_STATE_ID':
      return {
        ...state,
        filter: {
          ...state.filter,
          state_id: action.newFilter,
        },
      };
    default:
      return state;
  }
};

export default reducer;
