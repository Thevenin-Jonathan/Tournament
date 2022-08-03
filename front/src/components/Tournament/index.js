/* eslint-disable jsx-a11y/control-has-associated-label */
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ReactSortable } from 'react-sortablejs';
import {
  tournamentStateText,
  disciplineText,
  longDateFr,
  AmIAlreadyRegisteredForThisTournament,
  canISubscribeToThisTournament,
  findMemberInAList,
  findUserTeam,
  genderText,
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


  function compatiblesMembers(members, tournament) {
    let filteredMembers = members;
    // seulement hommes
   
    if([1, 3].includes(tournament.discipline_id)) {
      filteredMembers = members.filter((member) => member.gender_id === 1);

    }
    // seulement femmes
    if([2, 4].includes(tournament.discipline_id)) {
      filteredMembers = members.filter((member) => member.gender_id === 2);
    }
    console.log(filteredMembers);
    return filteredMembers;
  }; 

  function enroledMembers(members, enroledMembers) {
    const enroledMembersIds = Array.from((enroledMembers), obj => obj.id);
    const filteredMembers = members.filter((member) => (
      enroledMembersIds.includes(member.id)
    ));
    return filteredMembers;
  };

  function availableMembers(members, enroledMembers) {
    const enroledMembersIds = Array.from((enroledMembers), obj => obj.id);
    const filteredMembers = members.filter((member) => (
      !enroledMembersIds.includes(member.id)
    ));
    return filteredMembers;
  };

  
  const filteredPlayers = (players, string) => {
    return players.filter((member) => (
      member.firstname.toLowerCase().includes(string.toLowerCase())
      || member.lastname.toLowerCase().includes(string.toLowerCase())
    ));
  };

  // modal
  const [showPlayerModal, setShowPlayerModal] = useState(false);

  // sortable system
  const [availablePlayers, setAvailablePlayers] = useState([]);
  const [enroledPlayers, setEnroledPlayers] = useState([]);
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    setAvailablePlayers(members);
  }, [members]);

  useEffect(() => {
    setEnroledPlayers(tournament.registered);
  }, [tournament]);

  const sortableOptions = {
    animation: 150,
    fallbackOnBody: true,
    swapThreshold: 0.65,
    ghostClass: 'ghost',
    group: 'shared',
    //onStart: (evt) => {console.log(evt.oldIndex)},
    onEnd: (evt) => {
      const playerId = evt.item.dataset.id;
      const fromId = evt.from.id;
      const dropId = evt.to.id;
      
      // si on drop dans la enroled zone --> on inscrit
      if(dropId === "enroled-players" && fromId === "available-players") {
        dispatch({
            type: 'SINGLE_TOURNAMENT_SUBSCRIBE',
            value: playerId,
        });        
      }
      // si on drop dans la aivalible zone --> on désinscrit
      // mais faut d'abord trouver sa team
      if(dropId === "available-players" && fromId === "enroled-players") {
        dispatch({
            type: 'SINGLE_TOURNAMENT_UNSUBSCRIBE',
            value: playerId,
        });        
      }
    },
  };


  // action de souscription
  const handleSubscribe = () => {
    dispatch({
      type: 'SINGLE_TOURNAMENT_SUBSCRIBE',
      value: userId,
    });
  };
  // action de désinscription
  const handleUnSubscribe = () => {
    dispatch({
      type: 'SINGLE_TOURNAMENT_UNSUBSCRIBE',
      value: userId,
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
                {tournament.player_limit} Participants max
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
              // title={`supprimer l'équipe : ${findUserTeam(teams, user.id).id}`}
              onClick={() => handleUnSubscribe()}
              type="button"
              className="action-btn"
            >
              Je me désinscris
            </button>
            )}

            <ul>
              {/* { tournament.registered.map((player) => (
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
              ))} */}
              { enroledMembers(members, tournament.registered).map((player) => (
                <li key={`player-${player.id}`}>
                  <Link
                    to={`/membres/${player.id}`}
                  >
                    {player.firstname} &nbsp;
                    {player.lastname}
                    {/* <span className="debug">
                      (id : { player.id } |
                      Team : { findUserTeam(teams, player.id).id })
                    </span> */}
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
            <button type="button" className="action-btn" onClick={() => setShowPlayerModal(true)}>
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
        <div className={showPlayerModal ? "modal add-players open" : "modal add-players"}>
          <button type="button" className="close-button" onClick={() => setShowPlayerModal(false)}>
            <i className="fa fa-close" aria-hidden="true" />
          </button>
          <div className="modal-content">

            <h1 className="title">Ajouter des participants</h1>
            <p className="tournament-title"><i className="fa fa-trophy" aria-hidden="true" /> {tournament.title}</p>
            <div className="row">

              <div className="col available-players">
                <h2>Joueurs disponibles</h2>
                <input
                value={searchString}
                onChange={(evt) => setSearchString(evt.target.value)}
                type="search"
                placeholder="Rechercher un joueur" />
                <ReactSortable
                  list={availablePlayers}
                  setList={setAvailablePlayers}
                  {...sortableOptions}
                  id="available-players"
                  className="available-players-list dragable-zone"
                >
                  {availableMembers(filteredPlayers(members, searchString), tournament.registered).map((player) => (
                    <div
                      key={player.id}
                      className="player-list-item"
                    >
                      <span className="player-firstname">
                        {player.firstname}
                      </span>
                      <span className="player-lastname">
                        {player.lastname}
                      </span>
                      <span className="player-gender">
                        {genderText(player.gender_id)}
                      </span>
                    </div>
                  ))}
                </ReactSortable>
              </div>

              <div className="col enroled-team-players">
                <h2>Equipes/Joueurs enrolés</h2>
                <ReactSortable
                  list={enroledPlayers}
                  setList={setEnroledPlayers}
                  {...sortableOptions}
                  id="enroled-players"
                  className="enroled drop-zone dragable-zone"
                >
                  {enroledMembers(members, tournament.registered).map((player) => (
                    <div
                      key={player.id}
                      className="player-list-item"
                    >
                      <span className="player-firstname">
                        {player.firstname}
                      </span>
                      <span className="player-lastname">
                        {player.lastname}
                      </span>
                      <span className="player-gender">
                        {genderText(player.gender_id)}
                      </span>
                    </div>
                  ))}
                </ReactSortable>
                <button type="button" className="action-btn pull-right" onClick={() => setShowPlayerModal(false)}>
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
