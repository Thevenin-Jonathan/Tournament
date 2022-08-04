import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import config from 'src/config';
import { formatPhoneNumber } from 'src/utils';

function Club() {
  // je récupère le state du reducer 'club'
  const club = useSelector((state) => (state.club));
  const user = useSelector((state) => (state.user));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'GET_CLUB',
      value: 1,
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: 'GET_MEMBERS',
    });
  }, []);

  return (
    <main className="content club">
      <h1 className="title">Profil du club</h1>
      <div className="wrapper-sections">
        <section className="section-left">
          <h2 className="club-name">{club.name}</h2>
          <ul>
            <li>Nombre de membres :<span>{user.members.length}</span></li>
            <li>Adresse :<span>{club.address}</span></li>
            <li>
              Contact :<span>{club.email}</span>
              <span>Tél. {formatPhoneNumber(club.phone)}</span>
            </li>
            <li>Site internet : <span>{club.website}</span></li>
          </ul>
        </section>

        <section className="section-right">
          <img
            className="club-logo"
            src={`${config.path.uploads.logoClub}/${club.logo}`}
            alt={`Logo du club ${club.name}`}
          />
          <div className="club-description">Description : <span>{club.description}</span></div>
        </section>
      </div>
    </main>
  );
}

export default Club;
