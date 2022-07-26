export const initialState = {
  menuIsOpen: false,
  isLoading: false,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'TOGGLE_MENU':
      return {
        ...state,
        menuIsOpen: action.value,
      };
    case 'CLOSE_MENU':
      return {
        ...state,
        menuIsOpen: false,
      };
    case 'GET_MEMBERS':
      return {
        ...state,
        isLoading: true,
      };
    case 'GET_MEMBERS_SUCCESS':
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
