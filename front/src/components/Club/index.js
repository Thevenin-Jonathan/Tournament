import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import config from 'src/config';

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

      <div className="club-card">
        <h2 className="club-name">{club.name}</h2>
        <img className="club-avatar" src={`${config.path.uploads.logoClub}/${club.logo}`} alt={`Logo du club ${club.name}`} />
        <ul>
          <li>Nombre de membres :<span>{user.members.length}</span></li>
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
