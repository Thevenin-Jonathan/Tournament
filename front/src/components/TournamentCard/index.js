import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function TournamentCard({
  name, discipline, players, matchLeft, slug, cover,
}) {
  return (
    <Link
      to={`/tournois/${slug}`}
      className="tournament-card"
      style={{ backgroundImage: `url(${cover})` }}
    >
      <div className="tournament-layer" />
      <div className="tournament-text">
        <i className="fa fa-trophy fa-2x tournament-icon" />
        <div className="tournament-info">
          <p className="tournament-status">Tournoi en cours</p>
          <p className="tournament-name">{ name }</p>
          <p className="tournament-discipline">{ discipline }</p>
          <p className="tournament-players-count">{ players } Participants</p>
          <p className="tournament-match">{ matchLeft } matchs à jouer</p>
        </div>
      </div>
    </Link>
  );
}

TournamentCard.propTypes = {
  name: PropTypes.string.isRequired,
  discipline: PropTypes.string.isRequired,
  players: PropTypes.number.isRequired,
  matchLeft: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
};

export default TournamentCard;
