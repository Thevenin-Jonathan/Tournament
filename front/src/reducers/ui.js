export const initialState = {
  menuIsOpen: false,
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
    default:
      return state;
  }
};

export default reducer;
