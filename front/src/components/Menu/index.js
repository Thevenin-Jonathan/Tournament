import { NavLink } from 'react-router-dom';

function Menu() {
  return (
    <nav className="menu">
      <NavLink to="/tableau-de-bord">Tableau de bord</NavLink>
      <NavLink to="/tournois">Tournois</NavLink>
      <NavLink to="/club">Club</NavLink>
      <NavLink to="/membres">Membres</NavLink>
      <NavLink to="/classements">Classements</NavLink>
    </nav>
  );
}

export default Menu;
