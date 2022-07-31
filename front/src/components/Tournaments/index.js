/* eslint-disable jsx-a11y/label-has-associated-control */
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import TournamentCard from '../TournamentCard';

function Tournaments() {
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => (state.user.isAdmin));
  const tournaments = useSelector((state) => (state.tournament.tournaments));

  useEffect(() => {
    dispatch({
      type: 'GET_TOURNAMENTS',
    });
  }, []);

  const tournamentsFilter = (tournamentState) => tournaments.filter((tournament) => (
    tournament.state_id === tournamentState
  ));

  return (
    <main className="tournaments content">

      <div className="tournaments-list">
        <h1 className="title">Tous les tournois</h1>

        {isAdmin && (
        <Link to="/tournois/creer-tournoi" className="button create-tournament-button">
          <i className="fa fa-trophy fa-2x tournament-icon" /> Organiser un <span>nouveau tournoi</span>
        </Link>
        )}
        <section>
          <h2 className="title-h2">Tournois ouverts</h2>
          <p>Ces tournois sont ouverts aux inscriptions</p>
          {tournamentsFilter(1).map((tournament) => (
            <TournamentCard
              tournament={tournament}
              key={tournament.id}
            />
          ))}
        </section>

        <section>
          <h2 className="title-h2">Tournois en cours</h2>
          <p>Ces tournois sont en cours de jeu</p>
          {tournamentsFilter(3).map((tournament) => (
            <TournamentCard
              tournament={tournament}
              key={tournament.id}
            />
          ))}
        </section>

        <section>
          <h2 className="title-h2">Tournois en préparation</h2>
          <p>Ces tournois vont se jouer sous peu, les inscriptions sont fermées</p>
          {tournamentsFilter(2).map((tournament) => (
            <TournamentCard
              tournament={tournament}
              key={tournament.id}
            />
          ))}
        </section>

        <section className="archived-tournaments">
          <h2 className="title-h2">Tournois archivés</h2>
          <p>Ces tournois sont terminés, vous pouvez consulter les résultats</p>
          {tournamentsFilter(4).map((tournament) => (
            <TournamentCard
              tournament={tournament}
              key={tournament.id}
            />
          ))}
        </section>
      </div> {/* /tournament-list */}

      <div className="tournaments-filter">
        <h2><i className="fa fa-sliders" aria-hidden="true" /> Filtres</h2>
        <h3>Status</h3>
        <ul>
          <li>
            <label>
              <input type="checkbox" name="ouvert" />
              Ouverts
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" name="en-cours" />
              En cours
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" name="preparation" />
              En préparation
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" name="archives" />
              Archivés
            </label>
          </li>
        </ul>

        <h3>Disciplines</h3>
        <ul>
          <li>
            <label>
              <input type="checkbox" name="sh" />
              Simple Homme
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" name="sd" />
              Simple Dame
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" name="dh" />
              Double Homme
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" name="dd" />
              Double Dame
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" name="dx" />
              Double Mixte
            </label>
          </li>

        </ul>
      </div>

    </main>
  );
}

export default Tournaments;
