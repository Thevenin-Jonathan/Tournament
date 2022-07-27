export const initialState = {
  logged: false,
  loginLoading: false,

  // securité
  id: null,
  displayName: '',
  roleId: null,
  role: '',
  isAdmin: false,
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
  addMemberfirstname: '',
  addMemberlastname: '',
  addMemberaddress: null,
  addMemberbirthdate: '',
  addMemberplayerLicense: null,
  addMembergenderId: 1,
  addMemberphone: null,

  // state qui stocke la liste des membres
  members: [],
  // state qui stocke un membre
  member: {},
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
    case 'IS_ADMIN':
      return {
        ...state,
        isAdmin: true,
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
        roleId: action.token.role_id,
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
    case 'GET_MEMBERS_SUCCESS':
      return {
        ...state,
        members: action.value,
      };
    case 'GET_MEMBER_SUCCESS':
      return {
        ...state,
        member: action.value,
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
        role: '',
        isAdmin: false,
      };
    case 'CREATE_MEMBER_SUCCESS':
      return {
        ...state,
        addMemberemail: '',
        addMemberavatar: '',
        addMemberfirstname: '',
        addMemberlastname: '',
        addMemberaddress: '',
        addMemberbirthdate: '',
        addMemberplayerLicense: null,
        addMembergenderId: null,
        addMemberphone: null,
      };
    default:
      return state;
  }
};

export default reducer;
