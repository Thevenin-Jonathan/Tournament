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

/**
 * supprimmer les clés d'un objet qui ont pour valeur null ou false
 * @param {object} obj - l'objet a nettoyer
 */
const deleteNullOrFalsyKeyInObject = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === null || obj[key] === false) {
      delete obj[key];
    }
  });
};

export { genderText, dateFr, deleteNullOrFalsyKeyInObject };
