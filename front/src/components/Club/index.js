import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import clublogo from 'src/assets/logo-bayard-bad-blanc.png';

function Club() {
  // je récupère le state du reducer 'club'
  const club = useSelector((state) => (state.club));
  console.log(club);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: 'GET_CLUB',
      value: 1,
    });
  }, []);

  return (
    <main className="content club">
      <h1 className="title">Profil du club</h1>

      <div className="club-card">
        <h2 className="club-name">Bayard Bad</h2>
        <img className="club-avatar" src={clublogo} alt="Logo du club" />
        <ul>
          <li>Nombre de membres :<span>92</span></li>
          <li>Adresse :<span>{club.address}</span></li>
          <li>Contact :<span>{club.email}</span><span>{club.phone}</span></li>
          <li>Site internet : <span>{club.website}</span></li>
          <li>Description : <span>{club.description}</span></li>
        </ul>
      </div>
    </main>
  );
}

export default Club;
