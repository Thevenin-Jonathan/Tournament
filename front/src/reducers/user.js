export const initialState = {
  logged: false,
  loginLoading: false,

  id: null,
  diplayName: '',
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
  avatar: '',
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
        displayName: action.value.firstName,
        avatar: action.value.avatar,
        password: '',
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
