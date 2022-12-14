import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import logoBig from 'src/assets/img/logo-grand-tournament.png';

function LoginForm() {
  const dispatch = useDispatch();

  const changeField = (value, input) => {
    dispatch({
      type: 'CHANGE_FIELD',
      input,
      value,
    });
  };

  const handleLoginSubmit = (evt) => {
    evt.preventDefault();
    dispatch({
      type: 'SUBMIT_LOGIN',
    });
  };

  return (
    <main className="login-page">
      <div className="wrapper">
        <Link to="/" title="Retour à la home Tournament" className="logo-tournament">
          <img src={logoBig} alt="Logo Tournament" />
        </Link>

        <form className="login-form" onSubmit={handleLoginSubmit}>
          <h1>Connexion <span>Club</span></h1>

          <div className="input-line">
            <label htmlFor="email" className="non-necessary-label"><i className="fa fa-at" aria-hidden="true" /> Identifiant (email) </label>
            <input
              onChange={(evt) => changeField(evt.target.value, 'email')}
              type="email"
              name="email"
              id="email"
              className="login-input text-input"
              placeholder="president@club.fr"
            />
          </div>

          <div className="input-line">
            <label htmlFor="password" className="non-necessary-label"><i className="fa fa-at" aria-hidden="true" /> Mot de passe </label>
            <input
              onChange={(evt) => changeField(evt.target.value, 'password')}
              type="password"
              name="password"
              id="password"
              className="password-input text-input"
              placeholder="•••••"
            />
          </div>

          <div className="input-line rememberme">
            <input type="checkbox" name="rememberme" id="rememberme" className="rememberme-input checkbox-input" />
            <label htmlFor="rememberme">Se souvenir de moi</label>
          </div>

          <div className="input-line">
            <input type="submit" className="submit-input button-input" value="Connexion" />
          </div>

          <div className="help-links">
            <p className="help-link"><Link to="/mot-de-passe-perdu"><i className="fa fa-arrow-right" aria-hidden="true" />&nbsp;Mot de passe oublié ?</Link></p>
            <p className="help-link"><Link to="/contact"><i className="fa fa-arrow-right" aria-hidden="true" />&nbsp;Pas encore de compte ?</Link></p>
          </div>

        </form>

        <footer>
          © Tournament 2022
        </footer>
      </div>
    </main>
  );
}

export default LoginForm;
