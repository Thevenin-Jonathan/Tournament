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

  const filter = 10;
  const hallOfFameFilter = () => {
    if (filter === '') {
      return user.members;
    }
    return user.members.filter((member) => (
      member.id <= filter
    ));
  };

  const tournamentsFilter = (tournamentState) => tournaments.filter((tournament) => (
    tournament.state_id === tournamentState
  ));

  // const tournamentCover = `${config.path.uploads.coverTournament}/cover-tournament-01.jpg`;
  // import clublogo from 'src/assets/logo-bayard-bad-blanc.png';

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
        <p className="tournament-text">Tournois Archivés</p>
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
      </div>

      <Link to="/classements" className="dashboard-widget hall-of-fame">
        <i className="fa fa-star fa-2x hof-icon widget-icon" />
        <p className="hof-title">Hall of Fame</p>
        <ol>
          { hallOfFameFilter().map((member, index) => (
            <li key={member.id}>
              <span className="player-name">
                {(index + 1)}. {member.firstname}
              </span>
              <span className="player-victory"> X <i className="fa fa-trophy" /></span>
            </li>
          ))}
          {/* <li className="champion">
            <span className="player-name">1. Alexis Viney</span>
            <span className="player-victory"> 7 <i className="fa fa-trophy" /></span>
          </li>
          <li>
            <span className="player-name">2. Célia Guigue</span>
            <span className="player-victory"> 4 <i className="fa fa-trophy" /></span>
          </li>
          <li>
            <span className="player-name">3. Claudia Jacob</span>
            <span className="player-victory"> 3 <i className="fa fa-trophy" /></span>
          </li>
          <li>
            <span className="player-name">4. Jonathan Thevenin</span>
            <span className="player-victory"> 2 <i className="fa fa-trophy" /></span>
          </li>
          <li>
            <span className="player-name">5. Cédric Bernard</span>
            <span className="player-victory"> 2 <i className="fa fa-trophy" /></span>
          </li>
          <li>
            <span className="player-name">6 El Houceine El Handouz</span>
            <span className="player-victory"> 2 <i className="fa fa-trophy" /></span>
          </li>
          <li>
            <span className="player-name">7. Tino Pajaro</span>
            <span className="player-victory"> 2 <i className="fa fa-trophy" /></span>
          </li>
          <li>
            <span className="player-name">8. Tom Roche</span>
            <span className="player-victory"> 2 <i className="fa fa-trophy" /></span>
          </li> */}
        </ol>
      </Link>

    </main>
  );
}

export default Dashboard;
