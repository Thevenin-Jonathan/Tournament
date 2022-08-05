import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import config from 'src/config';
import { formatPhoneNumber } from 'src/utils';
import clubImage from '../../../public/photo-club-bayardbad.jpg';

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
          <img
            className="club-logo club-infos"
            src={`${config.path.uploads.logoClub}/${club.logo}`}
            alt={`Logo du club ${club.name}`}
          />
          <div className="club-infos">Nombre de membres :<span>{user.members.length}</span></div>
          <div className="club-infos">Adresse :<span>{club.address}</span></div>
          <div className="club-infos">
            Contact :<span>{club.email}</span>
            <span>Tél. {formatPhoneNumber(club.phone)}</span>
          </div>
          <div className="club-infos">Site internet : <span>{club.website}</span></div>
        </section>

        <section className="section-right">
          {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
          <img src={clubImage} alt={`Photo du club ${club.name}`} />
          <div className="club-infos">Description : <span>{club.description}</span></div>
        </section>

      </div>

    </main>
  );
}

export default Club;
