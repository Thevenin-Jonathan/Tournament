export const initialState = {
  name: '',
  address: '',
  phone: '',
  email: '',
  logo: '',
  numberOfPlaygrounds: null,
  website: '',
  clubRef: null,
  description: '',
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'GET_CLUB_SUCCESS':
      return {
        ...state,
        name: action.value.name,
        address: action.value.address,
        phone: action.value.phone,
        email: action.value.email,
        logo: action.value.logo_url,
        numberOfPlaygrounds: action.value.nb_playground,
        website: action.value.website,
        clubRef: action.value.club_ref,
        description: action.value.description,
      };
    default:
      return state;
  }
}
export default reducer;
