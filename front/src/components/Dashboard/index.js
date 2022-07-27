import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import clublogo from 'src/assets/logo-bayard-bad-blanc.png';

import config from 'src/config';
import TournamentCard from '../TournamentCard';

function Dashboard() {
  const isAdmin = useSelector((state) => (state.user.isAdmin));

  const tournamentCover = `${config.path.uploads.coverTournament}/cover-tournament-01.jpg`;

  return (
    <main className="dashboard content">

      <Link to="/tableau-de-bord" className="dashboard-widget logo">
        <img src={clublogo} alt="Logo Bayard Bad" />
      </Link>

      <Link to="/membres" className="dashboard-widget members">
        <i className="fa fa-users fa-2x widget-icon" />
        <p className="members-count">92</p>
        <p className="members-text">Membres</p>
      </Link>

      <Link to="/tournois" className="dashboard-widget tournament">
        {/* <span className="fa-stack fa-lg">
          <i className="fa fa-trophy fa-stack-2x" />
          <i className="fa fa-star fa-stack-1x" />
        </span> */}
        <i className="fa fa-trophy fa-2x widget-icon" />
        <p className="tournament-count">7</p>
        <p className="tournament-text">Tournois Archivés</p>
      </Link>

      <Link to="/club" className="dashboard-widget club">
        <i className="fa fa-flag fa-2x widget-icon" />
        <p className="club-text">Le Club</p>
        <p className="club-name">Bayard Bad</p>
      </Link>

      <div className="tournament-column">
        <TournamentCard
          name="Tournoi des pros"
          discipline="Double Mixte"
          players={24}
          matchLeft={6}
          slug="tournoi-des-pros"
          cover={tournamentCover}
        />
        {isAdmin && (
          <Link to="/tournois/creer-tournoi" className="button create-tournament-button">
            <i className="fa fa-trophy fa-2x tournament-icon" /> Organiser un <span>nouveau tournoi</span>
          </Link>
        )}
      </div>

      <Link to="/classements" className="dashboard-widget hall-of-fame">
        <i className="fa fa-star fa-2x hof-icon widget-icon" />
        <p className="hof-title">Hall of Fame</p>
        <ol>
          <li className="champion">
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
          </li>
        </ol>
      </Link>

    </main>
  );
}

export default Dashboard;
