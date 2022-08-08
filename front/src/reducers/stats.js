export const initialState = {
  stats: [],
  userStats: [],
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'GET_STATS_SUCCESS':
      return {
        ...state,
        stats: action.value,
      };
    case 'GET_USER_STATS_SUCCESS':
      return {
        ...state,
        userStats: action.value,
      };

    default:
      return state;
  }
}

export default reducer;
