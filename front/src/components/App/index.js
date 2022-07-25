// == Import
import { useEffect } from 'react';
import {
  Routes, Route, Navigate, useLocation,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Dashboard from '../Dashboard';
import Club from '../Club';
import Header from '../Header';
import Menu from '../Menu';
import Tournaments from '../Tournaments';
import Error from '../Error';
import './styles.scss';
import LoginForm from '../LoginForm';
import Profil from '../Profil';
import Members from '../Members';
import Help from '../Help';
import Loader from '../Loader';

// == Composant
function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isLogged = useSelector((state) => (state.user.logged));
  const isLoading = useSelector((state) => (state.interface.isLoading));

  // a chaque changement d'url
  // useEffect(() => {
  //   dispatch({
  //     type: 'VERIFY_TOKEN',
  //   });
  // }, [location]);

  // au montage du composant
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
      <Routes>
        <Route path="/" element={<h1>Hello public content (page promo)</h1>} />
        <Route path="/connexion" element={<LoginForm />} />
        <Route path="/mot-de-passe-perdu" element={<h1>Formulaire de récupération de mot de passe</h1>} />
        <Route path="*" element={<Error />} />
      </Routes>
    );
  }

  // Privates Routes
  return (
    <div className="app">
      <Header />
      <Menu />
      {isLoading && <Loader />}
      {!isLoading && (
      <Routes>
        <Route path="/connexion" element={<Navigate to="/tableau-de-bord" />} />
        <Route path="/tableau-de-bord" element={<Dashboard />} />
        <Route path="/tournois" element={<Tournaments />} />
        <Route path="/club" element={<Club />} />
        <Route path="/membres" element={<Members />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/aide" element={<Help />} />
        <Route path="*" element={<Error />} />
      </Routes>
      )}
    </div>
  );
}

// == Export
export default App;
