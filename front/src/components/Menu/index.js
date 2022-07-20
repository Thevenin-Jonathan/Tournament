import { NavLink } from 'react-router-dom';

function Menu() {
  return (
    <nav className="menu">
      <ul>
        <li>
          <NavLink
            to="/tableau-de-bord"
            className={({ isActive }) => (isActive ? 'menu-link menu-link--selected' : 'menu-link')}
          >
            <i className="fa fa-home fa-fw" aria-hidden="true" />&nbsp; Tableau de bord
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/tournois"
            className={({ isActive }) => (isActive ? 'menu-link menu-link--selected' : 'menu-link')}
          >
            <i className="fa fa-trophy fa-fw" aria-hidden="true" />&nbsp; Tournois
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/club"
            className={({ isActive }) => (isActive ? 'menu-link menu-link--selected' : 'menu-link')}
          >
            <i className="fa fa-flag fa-fw" aria-hidden="true" />&nbsp; Club
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/membres"
            className={({ isActive }) => (isActive ? 'menu-link menu-link--selected' : 'menu-link')}
          >
            <i className="fa fa-users fa-fw" aria-hidden="true" />&nbsp; Membres
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/classements"
            className={({ isActive }) => (isActive ? 'menu-link menu-link--selected' : 'menu-link')}
          >
            <i className="fa fa-list-ol fa-fw" aria-hidden="true" />&nbsp; Classements
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/aide"
            className={({ isActive }) => (isActive ? 'menu-link menu-link--selected' : 'menu-link')}
          >
            <i className="fa fa-question-circle fa-fw" aria-hidden="true" />&nbsp; Aide
          </NavLink>
        </li>

      </ul>
    </nav>
  );
}

export default Menu;
