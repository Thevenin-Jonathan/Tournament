/* eslint-disable jsx-a11y/control-has-associated-label */
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

  const isAdmin = useSelector((state) => (state.user.isAdmin));
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
            <p className="tournament-date">
              <i className="fa fa-calendar-o fa-fw" aria-hidden="true" />
              { longDateFr(tournament.date) }
            </p>
            <p className="tournament-status">
              <i className="fa fa-list fa-fw" aria-hidden="true" />
              Tournoi { tournamentStateText(tournament.state_id) }
            </p>
            <p className="tournament-discipline">
              <i className="fa fa-tags fa-fw" aria-hidden="true" />
              { disciplineText(tournament.discipline_id) }
            </p>
            {tournament.player_limit && (
              <p className="tournament-player-count">
                <i className="fa fa-users fa-fw" aria-hidden="true" />
                {tournament.player_limit}
              </p>
            )}
            <p className="tournament-playground-count">
              <i className="fa fa-map-o fa-fw" aria-hidden="true" />
              { tournament.nb_playground } Terrains
            </p>
            <p className="tournament-registers">
              <i className="fa fa-users fa-fw" aria-hidden="true" />
              {`${tournament.nb_registered} inscrits `}
            </p>
          </div>

          <div className="infos registred-users">
            <h2>Participants</h2>

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

        {/* Partie admin */}
        {isAdmin && (
        <div className="admin-zone">
          <h2>Gestion du tournoi</h2>

          {tournament.state_id === 1 && (
            <button type="button" to="" className="action-btn ">
              <i className="fa fa-users" /> Ajouter des participants
            </button>
          )}
          {tournament.state_id === 1 && (
          <button type="button" to="" className="action-btn ">
            Aller à l'étape 2 : générer les phases <i className="fa fa-arrow-right" />
          </button>
          )}
          {tournament.state_id === 2 && (
          <button type="button" to="" className="action-btn ">
            Aller à l'étape 3 : jouer ! <i className="fa fa-arrow-right" />
          </button>
          )}
          {tournament.state_id === 3 && (
          <button type="button" to="" className="action-btn ">
            Aller à l'étape 4 : Cloturer ce tournoi <i className="fa fa-hand-peace-o" />
          </button>
          )}

        </div>
        )}
      </div>

      {isAdmin && tournament.state_id === 1 && (
        <div className="modal add-players">
          <button type="button" className="close-button"><i className="fa fa-close" aria-hidden="true" /></button>
          <div className="modal-content">

            <h1 className="title">Ajouter des participants</h1>
            <p className="tournament-title"><i className="fa fa-trophy" aria-hidden="true" /> {tournament.title}</p>
            <div className="row">

              <div className="col available-players">
                <h2>Joueurs disponibles</h2>
                <input type="search" placeholder="Rechercher un joueur" />
                <ul>
                  <li>Allibe Philippe</li>
                  <li>Tom Roche</li>
                  <li>Cédric Bernard</li>
                  <li>Marie Rodriguez</li>
                </ul>
              </div>

              <div className="col enroled-team-players">
                <h2>Equipes/Joueurs enrolés</h2>
                <div className="enroled drop-zone">
                  
                </div>
                <button type="button" to="" className="action-btn ">
                  Confirmer <i className="fa fa-arrow-right" />
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </main>
  );
}

export default Tournament;
