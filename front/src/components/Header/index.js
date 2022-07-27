import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import logo from 'src/assets/logo-petit-tournament.svg';
import config from 'src/config';

function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => (state.user));

  const handleLogout = () => {
    dispatch({
      type: 'LOGOUT',
    });
  };
  const userAvatar = `${config.path.uploads.avatar}/${user.avatar}`;

  return (
    <header className="header">
      <Link to="/tableau-de-bord" title="Retour au tableau de bord" className="header-logo">
        <img src={logo} alt="Logo Tournament" />
      </Link>
      <h1 className="header-club-name">Bayard Bad</h1>
      <div className="header-user-menu">
        <p className="header-user-welcome">
          Bonjour <span className="header-member-firstname"> {user.displayName}</span>
          &nbsp;<i className="fa fa-user fa-1x" aria-hidden="true" />
        </p>
        <div className="header-user-menu-pannel">
          <div className="user-image">
            <img src={userAvatar} alt={user.displayName} />
          </div>
          <ul>
            <li>
              <Link className="pannel-link" to="/profil">Mon profil</Link>
            </li>
            <li>
              <Link className="pannel-link" to="/connexion" onClick={() => handleLogout()}>Déconnexion</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
