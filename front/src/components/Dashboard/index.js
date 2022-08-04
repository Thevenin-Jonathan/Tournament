/* eslint-disable no-unsafe-optional-chaining */
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import config from 'src/config';
import TournamentCard from '../TournamentCard';

function Dashboard() {
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => (state.user.isAdmin));
  const user = useSelector((state) => (state.user));
  const club = useSelector((state) => (state.club));
  const tournaments = useSelector((state) => (state.tournament.tournaments));
  const stats = useSelector((state) => (state.stats.stats));

  useEffect(() => {
    dispatch({
      type: 'GET_MEMBERS',
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: 'GET_CLUB',
      value: 1,
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: 'GET_TOURNAMENTS',
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: 'GET_STATS',
    });
  }, []);

  const tournamentsFilter = (tournamentState) => tournaments.filter((tournament) => (
    tournament.state_id === tournamentState
  ));

  // const tournamentCover = `${config.path.uploads.coverTournament}/cover-tournament-01.jpg`;
  // import clublogo from 'src/assets/logo-bayard-bad-blanc.png';

  const statFilter = (list) => {
    console.log(list[0]);
  };

  function aggregateVictory(playerWithStats) {
    const totalMatchVictory = (
      playerWithStats?.single_men[0].nb_win
      + playerWithStats?.single_women[0].nb_win
      + playerWithStats?.double_men[0].nb_win
      + playerWithStats?.double_women[0].nb_win
      + playerWithStats?.double_mixed[0].nb_win
    );
    return totalMatchVictory;
  }

  const sortByTotalVictory = (playerListWithStats) => (
    playerListWithStats.sort((a, b) => {
      const aTv = a?.single_men[0].nb_win
      + a?.single_women[0].nb_win
      + a?.double_men[0].nb_win
      + a?.double_women[0].nb_win
      + a?.double_mixed[0].nb_win;

      const bTv = b?.single_men[0].nb_win
      + b?.single_women[0].nb_win
      + b?.double_men[0].nb_win
      + b?.double_women[0].nb_win
      + b?.double_mixed[0].nb_win;

      if (aTv < bTv) {
        return 1;
      }
      if (aTv > bTv) {
        return -1;
      }
      return 0;
    })
  );

  return (
    <main className="dashboard content">

      <Link to="/tableau-de-bord" className="dashboard-widget logo">
        <img src={`${config.path.uploads.logoClub}/${club.logo}`} alt="Logo Bayard Bad" />
      </Link>

      <Link to="/membres" className="dashboard-widget members">
        <i className="fa fa-users fa-2x widget-icon" />
        <p className="members-count">{user.members.length}</p>
        <p className="members-text">Membres</p>
      </Link>

      <Link to="/tournois" className="dashboard-widget tournament">
        <i className="fa fa-trophy fa-2x widget-icon" />
        <p className="tournament-count">{tournaments.length}</p>
        <p className="tournament-text">Tournois</p>
      </Link>

      <Link to="/club" className="dashboard-widget club">
        <i className="fa fa-flag fa-2x widget-icon" />
        <p className="club-text">Le Club</p>
        <p className="club-name">{ club.name }</p>
      </Link>

      <div className="tournament-column">

        {isAdmin && (
        <Link to="/tournois/creer-tournoi" className="button create-tournament-button">
          <i className="fa fa-trophy fa-2x tournament-icon" /> Organiser un <span>nouveau tournoi</span>
        </Link>
        )}

        {tournamentsFilter(1).map((tournament) => (
          <TournamentCard
            tournament={tournament}
            key={tournament.id}
          />
        ))}

        {tournamentsFilter(3).map((tournament) => (
          <TournamentCard
            tournament={tournament}
            key={tournament.id}
          />
        ))}
      </div>

      <Link to="/classements" className="dashboard-widget hall-of-fame">
        <i className="fa fa-star fa-2x hof-icon widget-icon" />
        <p className="hof-title">Hall of Fame</p>
        { statFilter(stats) }
        <ol>
          { sortByTotalVictory(stats).slice(0, 10).map((member, index) => (
            <li key={member.id}>
              <span className="player-name">
                {(index + 1)}. {member.firstname}
              </span>
              <span className="player-victory"> {aggregateVictory(member)} <i className="fa fa-trophy" /></span>
            </li>
          ))}
        </ol>
      </Link>

    </main>
  );
}

export default Dashboard;
