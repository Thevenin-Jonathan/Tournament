import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  tournamentStateText, disciplineText, disciplineShortText, dateFr,
} from 'src/utils';

function TournamentCard({ tournament }) {
  return (
    <Link
      to={`/tournois/${tournament.id}`}
      className={`tournament-card state-${tournament.state_id} ${disciplineShortText(tournament.discipline_id)}`}
    >
      <div className="tournament-special" />
      <div className="tournament-background" style={{ backgroundImage: `url(${tournament.picture_url})` }} />
      <div className="tournament-layer" />
      <div className={`tournament-text ${disciplineShortText(tournament.discipline_id)}`}>
        <i className="fa fa-trophy fa-2x tournament-icon widget-icon" />
        <div className="tournament-info">
          <p className="tournament-status">{ tournamentStateText(tournament.state_id) }</p>
          <p className="tournament-name">{ tournament.title }</p>
          <p className="tournament-discipline">{ disciplineText(tournament.discipline_id) }</p>
          <p className="tournament-date">{ dateFr(tournament.date) }</p>
          <p className="tournament-players-count">{ tournament.nb_playground } Terrains</p>
          <p className="tournament-match">{tournament.player_limit && `Nombres de place : ${tournament.player_limit}`}</p>
        </div>
      </div>
      <div className="tournament-hover">
        <span>
          {(tournament.state_id === 1) && 'Détails et inscriptions ' }
          {(tournament.state_id !== 1) && 'Détails ' }
        </span>
        <i className="fa fa-arrow-right" aria-hidden="true" />
      </div>
    </Link>
  );
}

TournamentCard.propTypes = {
  tournament: PropTypes.object.isRequired,
  // date: PropTypes.string.isRequired,
  // state: PropTypes.string.isRequired,
  // name: PropTypes.string.isRequired,
  // discipline: PropTypes.string.isRequired,
  // players: PropTypes.number.isRequired,
  // matchLeft: PropTypes.number.isRequired,
  // slug: PropTypes.string.isRequired,
  // cover: PropTypes.string.isRequired,
};

export default TournamentCard;
