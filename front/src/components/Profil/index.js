import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { genderText, dateFr, formatPhoneNumber } from 'src/utils';
import config from 'src/config';
// import Loader from '../Loader';

function Profil() {
  const dispatch = useDispatch();
  const user = useSelector((state) => (state.user));
  const userStats = useSelector((state) => (state.stats.userStats));
  // const isLoading = useSelector((state) => (state.interface.isLoading));

  // console.log(userStats.double_men.nb_played);
  // console.log(stat(userStats.double_men));

  useEffect(() => {
    dispatch({
      type: 'GET_PROFILE',
      value: user.id,
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: 'GET_USER_STATS',
      value: user.id,
    });
  }, []);

  // const stat = (x) => {
  //   if (x === userStats.double_men) {
  //     return userStats.double_men[0];
  //   }
  //   return false;
  // };

  // console.log(stat(userStats.double_men));

  const userAvatar = `${config.path.uploads.avatar}/${user.avatar}`;

  // if (isLoading) {
  //   return <Loader />;
  // }

  return (

    <main className="content profil">
      <h1 className="title">Mon profil</h1>

      <div className="wrapper">

        <h2 className="infos-title">{user.firstname} {user.lastname.toUpperCase()}</h2>

        <div className="wrapper-infos">
          <div className="sub-wrapper-infos">
            <img
              className="member-avatar"
              src={userAvatar}
              alt={`${user.firstname} Avatar`}
            />

            <div className="member-infos">
              <div>license FFBAD : <span>{user.playerLicense}</span></div>
              { (user.gender_id === 1)
                ? <div>Née le : <span>{dateFr(user.birthdate)}</span></div>
                : <div>Né le : <span>{dateFr(user.birthdate)}</span></div>}
              <div>Genre : <span>{genderText(user.genderId)}</span></div>
              <div>Adresse : <span>{user.address}</span></div>
              <div>Email : <span>{user.email}</span></div>
              <div>Téléphone : <span>{formatPhoneNumber(user.phone)}</span></div>

            </div>
          </div>
        </div>

        <h2 className="stats-title">Mes statistiques</h2>

        <div className="wrapper-stats">

          <div className="row">
            <div className="col-title">Simple</div>
            <div className="col">Matchs : &nbsp;<span>4</span></div>
            <div className="col">Gagnés : &nbsp;<span>1</span></div>
            <div className="col">Ratio : &nbsp;<span>25%</span></div>
          </div>
          <div className="row">
            <div className="col-title">Double</div>
            <div className="col">Matchs : &nbsp;<span>1</span></div>
            <div className="col">Gagnés : &nbsp;<span>1</span></div>
            <div className="col">Ratio : &nbsp;<span>100%</span></div>
          </div>
          <div className="row">
            <div className="col-title">Double Mixtes</div>
            <div className="col">Matchs : &nbsp;<span>2</span></div>
            <div className="col">Gagnés : &nbsp;<span>1</span></div>
            <div className="col">Ratio : &nbsp;<span>50%</span></div>
          </div>

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
