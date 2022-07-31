// return role in text
const roleText = (roleId) => {
  switch (roleId) {
    case 1:
      return 'admin';
    case 2:
      return 'member';
    default:
      return 'undefined';
  }
};

// return gender in text
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

// return tournament state in text
const tournamentStateText = (tournamentStateId) => {
  switch (tournamentStateId) {
    case 1:
      return 'Ouvert';
    case 2:
      return 'Construit';
    case 3:
      return 'En cours';
    case 4:
      return 'Archivé';
    default:
      return 'undefined';
  }
};

// return discipline in full text
const disciplineText = (disciplineId) => {
  switch (disciplineId) {
    case 1:
      return 'Simple Homme';
    case 2:
      return 'Simple Dame';
    case 3:
      return 'Double Homme';
    case 4:
      return 'Double Dame';
    case 5:
      return 'Double Mixte';
    default:
      return 'undefined';
  }
};

// return discipline in abbr
const disciplineShortText = (disciplineId) => {
  switch (disciplineId) {
    case 1:
      return 'SH';
    case 2:
      return 'SD';
    case 3:
      return 'DH';
    case 4:
      return 'DD';
    case 5:
      return 'DX';
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

// Display text formated date --> mardi 19 juillet 2022
const longDateFr = (date) => {
  const options = {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  };
  const maDate = new Date(date);
  return maDate.toLocaleDateString('fr-FR', options);
};

/**
 * supprimmer les clés d'un objet qui ont pour valeur null ou false
 * @param {object} obj - l'objet a nettoyer
 */
const deleteNullOrFalsyKeyInObject = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === null || obj[key] === false || obj[key] === '') {
      delete obj[key];
    }
  });
};

export {
  roleText,
  genderText,
  tournamentStateText,
  disciplineText,
  disciplineShortText,
  dateFr,
  longDateFr,
  deleteNullOrFalsyKeyInObject,
};
