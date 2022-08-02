import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  tournamentStateText,
  disciplineText,
  longDateFr,
  AmIAlreadyRegisteredForThisTournament,
  canISubscribeToThisTournament,
  findMemberInAList,
  findUserTeam,
} from 'src/utils';

import Loader from '../Loader';

function Tournament() {
  // je récupère le slug dans l'url
  const slug = useParams();

  // Je récupère le state dans le reducer 'tournament'
  const tournament = useSelector((state) => (state.tournament.tournament));
  const teams = useSelector((state) => (state.tournament.tournament.teams));
  const user = useSelector((state) => (state.user.loggedUser));
  const userId = useSelector((state) => (state.user.id));
  const members = useSelector((state) => (state.user.members));
  const isLoading = useSelector((state) => (state.interface.isLoading));
  const alreadyRegistered = AmIAlreadyRegisteredForThisTournament(tournament.registered, userId);
  const canISubscribe = canISubscribeToThisTournament(tournament, user);

  const dispatch = useDispatch();
  // au chargement on fetch le tournoi par son slug
  // et on fetch les membres pour mapper sur les id d'user
  useEffect(() => {
    dispatch({
      type: 'GET_TOURNAMENT',
      value: slug,
    });
    dispatch({ type: 'GET_MEMBERS' });
  }, []);
  // action de souscription
  const handleSubscribe = () => {
    dispatch({
      type: 'SINGLE_TOURNAMENT_SUBSCRIBE',
      value: userId,
    });
  };
  // action de désinscription
  const handleUnSubscribe = (teamId) => {
    dispatch({
      type: 'SINGLE_TOURNAMENT_UNSUBSCRIBE',
      value: teamId,
    });
  };

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
            <p className="tournament-date">{ longDateFr(tournament.date) }</p>
            <p className="tournament-status">Tournoi { tournamentStateText(tournament.state_id) }</p>
            <p className="tournament-discipline">{ disciplineText(tournament.discipline_id) }</p>
            <p className="tournament-match">{tournament.player_limit && `Nombres de places : ${tournament.player_limit}`}</p>
            <p className="tournament-players-count">{ tournament.nb_playground } Terrains</p>
            <p className="tournament-registers">{`${tournament.nb_registered} inscrits `}</p>
          </div>

          <div className="infos registred-users">
            <h2>Participants</h2>
            <ul>
              { tournament.registered.map((player) => (
                <li key={`player-${player.id}`}>
                  <Link
                    to={`/membres/${player.id}`}
                  >
                    { findMemberInAList(members, player.id).firstname }&nbsp;
                    { findMemberInAList(members, player.id).lastname }&nbsp;
                    <span className="debug">
                      (id : { player.id } |
                      Team : { findUserTeam(teams, player.id).id })
                    </span>
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
          { canISubscribe && !alreadyRegistered && (
            <button
              onClick={() => handleSubscribe()}
              type="button"
              className="action-btn"
            >
              Je m'inscris
            </button>
          )}
          { canISubscribe && alreadyRegistered && (
            <button
              title={`supprimer l'équipe : ${findUserTeam(teams, user.id).id}`}
              onClick={() => handleUnSubscribe(findUserTeam(teams, user.id).id)}
              type="button"
              className="action-btn"
            >
              Je me désinscris
            </button>
          )}

        </div>

      </div>

    </main>
  );
}

export default Tournament;
