// == Import
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Dashboard from '../Dashboard';
import Header from '../Header';
import Menu from '../Menu';
import Tournaments from '../Tournaments';
import Error from '../Error';
import './styles.scss';
import LoginForm from '../LoginForm';

// == Composant
function App() {
  const isLogged = useSelector((state) => (state.user.logged));
  // if not connected
  if (!isLogged) {
    // display public content
    return (
      <Routes>
        <Route path="/" element={<h1>Hello public content (page promo)</h1>} />
        <Route path="/connexion" element={<LoginForm />} />
        <Route path="/mot-de-passe-perdu" element={<h1>Formulaire de récupération de mot de passe</h1>} />
        <Route path="*" element={<Error />} />
      </Routes>
    );
  }

  return (
    <div className="app">
      <Header />
      <Menu />
      <Routes>
        <Route path="/tableau-de-bord" element={<Dashboard />} />
        <Route path="/tournois" element={<Tournaments />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

// == Export
export default App;
