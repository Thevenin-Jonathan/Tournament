import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function Profil() {
  const dispatch = useDispatch();
  const user = useSelector((state) => (state.user));
  useEffect(() => {
    dispatch({
      type: 'GET_PROFILE',
      value: user.id,
    });
  }, []);

  return (
    <main className="content profil">
      <h1 className="title">Mon profil</h1>

      <div className="profil-content">
        <div className="profil-infos">
          <img className="profil-image" src={user.avatar} alt={`${user.firstname} Avatar`} />
          <ul className="profil-details">
            <li>
              <button type="button" className="list-item-btn">
                <i className="fa fa-pencil" aria-hidden="true" />
              </button>
              {user.firstname} {user.lastname}
            </li>
            <li>
              <button type="button" className="list-item-btn">
                <i className="fa fa-pencil" aria-hidden="true" />
              </button>
              {user.playerLicense}
            </li>
            <li>
              <button type="button" className="list-item-btn">
                <i className="fa fa-pencil" aria-hidden="true" />
              </button>
              {user.genderId}
            </li>
            <li>
              <button type="button" className="list-item-btn">
                <i className="fa fa-pencil" aria-hidden="true" />
              </button>
              {user.birthdate}
            </li>
            <li>
              <button type="button" className="list-item-btn">
                <i className="fa fa-pencil" aria-hidden="true" />
              </button>
              {user.address}
            </li>
            <li>
              <button type="button" className="list-item-btn">
                <i className="fa fa-pencil" aria-hidden="true" />
              </button>
              {user.email}
            </li>
            <li>
              <button type="button" className="list-item-btn">
                <i className="fa fa-pencil" aria-hidden="true" />
              </button>
              {user.phone}
            </li>
          </ul>
        </div>
        <div className="profil-stats">
          <h2>Mes statistiques</h2>
          <ul>
            <li>Participations totales: 3</li>
            <li>Matchs joués: 24</li>
            <li>Victoires en simple: 1</li>
            <li>Victoires en double: 0</li>
            <li>Victoires en mixte: 2</li>
          </ul>
        </div>
      </div>
    </main>
  );
}

export default Profil;
