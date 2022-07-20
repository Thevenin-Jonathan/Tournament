import logo from 'src/assets/logo-petit-tournament.svg';

function Header() {
  return (
    <header className="header">
      <img src={logo} className="header-logo" alt="Logo Tournament" />
      <h1 className="header-club-name">Bayard Bad</h1>
      <div className="header-user-menu">
        <p className="header-user-welcome">
          Bonjour <span className="header-member-firstname">François </span>
          <i className="fa fa-user fa-2x" aria-hidden="true" />
        </p>
        <div className="header-user-menu-pannel">
          <div className="user-image">
            <img src="" alt="" />

          </div>
          <ul>
            <li>Mon profil</li>
            <li>Déconnexion</li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
