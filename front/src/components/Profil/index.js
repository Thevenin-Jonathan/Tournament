import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { genderText, dateFr, formatPhoneNumber } from 'src/utils';
import config from 'src/config';

function Profil() {
  const dispatch = useDispatch();
  const user = useSelector((state) => (state.user));
  useEffect(() => {
    dispatch({
      type: 'GET_PROFILE',
      value: user.id,
    });
  }, []);

  const userAvatar = `${config.path.uploads.avatar}/${user.avatar}`;

  return (
    <main className="content profil">
      <h1 className="title">Mon profil</h1>

      <div className="wrapper">

        <h2 className="infos-title">{user.firstname} {user.lastname.toUpperCase()}</h2>

        <div className="wrapper-infos">
          <div className="sub-wrapper-infos">
            <div className="infos-left">
              {/* <div>Prénom : <span>{user.firstname}</span></div>
              <div>Nom : <span>{user.lastname}</span></div> */}
              <img
                className="member-avatar"
                src={userAvatar}
                alt={`${user.firstname} Avatar`}
              />
            </div>

            <div className="infos-right">
              <div>license FFBAD : <span>{user.playerLicense}</span></div>
              { (user.gender_id === 1)
                ? <div>Née le : <span>{dateFr(user.birthdate)}</span></div>
                : <div>Né le : <span>{dateFr(user.birthdate)}</span></div>}
              <div>Genre : <span>{genderText(user.genderId)}</span></div>
              <div>Adresse : <span>{user.address}</span></div>
              <div>Email :<span>{user.email}</span></div>
              <div>Téléphone :<span>{formatPhoneNumber(user.phone)}</span></div>

            </div>
          </div>
        </div>

        <h2 className="stats-title">Mes statistiques</h2>

        <div className="wrapper-stats">

          <table>
            <tbody>
              <tr>
                <th>Discipline</th>
                <th>Matchs Joués</th>
                <th>Matchs Gagnés</th>
                <th>% de Victoires</th>
              </tr>
              <tr>
                <td><span>Simple</span></td>
                <td><span>1</span></td>
                <td><span>1</span></td>
                <td><span>1</span></td>
              </tr>
              <tr>
                <td><span>Double</span></td>
                <td><span>1</span></td>
                <td><span>1</span></td>
                <td><span>1</span></td>
              </tr>
              <tr>
                <td><span>Double Mixte</span></td>
                <td><span>1</span></td>
                <td><span>1</span></td>
                <td><span>1</span></td>
              </tr>
            </tbody>
          </table>

        </div>
        <Link className="action-btn" to="/profil/modifier-profil">
          <button type="button">
            <i className="fa fa-pencil" aria-hidden="true" />
            &nbsp;
            Modifier mon profil
          </button>
        </Link>
      </div>

    </main>
  );
}

export default Profil;
