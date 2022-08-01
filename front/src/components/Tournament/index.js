import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  tournamentStateText, disciplineText, longDateFr,
} from 'src/utils';

import Loader from '../Loader';

function Tournament() {
  // je récupère le slug dans l'url
  const id = useParams();

  // Je récupère le state dans le reducer 'tournament'
  const tournament = useSelector((state) => (state.tournament.tournament));
  const teams = useSelector((state) => (state.tournament.teams));
  const alreadyRegistred = useSelector((state) => (state.tournament.alreadyRegistred));
  const userId = useSelector((state) => (state.user.id));
  const members = useSelector((state) => (state.user.members));
  const isLoading = useSelector((state) => (state.interface.isLoading));

  const dispatch = useDispatch();
  // au chargement
  useEffect(() => {
    // récupère le tournoi correspondant au slug/id
    dispatch({
      type: 'GET_MEMBERS',
      value: id,
    });
    dispatch({
      type: 'GET_TOURNAMENT',
      value: id,
    });
    dispatch({
      type: 'GET_TEAMS',
      value: id,
    });
    dispatch({ type: 'IM_NOT_ON_THIS_TOURNAMENT' });
  }, []);

  // action de souscrprton
  const handleSubscribe = () => {
    dispatch({
      type: 'SINGLE_TOURNAMENT_SUBSCRIBE',
    });
  };

  const findInMembers = (playerId) => {
    const { firstname } = members.find((member) => member.id === playerId);
    const { lastname } = members.find((member) => member.id === playerId);
    return `${firstname} ${lastname}`;
  };

  const findMyTeam = () => {
    const teamFinded = tournament.teams
      .find((team) => team.users
        .find((user) => user.id === userId));

    if (teamFinded) {
      dispatch({ type: 'IM_ON_THIS_TOURNAMENT' });
      return teamFinded.id;
    }
    return false;
  };

  // const findTeamMembers = (teamId) => {
  //   const { firstname } = members.find((member) => member.id === playerId);
  //   const { lastname } = members.find((member) => member.id === playerId);
  //   return `${firstname} ${lastname}`;
  // };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <main className="content tournament">
      <div className="bg-layer" style={{ backgroundImage: `url(${tournament.picture_url})` }} />
      <div className="gradient-layer" />
      <div className="content-layer">
        <h1 className="title">{tournament.title}</h1>
        <p className="tournament-description">{ tournament.description }</p>

        <div className="flex-wrapper">
          <div className="infos">
            <h2>Informations</h2>
            <p className="tournament-status">Tournoi { tournamentStateText(tournament.state_id) }</p>
            <p className="tournament-discipline">{ disciplineText(tournament.discipline_id) }</p>
            <p className="tournament-date">{ longDateFr(tournament.date) }</p>
            <p className="tournament-players-count">{ tournament.nb_playground } Terrains disponibles</p>
            <p className="tournament-match">{tournament.player_limit && `Nombres de places : ${tournament.player_limit}`}</p>
            <p className="tournament-registers">{`Joueurs inscrits : ${tournament.nb_registered}`}</p>
          </div>

          <div className="infos registred-users">
            <h2>Participants</h2>
            <ul>
              { tournament.registered.map((player) => (
                <li key={`player-${player.id}`}>
                  <Link
                    to={`/membres/${player.id}`}
                  >
                    { findInMembers(player.id) }
                    { findMyTeam() }
                  </Link>
                </li>
              ))}
            </ul>

          </div>

          {/* <div className="infos registred-teams">
            <h2>Equipes</h2>
            <ul>
              { teams.map((team) => (
                <li
                  key={`team-${team.id}`}
                >
                  {team.id}
                </li>
              ))}
            </ul>

          </div> */}
        </div>

        <div>
          { !alreadyRegistred && (
            <button
              onClick={() => handleSubscribe()}
              type="button"
              className="action-btn"
            >
              Je m'inscris
            </button>
          )}
          { alreadyRegistred && (
            <button
              onClick={() => handleUnSubscribe()}
              type="button"
              className="action-btn"
            >
              Je me désinscris
            </button>
          )}

          {/* { tournament.state_id === 1 ? (
            <button
              onClick={() => handleSubscribe()}
              type="button"
              className="action-btn"
            >
              Je m'inscris
            </button>
          )
            : null} */}

        </div>

      </div>

    </main>
  );
}

export default Tournament;
