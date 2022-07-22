// == Import
import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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

// == Composant
function App() {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => (state.user.logged));

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
      <Routes>
        <Route path="/connexion" element={<Navigate to="/tableau-de-bord" />} />
        <Route path="/tableau-de-bord" element={<Dashboard />} />
        <Route path="/tournois" element={<Tournaments />} />
        <Route path="/club" element={<Club />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

// == Export
export default App;
