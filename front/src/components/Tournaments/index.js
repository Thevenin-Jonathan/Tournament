/* eslint-disable jsx-a11y/label-has-associated-control */
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import TournamentCard from '../TournamentCard';

function Tournaments() {
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => (state.user.isAdmin));
  const tournaments = useSelector((state) => (state.tournament));
  const tournamentsList = tournaments.tournaments;

  useEffect(() => {
    dispatch({
      type: 'GET_TOURNAMENTS',
    });
  }, []);

  const changeField = (value, input) => {
    dispatch({
      type: 'CHANGE_FIELD_TOURNAMENT',
      input,
      value,
    });
  };

  // Pré filtrer la liste complete (filtres de la page Tournaments)
  const buildFilterFromState = () => {
    // objet vide dans lequel on push sur les clés, les champs cochés
    const filter = {
      state_id: [],
      discipline_id: [],
    };
    // if (
    //   !tournaments.filterState1
    //   && !tournaments.filterState2
    //   && !tournaments.filterState3
    //   && !tournaments.filterState4) {
    //   filter.state_id.push(1, 2, 3, 4);
    // }
    if (tournaments.filterState0) filter.state_id.push(1, 2, 3, 4);
    if (tournaments.filterState1) filter.state_id.push(1);
    if (tournaments.filterState2) filter.state_id.push(2);
    if (tournaments.filterState3) filter.state_id.push(3);
    if (tournaments.filterState4) filter.state_id.push(4);
    if (tournaments.filterDiscipline0) filter.discipline_id.push(1, 2, 3, 4, 5);
    if (tournaments.filterDiscipline1) filter.discipline_id.push(1);
    if (tournaments.filterDiscipline2) filter.discipline_id.push(2);
    if (tournaments.filterDiscipline3) filter.discipline_id.push(3);
    if (tournaments.filterDiscipline4) filter.discipline_id.push(4);
    if (tournaments.filterDiscipline5) filter.discipline_id.push(5);
    return filter;
  };

  const filter = buildFilterFromState();

  // à l'aide de l'objet "filter" construit à partir du state,
  // on préfiltre le tableau des tournois
  const filterData = (data, query) => {
    const filteredData = data.filter((item) => {
      // eslint-disable-next-line no-restricted-syntax
      for (const key in query) {
        if (item[key] === undefined || !query[key].includes(item[key])) {
          return false;
        }
      }
      return true;
    });
    return filteredData;
  };

  // filtre par status pour injecter dans les sections
  const tournamentsFilter = (tournamentState) => filterData(tournamentsList, filter)
    .filter((tournament) => (
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
        <h3>Statuts</h3>
        <ul>
          <li>
            <label>
              <input
                type="checkbox"
                name="filterState0"
                onChange={(evt) => {
                  changeField(evt.target.checked, evt.target.name);
                  changeField(false, 'filterState1');
                  changeField(false, 'filterState2');
                  changeField(false, 'filterState3');
                  changeField(false, 'filterState4');
                }}
                checked={tournaments.filterState0}
              />
              Tous
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                name="filterState1"
                onChange={(evt) => {
                  changeField(evt.target.checked, evt.target.name);
                  changeField(false, 'filterState0');
                }}
                checked={tournaments.filterState1}
              />
              Ouverts
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                name="filterState3"
                onChange={(evt) => {
                  changeField(evt.target.checked, evt.target.name);
                  changeField(false, 'filterState0');
                }}
                checked={tournaments.filterState3}
              />
              En cours
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                name="filterState2"
                onChange={(evt) => {
                  changeField(evt.target.checked, evt.target.name);
                  changeField(false, 'filterState0');
                }}
                checked={tournaments.filterState2}
              />
              En préparation
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                name="filterState4"
                onChange={(evt) => {
                  changeField(evt.target.checked, evt.target.name);
                  changeField(false, 'filterState0');
                }}
                checked={tournaments.filterState4}
              />
              Archivés
            </label>
          </li>
        </ul>

        <h3>Disciplines</h3>
        <ul>
          <li>
            <label>
              <input
                type="checkbox"
                name="filterDiscipline0"
                onChange={(evt) => {
                  changeField(evt.target.checked, evt.target.name);
                  changeField(false, 'filterDiscipline1');
                  changeField(false, 'filterDiscipline2');
                  changeField(false, 'filterDiscipline3');
                  changeField(false, 'filterDiscipline4');
                  changeField(false, 'filterDiscipline5');
                }}
                checked={tournaments.filterDiscipline0}
              />
              Tous
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                name="filterDiscipline1"
                onChange={(evt) => {
                  changeField(evt.target.checked, evt.target.name);
                  changeField(false, 'filterDiscipline0');
                }}
                checked={tournaments.filterDiscipline1}
              />
              Simple Homme
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                name="filterDiscipline2"
                onChange={(evt) => {
                  changeField(evt.target.checked, evt.target.name);
                  changeField(false, 'filterDiscipline0');
                }}
                checked={tournaments.filterDiscipline2}
              />
              Simple Dame
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                name="filterDiscipline3"
                onChange={(evt) => {
                  changeField(evt.target.checked, evt.target.name);
                  changeField(false, 'filterDiscipline0');
                }}
                checked={tournaments.filterDiscipline3}
              />
              Double Homme
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                name="filterDiscipline4"
                onChange={(evt) => {
                  changeField(evt.target.checked, evt.target.name);
                  changeField(false, 'filterDiscipline0');
                }}
                checked={tournaments.filterDiscipline4}
              />
              Double Dame
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                name="filterDiscipline5"
                onChange={(evt) => {
                  changeField(evt.target.checked, evt.target.name);
                  changeField(false, 'filterDiscipline0');
                }}
                checked={tournaments.filterDiscipline5}
              />
              Double Mixte
            </label>
          </li>

        </ul>
      </div>

    </main>
  );
}

export default Tournaments;
