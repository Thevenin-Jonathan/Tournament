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
            Tableau de bord
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/tournois"
            className={({ isActive }) => (isActive ? 'menu-link menu-link--selected' : 'menu-link')}
          >
            Tournois
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/club"
            className={({ isActive }) => (isActive ? 'menu-link menu-link--selected' : 'menu-link')}
          >
            Club
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/membres"
            className={({ isActive }) => (isActive ? 'menu-link menu-link--selected' : 'menu-link')}
          >
            Membres
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/classements"
            className={({ isActive }) => (isActive ? 'menu-link menu-link--selected' : 'menu-link')}
          >
            Classements
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/aide"
            className={({ isActive }) => (isActive ? 'menu-link menu-link--selected' : 'menu-link')}
          >
            Aide
          </NavLink>
        </li>

      </ul>
    </nav>
  );
}

export default Menu;
