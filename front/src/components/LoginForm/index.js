import { Link } from 'react-router-dom';

import logoBig from 'src/assets/img/logo-grand-tournament.png';

function LoginForm() {
  return (
    <main className="login-page">
      <div className="wrapper">
        <a href="/" title="Retour à la home Tournament" className="logo-tournament">
          <img src={logoBig} alt="Logo Tournament" />
        </a>

        <form action="/connexion" className="login-form" method="POST">
          <h1>Connexion <span>Club</span></h1>

          <div className="input-line">
            <label htmlFor="email" className="non-necessary-label"><i className="fa fa-at" aria-hidden="true" /> Identifiant (email) </label>
            <input type="email" name="email" id="email" className="login-input text-input" placeholder="president@club.fr" />
          </div>

          <div className="input-line">
            <label htmlFor="password" className="non-necessary-label"><i className="fa fa-at" aria-hidden="true" /> Mot de passe </label>
            <input type="password" name="password" id="password" className="password-input text-input" placeholder="•••••" />
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
