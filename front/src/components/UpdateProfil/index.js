/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Link, useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { dateFr } from 'src/utils';

function UpdateProfil() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const redirectTo = useSelector((state) => (state.interface.redirectTo));

  // Afficher les données actuelles (nom, prénom etc..)
  useEffect(() => {
    dispatch({
      type: 'PREFILL_PROFIL_FORM',
      value: user,
    });
  }, []);

  const changeField = (value, input) => {
    dispatch({
      type: 'CHANGE_FIELD',
      input,
      value,
    });
  };

  const handleUpdateProfilSubmit = (evt) => {
    evt.preventDefault();
    dispatch({
      type: 'UPDATE_PROFILE',
    });
  };

  if (redirectTo) {
    dispatch({ type: 'REDIRECT', value: null });
    return <Navigate to={redirectTo} />;
  }
  return (
    <main className="content add-members-form">
      <h1 className="title">Modifier mon profil</h1>

      <form className="single-add" onSubmit={handleUpdateProfilSubmit}>

        <div className="row">

          <div className="input-line">
            <label htmlFor="firstname">Prénom</label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              value={user.updateFirstname}
              onChange={(evt) => changeField(evt.target.value, 'updateFirstname')}
            />
          </div>

          <div className="input-line">
            <label htmlFor="lastname">Nom</label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              value={user.updateLastname}
              onChange={(evt) => changeField(evt.target.value, 'updateLastname')}
            />
          </div>

          <div className="input-line">
            <label htmlFor="birthdate">Date de naissance</label>
            <input
              type="text"
              name="birthdate"
              id="birthdate"
              value={dateFr(user.updateBirthdate)}
              onChange={(evt) => changeField(evt.target.value, 'updateBirthdate')}
            />
          </div>

          {/* <div className="input-line">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={user.updateEmail}
              onChange={(evt) => changeField(evt.target.value, 'updateEmail')}
            />
          </div>

          <div className="input-line">
            <label htmlFor="phone">Téléphone</label>
            <input
              type="phone"
              name="phone"
              id="phone"
              maxLength="10"
              value={user.updatePhone}
              onChange={(evt) => changeField(evt.target.value, 'updatePhone')}
            />
          </div>

          <div className="input-line">
            <label htmlFor="password-new">Nouveau mot de passe</label>
            <input
              type="password"
              name="password-new"
              id="password-new"
              placeholder="Saisissez le nouveau mot de passe"
              onChange={(evt) => changeField(evt.target.value, 'password-new')}
            />
          </div>

          <div className="input-line">
            <label htmlFor="password-confirm">Confirmation du mot de passe</label>
            <input
              type="password"
              name="password-confirm"
              id="password-confirm"
              placeholder="Confirmez le nouveau mot de passe"
              onChange={(evt) => changeField(evt.target.value, 'password-confirm')}
            />
          </div> */}

          <div className="input-line">
            <label htmlFor="address">Adresse</label>
            <textarea
              name="address"
              id="address"
              value={user.updateAddress}
              onChange={(evt) => changeField(evt.target.value, 'updateAddress')}
            />
          </div>

          {/* <div className="input-line">
            <label htmlFor="phone">Photo de profil</label>
            <input
              type="file"
              name="avatar"
              id="avatar"
              value={user.avatar}
              onChange={(evt) => changeField(evt.target.value, 'avatar')}
            />
          </div> */}

        </div>

        <div className="input-line">
          <button type="submit" className="action-btn pull-right">
            <i className="fa fa-floppy-o" aria-hidden="true" /> Enregister les modifications
          </button>
        </div>
      </form>
    </main>
  );
}

export default UpdateProfil;
