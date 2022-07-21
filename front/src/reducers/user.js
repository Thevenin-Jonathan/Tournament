export const initialState = {
  logged: true,
  id: null,
  token: null,

  // champs controlés
  email: '',
  password: '',
  //
  lastName: '',
  firstName: '',
  adress: '',
  birthDate: '',
  gender: '',
  playerLicense: '',
  // avatar: '',
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'CHANGE_FIELD':
      return {
        ...state,
        [action.input]: action.value,
      };
    case 'SUBMIT_LOGIN':
      return {
        ...state,
        loginLoading: true,
      };
    case 'SUBMIT_LOGIN_SUCCESS':
      return {
        ...state,
        token: action.value.token,
        logged: action.value.logged,
      };
    case 'SUBMIT_LOGIN_FAILED':
      return {
        ...state,
        loginLoading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        logged: false,
        email: '',
        password: '',
        token: null,
      };
    default:
      return state;
  }
};

export default reducer;
