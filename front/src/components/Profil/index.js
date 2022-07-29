import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { genderText, dateFr } from 'src/utils';
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
        <div className="infos">
          <h2 className="section-title">{user.firstname} {user.lastname}</h2>
          <ul>
            <li><img className="avatar" src={userAvatar} alt={`${user.firstname} Avatar`} /></li>
            <li>License FFBAD : <span>{user.playerLicense}</span></li>
            <li>Genre : <span>{genderText(user.genderId)}</span></li>
            {user.gender_id === 1
              ? <li>Né le : <span>{dateFr(user.birthdate)}</span></li>
              : <li>Née le : <span>{dateFr(user.birthdate)}</span></li>}
            <li>Adresse : <span>{user.address}</span></li>
            <li>Contact : <span>{user.email}</span><span>{user.phone}</span></li>
          </ul>
        </div>
        <div className="stats">
          <h2 className="section-title">Mes statistiques</h2>
          <ul>
            <li>Participations totales : <span>3</span></li>
            <li>Matchs joués : <span>24</span></li>
            <li>Victoires en simple : <span>1</span></li>
            <li>Victoires en double : <span>0</span></li>
            <li>Victoires en mixte : <span>2</span></li>
          </ul>
        </div>
      </div>
      <Link className="action-btn" to="/modifier-profil">
        <button type="button">
          <i className="fa fa-pencil" aria-hidden="true" />
          &nbsp;
          Modifier mon profil
        </button>
      </Link>
    </main>
  );
}

export default Profil;
