import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  tournamentStateText, disciplineText, disciplineShortText, longDateFr,
} from 'src/utils';

import Loader from '../Loader';

function Tournament() {
  // je récupère le slug dans l'url
  const id = useParams();

  // Je récupère le state dans le reducer 'tournament'
  const tournament = useSelector((state) => (state.tournament.tournament));
  const teams = useSelector((state) => (state.tournament.teams));
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
  }, []);

  function findInMembers(playerId) {
    const { firstname } = members.find((member) => member.id === playerId);
    const { lastname } = members.find((member) => member.id === playerId);
    return `${firstname} ${lastname}`;
  }

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
                <li>
                  <Link
                    to={`/membres/${player.id}`}
                    key={player.id}
                  >
                    { findInMembers(player.id) }
                  </Link>
                </li>
              ))}
            </ul>

          </div>

          <div className="infos registred-teams">
            <h2>Equipes</h2>
            { teams.map((team) => (
              <li key={team.id}> {team.id} </li>
            ))}

          </div>

        </div>

      </div>

    </main>
  );
}

export default Tournament;
