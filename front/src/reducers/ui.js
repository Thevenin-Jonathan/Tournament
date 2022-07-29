export const initialState = {
  menuIsOpen: false,
  isLoading: false,
  toastCounter: 0,
  toasts: [
    // { id: 0, type: 'success', message: 'coucou' },
    // { id: 1, type: 'error', message: 'bouh!' },
  ],
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
    case 'NEW_TOAST':
      return {
        ...state,
        toastCounter: state.toastCounter + 1,
        toasts: [
          ...state.toasts,
          action.newToast,
        ],
      };
    case 'REMOVE_TOAST':
      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== action.toastId),
      };

    default:
      return state;
  }
};

export default reducer;
