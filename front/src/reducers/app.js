export const initialState = {
  roles: [],
  genders: [],
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'GET_ROLES_SUCCESS':
      return {
        ...state,
        roles: action.value,
      };
    case 'GET_GENDERS_SUCCESS':
      return {
        ...state,
        genders: action.value,
      };
    default:
      return state;
  }
};

export default reducer;
