export const initialState = {
  roles: [],
  genders: [],
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'GET_ROLES':
      return {
        ...state,
        roles: action.value,
      };
    case 'GET_GENDERS':
      return {
        ...state,
        genders: false,
      };
    default:
      return state;
  }
};

export default reducer;
