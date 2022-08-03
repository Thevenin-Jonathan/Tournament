import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { genderText, dateFr } from 'src/utils';
import config from 'src/config';

function Member() {
  // Je récupère mon paramètre id
  const id = useParams();

  // Je récupère le state dans le reducer 'user'
  const user = useSelector((state) => (state.user));

  const dispatch = useDispatch();
  // au chargement j'envoie l'action GET_MEMBER qui
  // récupère le membre correspondant à l'id de l'url
  useEffect(() => {
    dispatch({
      type: 'GET_MEMBER',
      value: id,
    });
  }, []);

  let userAvatar = `${config.path.uploads.avatar}/${user.member.url_avatar}`;
  if (user.member.url_avatar === null) {
    userAvatar = `${config.path.uploads.avatar}/generic-user-${user.member.gender_id}.jpg`;
  }

  return (
    <main className="content member">
      <h1 className="title">{user.member.firstname} {user.member.lastname}</h1>

      <div className="wrapper">
        <div className="member-card">
          <h2 className="section-title">Profil</h2>
          <img className="avatar" src={userAvatar} alt={`${user.member.firstname} Avatar`} />
          <ul>
            <li>License FFBAD : <span>{user.member.player_license}</span></li>
            <li>Genre : <span>{genderText(user.member.gender_id)}</span></li>
            {user.member.gender_id === 1
              ? <li>Né le : <span>{dateFr(user.member.birthdate)}</span></li>
              : <li>Née le : <span>{dateFr(user.member.birthdate)}</span></li>}
            <li>Adresse : <span>{user.member.address}</span></li>
            <li>Email : <span>{user.member.email}</span></li>
          </ul>
        </div>
        <div className="member-stats">
          <h2 className="section-title">Statistiques</h2>
        </div>
      </div>
      <Link className="action-btn" to="/membres">
        <button type="button">
          <i className="fa fa-chevron-left" aria-hidden="true" />
          &nbsp;
          Retour à la liste des membres
        </button>
      </Link>
    </main>
  );
}

export default Member;
