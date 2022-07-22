import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import logo from 'src/assets/logo-petit-tournament.svg';

function Header() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({
      type: 'LOGOUT',
    });
  };
  const user = useSelector((state) => (state.user));

  return (
    <header className="header">
      <img src={logo} className="header-logo" alt="Logo Tournament" />
      <h1 className="header-club-name">Bayard Bad</h1>
      <div className="header-user-menu">
        <p className="header-user-welcome">
          Bonjour <span className="header-member-firstname"> {user.displayName}</span>
          &nbsp;<i className="fa fa-user fa-1x" aria-hidden="true" />
        </p>
        <div className="header-user-menu-pannel">
          <div className="user-image">
            <img src={user.avatar} alt={user.displayName} />
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
