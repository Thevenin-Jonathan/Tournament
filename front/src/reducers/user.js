export const initialState = {
  logged: false,
  loginLoading: false,

  id: null,
  displayName: '',
  avatar: '',
  role: '',
  token: null,

  // champs controlés
  email: '',
  password: '',
  //
  lastName: '',
  firstName: '',
  address: '',
  phone: '',
  birthdate: '',
  gender: '',
  playerLicense: '',
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
        id: action.value.id,
        displayName: action.value.firstName,
        avatar: action.value.avatar,
        password: '',
        loginLoading: false,
      };
    case 'SUBMIT_LOGIN_FAILED':
      return {
        ...state,
        loginLoading: false,
      };
    case 'TOKEN_LOGIN':
      return {
        ...state,
        logged: action.token.logged,
        id: action.token.id,
        displayName: action.token.firstName,
        avatar: action.token.avatar,
      };
    case 'LOGOUT':
      return {
        ...state,
        logged: false,
        displayName: '',
        email: '',
        password: '',
        token: null,
      };
    default:
      return state;
  }
};

export default reducer;
