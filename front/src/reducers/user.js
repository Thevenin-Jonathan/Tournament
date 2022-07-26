export const initialState = {
  logged: false,
  loginLoading: false,

  id: null,
  displayName: '',
  roleId: null,
  token: null,

  email: '',
  password: '',
  avatar: '',
  firstname: '',
  lastname: '',
  address: '',
  birthdate: '',
  playerLicense: '',
  genderId: null,
  phone: '',

  // champs controlés add member
  addMemberemail: '',
  addMemberpassword: '',
  addMemberavatar: '',
  addMemberfirstname: '',
  addMemberlastname: '',
  addMemberaddress: '',
  addMemberbirthdate: '',
  addMemberplayerLicense: '',
  addMembergenderId: null,
  addMemberphone: '',
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
        displayName: action.value.firstname,
        avatar: action.value.url_avatar,
        roleId: action.value.role_id,
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
        displayName: action.token.firstname,
        avatar: action.token.url_avatar,
      };
    case 'GET_PROFILE_SUCCESS':
      return {
        ...state,
        avatar: action.value.url_avatar,
        firstname: action.value.firstname,
        lastname: action.value.lastname,
        address: action.value.address,
        birthdate: action.value.birthdate,
        email: action.value.email,
        playerLicense: action.value.player_license,
        genderId: action.value.gender_id,
        phone: action.value.phone,
        roleId: action.value.role_id,
      };
    case 'LOGOUT':
      return {
        ...state,
        id: null,
        displayName: '',
        logged: false,
        avatar: '',
        firstname: '',
        lastname: '',
        address: '',
        birthdate: '',
        email: '',
        playerLicense: '',
        genderId: null,
        phone: '',
        roleId: null,
        token: null,
      };
    default:
      return state;
  }
};

export default reducer;
