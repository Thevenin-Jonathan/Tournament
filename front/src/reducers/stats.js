export const initialState = {
  stats: [],
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'GET_STATS_SUCCESS':
      return {
        ...state,
        stats: action.value,
      };
    default:
      return state;
  }
}

export default reducer;
