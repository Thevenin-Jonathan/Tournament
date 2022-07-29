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
            key={tournament.id}
            state={tournament.state_id}
            name={tournament.title}
            discipline={tournament.discipline_id}
            players={18}
            matchLeft={11}
            slug={tournament.title}
            cover={tournament.picture_url}
          />
        ))}
      </section>

      <section>
        <h2 className="title-h2">Tournois en cours</h2>
        <p>Ces tournois sont en cours de jeu</p>
        {tournamentsFilter(3).map((tournament) => (
          <TournamentCard
            key={tournament.id}
            state={tournament.state_id}
            name={tournament.title}
            discipline={tournament.discipline_id}
            players={18}
            matchLeft={11}
            slug={tournament.title}
            cover={tournament.picture_url}
          />
        ))}
      </section>

      <section>
        <h2 className="title-h2">Tournois en préparation</h2>
        <p>Ces tournois vont se jouer sous peu, les inscriptions sont fermées</p>
        {tournamentsFilter(2).map((tournament) => (
          <TournamentCard
            key={tournament.id}
            state={tournament.state_id}
            name={tournament.title}
            discipline={tournament.discipline_id}
            players={18}
            matchLeft={11}
            slug={tournament.title}
            cover={tournament.picture_url}
          />
        ))}
      </section>

      <section className="archived-tournaments">
        <h2 className="title-h2">Tournois archivés</h2>
        <p>Ces tournois sont terminés, vous pouvez consulter les résultats</p>
        {tournamentsFilter(4).map((tournament) => (
          <TournamentCard
            key={tournament.id}
            state={tournament.state_id}
            name={tournament.title}
            discipline={tournament.discipline_id}
            players={18}
            matchLeft={11}
            slug={tournament.title}
            cover={tournament.picture_url}
          />
        ))}
      </section>

    </main>
  );
}

export default Tournaments;
