import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { tournamentStateText, disciplineText, disciplineShortText } from 'src/utils';

function TournamentCard({
  state, name, discipline, players, matchLeft, slug, cover,
}) {
  return (
    <Link
      to={`/tournois/${slug}`}
      className={`tournament-card state-${state} ${disciplineShortText(discipline)}`}
    >
      <div className="tournament-special" />
      <div className="tournament-background" style={{ backgroundImage: `url(${cover})` }} />
      <div className="tournament-layer" />
      <div className="tournament-text">
        <i className="fa fa-trophy fa-2x tournament-icon widget-icon" />
        <div className="tournament-info">
          <p className="tournament-status">{ tournamentStateText(state) }</p>
          <p className="tournament-name">{ name }</p>
          <p className="tournament-discipline">{ disciplineText(discipline) }</p>
          <p className="tournament-players-count">{ players } Participants</p>
          <p className="tournament-match">{ matchLeft } matchs à jouer</p>
        </div>
      </div>
    </Link>
  );
}

TournamentCard.propTypes = {
  state: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  discipline: PropTypes.string.isRequired,
  players: PropTypes.number.isRequired,
  matchLeft: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
};

export default TournamentCard;
