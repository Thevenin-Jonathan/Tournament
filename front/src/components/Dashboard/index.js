import { Link } from 'react-router-dom';
import clublogo from 'src/assets/logo-bayard-bad-blanc.png';

import TournamentCard from '../TournamentCard';

function Dashboard() {
  return (
    <main className="dashboard content">

      <Link to="/tableau-de-bord" className="dashboard-widget logo">
        <img src={clublogo} alt="Logo Bayard Bad" />
      </Link>

      <Link to="/membres" className="dashboard-widget members">
        <i className="fa fa-users fa-2x" />
        <p className="members-count">92</p>
        <p className="members-text">Membres</p>
      </Link>

      <Link to="/tournois" className="dashboard-widget tournament">
        {/* <span className="fa-stack fa-lg">
          <i className="fa fa-trophy fa-stack-2x" />
          <i className="fa fa-star fa-stack-1x" />
        </span> */}
        <i className="fa fa-trophy fa-2x" />
        <p className="tournament-count">7</p>
        <p className="tournament-text">Tournois Archivés</p>
      </Link>

      <Link to="/club" className="dashboard-widget club">
        <i className="fa fa-flag fa-2x" />
        <p className="club-text">Le Club</p>
        <p className="club-name">Bayard Bad</p>
      </Link>

      <div className="tournament-column">
        <TournamentCard
          name="Tournoi des pros"
          discipline="Double Mixte"
          players="24"
          matchLeft="6"
          slug="tournoi-des-pros"
          cover="https://i0.wp.com/bayardbad.fr/wp-content/uploads/2022/07/20220702_102843-scaled.jpg"
        />

        <Link to="/tournois/creer-tournoi" className="button create-tournament-button">
          <i className="fa fa-trophy fa-2x tournament-icon" /> Organiser un <span>nouveau tournoi</span>
        </Link>
      </div>

    </main>
  );
}

export default Dashboard;
