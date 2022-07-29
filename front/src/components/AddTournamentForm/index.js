import { useDispatch, useSelector } from 'react-redux';

function AddTournamentForm() {
  const dispatch = useDispatch();
  const tournament = useSelector((state) => (state.tournament));

  const changeField = (value, input) => {
    dispatch({
      type: 'CHANGE_FIELD_TOURNAMENT',
      input,
      value,
    });
  };

  const handleNewUserSubmit = (evt) => {
    evt.preventDefault();
    dispatch({
      type: 'CREATE_TOURNAMENT',
    });
  };

  return (
    <main className="content add-tournament-form">
      <h1 className="title">Organiser un nouveau tournoi</h1>

      <h2>Etape 1/4 </h2>
      <form className="single-add" onSubmit={handleNewUserSubmit}>

        <div className="row">

          <div className="col">

            <div className="input-line">
              <label htmlFor="tournamanentName">Nom du tournoi *</label>
              <input
                required="required"
                type="text"
                name="tournamanentName"
                id="tournamanentName"
                value={tournament.tournamanentName}
                onChange={(evt) => changeField(evt.target.value, evt.target.name)}
              />
            </div>

            <div className="input-line">
              <label htmlFor="tournamanentDate">Date du tournoi *</label>
              <input
                required="required"
                type="date"
                name="tournamanentDate"
                id="tournamanentDate"
                value={tournament.tournamanentDate}
                onChange={(evt) => changeField(evt.target.value, evt.target.name)}
              />
            </div>

            <div className="input-line">
              <label htmlFor="tournamentPictureUrl">Illustration du tournoi </label>
              <input
                type="text"
                name="tournamentPictureUrl"
                id="tournamentPictureUrl"
                value={tournament.tournamentPictureUrl}
                onChange={(evt) => changeField(evt.target.value, evt.target.name)}
              />
            </div>

            <div className="input-line">
              <label htmlFor="tournamentDescription">Description</label>
              <textarea
                name="tournamentDescription"
                id="tournamentDescription"
                value={tournament.tournamentDescription}
                onChange={(evt) => changeField(evt.target.value, evt.target.name)}
              />
            </div>

            <div className="input-line">
              <label htmlFor="tournamentType">Type</label>
              <select
                required="required"
                id="tournamentType"
                name="tournamentType"
                onChange={(evt) => changeField(evt.target.value, evt.target.name)}
              >
                <option value="1">All vs All</option>
                <option value="2" disabled>Elimination directe</option>
                <option value="3" disabled>Phase de poule</option>
              </select>
            </div>

            <div className="input-line">
              <label htmlFor="tournamentDiscipline">Discipline</label>
              <select
                required="required"
                id="tournamentDiscipline"
                name="tournamentDiscipline"
                onChange={(evt) => changeField(evt.target.value, evt.target.name)}
              >
                <option value="1">Simple Homme</option>
                <option value="2">Simple Dame</option>
                <option value="3">Double Homme</option>
                <option value="4">Double Dame</option>
                <option value="5">Double Mixte</option>
              </select>
            </div>

            <div className="input-line">
              <label htmlFor="tournamentNbPlayground">Nombre de terrains</label>
              <input
                type="number"
                name="tournamentNbPlayground"
                id="tournamentNbPlayground"
                value={tournament.tournamentNbPlayground}
                onChange={(evt) => changeField(evt.target.value, evt.target.name)}
              />
            </div>

            <div className="input-line">
              <label htmlFor="tournamentPlayerLimit">Limite de joueurs</label>
              <input
                type="number"
                name="tournamentPlayerLimit"
                id="tournamentPlayerLimit"
                value={tournament.tournamentPlayerLimit}
                onChange={(evt) => changeField(evt.target.value, evt.target.name)}
              />
            </div>

            <div className="input-line">
              <input
                type="checkbox"
                name="tournamentNotification"
                id="tournamentNotification"
                onChange={(evt) => changeField(evt.target.checked, evt.target.name)}
                checked={tournament.tournamentNotification}
              />
              <label htmlFor="tournamentNotification">Notifier les adhérents</label>
            </div>

            <div className="input-line">
              <button type="submit" className="action-btn pull-right">
                <i className="fa fa-plus" aria-hidden="true" /> Créer ce tournoi
              </button>
            </div>

          </div> {/* fin de col */}

        </div>

      </form>
    </main>
  );
}

export default AddTournamentForm;
