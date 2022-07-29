// == Import
import { useEffect } from 'react';
import {
  Routes, Route, Navigate, /* useLocation */
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './styles.scss';
import Home from '../Home';
import Dashboard from '../Dashboard';
import Club from '../Club';
import Header from '../Header';
import Menu from '../Menu';
import Tournaments from '../Tournaments';
import Error from '../Error';
import LoginForm from '../LoginForm';
import Profil from '../Profil';
import UpdateProfil from '../UpdateProfil';
import Members from '../Members';
import Member from '../Member';
// eslint-disable-next-line no-unused-vars
import AddMembersForm from '../AddMembersForm';
import Help from '../Help';
import Loader from '../Loader';
import Toast from '../Toast';

// == Composant
function App() {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => (state.interface.isLoading));
  const isLogged = useSelector((state) => (state.user.logged));
  const isAdmin = useSelector((state) => (state.user.isAdmin));

  // chargement de data globales (liste des roles, des genres...)
  // useEffect(() => {
  //   dispatch({ type: 'GET_ROLES' });
  //   dispatch({ type: 'GET_GENDERS' });
  // });

  // Connexion auto avec token
  useEffect(() => {
    // si logged = false
    if (!isLogged) {
      // tester si token présent
      // récuperer le token dans le local storage
      const currentUser = JSON.parse(localStorage.getItem('authToken'));
      // si pas de token
      if (!currentUser) {
        // on verouille l'acces
        dispatch({
          type: 'LOGOUT',
        });
      }
      else {
        // sinon on login
        dispatch({
          type: 'TOKEN_LOGIN',
          token: currentUser,
        });
      }
    }
  });

  if (!isLogged) {
    // Public Routes
    return (
      <>
        <Toast />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/connexion" element={<LoginForm />} />
          <Route path="/mot-de-passe-perdu" element={<h1>Formulaire de récupération de mot de passe</h1>} />
          <Route path="*" element={<Error />} />
        </Routes>
      </>
    );
  }

  // Privates Routes
  return (
    <div className="app">
      <Header />
      <Menu />
      <Toast />
      {isLoading && <Loader />}
      <Routes>
        <Route path="/connexion" element={<Navigate to="/tableau-de-bord" />} />
        <Route path="/tableau-de-bord" element={<Dashboard />} />
        <Route path="/tournois" element={<Tournaments />} />
        <Route path="/club" element={<Club />} />
        <Route path="/membres" element={<Members />} />
        <Route path="/membres/:id" element={<Member />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/modifier-profil" element={<UpdateProfil />} />
        <Route path="/aide" element={<Help />} />
        {isAdmin && (
          <>
            <Route path="/membres/ajouter-membres" element={<AddMembersForm />} />
            <Route path="/tournois/creer-tournoi" element={<h1>Ici le composant AddTournamentForm</h1>} />
          </>
        )}
        <Route path="/membres/ajouter-membres" element={<Error />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

// == Export
export default App;
