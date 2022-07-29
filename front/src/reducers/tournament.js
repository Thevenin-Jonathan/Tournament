export const initialState = {
  tournaments: [],
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'GET_TOURNAMENTS_SUCCESS':
      return {
        ...state,
        tournaments: action.value,
      };

    default:
      return state;
  }
};

export default reducer;
