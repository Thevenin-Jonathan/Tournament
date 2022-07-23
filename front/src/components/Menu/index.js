import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function Menu() {
  const dispatch = useDispatch();

  const ui = useSelector((state) => (state.interface));

  const handleToggleMenu = () => {
    dispatch({
      type: 'TOGGLE_MENU',
      value: !ui.menuIsOpen,
    });
  };

  const handleCloseMenu = () => {
    dispatch({
      type: 'CLOSE_MENU',
    });
  };

  return (
    <nav className={ui.menuIsOpen ? 'menu open' : 'menu'}>
      <button
        type="button"
        className={ui.menuIsOpen ? 'toggle-menu-button open' : 'toggle-menu-button'}
        onClick={handleToggleMenu}
      >
        {ui.menuIsOpen ? <i className="fa fa-times" aria-hidden="true" /> : <i className="fa fa-bars" aria-hidden="true" />}
      </button>
      <ul>
        <li>
          <NavLink
            onClick={handleCloseMenu}
            to="/tableau-de-bord"
            className={({ isActive }) => (isActive ? 'menu-link menu-link--selected' : 'menu-link')}
          >
            <i className="fa fa-home fa-fw" aria-hidden="true" />&nbsp; Tableau de bord
          </NavLink>
        </li>

        <li>
          <NavLink
            onClick={handleCloseMenu}
            to="/tournois"
            className={({ isActive }) => (isActive ? 'menu-link menu-link--selected' : 'menu-link')}
          >
            <i className="fa fa-trophy fa-fw" aria-hidden="true" />&nbsp; Tournois
          </NavLink>
        </li>

        <li>
          <NavLink
            onClick={handleCloseMenu}
            to="/club"
            className={({ isActive }) => (isActive ? 'menu-link menu-link--selected' : 'menu-link')}
          >
            <i className="fa fa-flag fa-fw" aria-hidden="true" />&nbsp; Club
          </NavLink>
        </li>

        <li>
          <NavLink
            onClick={handleCloseMenu}
            to="/membres"
            className={({ isActive }) => (isActive ? 'menu-link menu-link--selected' : 'menu-link')}
          >
            <i className="fa fa-users fa-fw" aria-hidden="true" />&nbsp; Membres
          </NavLink>
        </li>

        <li>
          <NavLink
            onClick={handleCloseMenu}
            to="/classements"
            className={({ isActive }) => (isActive ? 'menu-link menu-link--selected' : 'menu-link')}
          >
            <i className="fa fa-list-ol fa-fw" aria-hidden="true" />&nbsp; Classements
          </NavLink>
        </li>

        <li>
          <NavLink
            onClick={handleCloseMenu}
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
