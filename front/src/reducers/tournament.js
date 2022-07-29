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
  tournamentNbPlayground: 7,
  tournamentPlayerLimit: null,
  tournamentType: 1,
  tournamentDiscipline: 1,
  tournamentNotification: false,
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

    default:
      return state;
  }
};

export default reducer;
