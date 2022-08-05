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
  console.log(user);
  const userAvatar = `${config.path.uploads.avatar}/${user.avatar}`;

  return (
    <main className="content profil">
      <h1 className="title">Mon profil</h1>

      <div className="wrapper-sections">

        <section className="section-left">
          <h2 className="member-name">{user.firstname} {user.lastname}</h2>
          <div className="member-infos">
            <img
              className="member-avatar"
              src={userAvatar}
              alt={`${user.firstname} Avatar`}
            />
          </div>

          <div className="member-infos">license FFBAD : <span>{user.playerLicense}</span></div>
          <div className="member-infos">Genre : <span>{genderText(user.genderId)}</span></div>
          { (user.gender_id === 1)
            ? <div className="member-infos">Née le : <span>{dateFr(user.birthdate)}</span></div>
            : <div className="member-infos">Né le : <span>{dateFr(user.birthdate)}</span></div>}
          <div className="member-infos">Adresse : <span>{user.address}</span></div>
          <div className="member-infos">Contact :
            <span>{user.email}</span>
            <span>{formatPhoneNumber(user.phone)}</span>
          </div>

        </section>

        <section className="section-right">
          <h2 className="stats-title">Statistiques</h2>

          <div className="member-infos">Participations totales : <span>3</span></div>
          <div className="member-infos">Matchs joués : <span>24</span></div>
          <div className="member-infos">Victoires en simple : <span>1</span></div>
          <div className="member-infos">Victoires en double : <span>0</span></div>
          <div className="member-infos">Victoires en mixte : <span>2</span></div>

        </section>
      </div>

      <Link className="action-btn" to="/profil/modifier-profil">
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
