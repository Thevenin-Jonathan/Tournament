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

// /**
//  * verifier si on a le role attendu, renvoi un boolen
//  * @param {object} rolesList
//  * @param {*} roleId
//  * @param {*} role
//  */
// const isRole = (rolesList, roleId, role) => {
//   console.log(rolesList);
//   console.log(roleId);
//   console.log(role);
//   const roleFinded = rolesList.find((element) => element.id === roleId);
//   if (roleFinded !== undefined && roleFinded.name === role) {
//     return true;
//   }
//   return false;
// };

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

export {
  genderText, dateFr, deleteNullOrFalsyKeyInObject,
};
