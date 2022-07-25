// Display gender in text
const genderText = (genderId) => {
  switch (genderId) {
    case 1:
      return 'Homme';
    case 2:
      return 'Femme';
    default:
      return 'undefined';
  }
};

// Display formated date
const dateFr = (date) => {
  // const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const options = {};
  const maDate = new Date(date);
  return maDate.toLocaleDateString('fr-FR', options);
};

export { genderText, dateFr };
