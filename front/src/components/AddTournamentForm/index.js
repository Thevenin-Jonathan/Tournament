/* eslint-disable jsx-a11y/label-has-associated-control */
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useRef, useState } from 'react';

const today = () => {
  const date = new Date();
  return date.toISOString().slice(0, 10);
  // wanted : 2022-07-29
};

function AddTournamentForm() {
  const dispatch = useDispatch();
  const tournament = useSelector((state) => (state.tournament));
  const redirectTo = useSelector((state) => (state.interface.redirectTo));

  if (redirectTo) {
    dispatch({ type: 'REDIRECT', value: null });
    return <Navigate to={redirectTo} />;
  }

  const changeField = (value, input) => {
    dispatch({
      type: 'CHANGE_FIELD_TOURNAMENT',
      input,
      value,
    });
  };

  const changePicture = (evt, value, input) => {
    dispatch({
      type: 'CHANGE_FIELD_TOURNAMENT',
      input,
      value,
    });
    dispatch({
      type: 'CHANGE_FIELD_TOURNAMENT',
      input: 'tournamentPicturePreview',
      value: URL.createObjectURL(evt.target.files[0]),
    });
  };

  const handleNewTournamentSubmit = (evt) => {
    evt.preventDefault();
    dispatch({
      type: 'CREATE_TOURNAMENT',
    });
  };

  // cloudinary
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const fileSelect = useRef(null);

  function uploadFile(file) {
    const url = `https://api.cloudinary.com/v1_1/dy21tmaam/upload`;
    const xhr = new XMLHttpRequest();
    const fd = new FormData();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    // Update progress (can be used to show progress indicator)
    xhr.upload.addEventListener('progress', (e) => {
      setProgress(Math.round((e.loaded * 100.0) / e.total));
      console.log(Math.round((e.loaded * 100.0) / e.total));
    });

    xhr.onreadystatechange = (e) => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        const response = JSON.parse(xhr.responseText);

        setImage(response.secure_url);
        console.log(response.secure_url);
        dispatch({
          type: 'CHANGE_FIELD_TOURNAMENT',
          input: 'tournamentPictureUrl',
          value: response.secure_url,
        });
        dispatch({
          type: 'CHANGE_FIELD_TOURNAMENT',
          input: 'tournamentPicturePreview',
          value: response.secure_url,
        });
      }
    };

    fd.append(
      'upload_preset',
      'tournament',
    );
    fd.append('tags', 'browser_upload');
    fd.append('file', file);
    xhr.send(fd);
  }

  function handleFiles(files) {
    for (let i = 0; i < files.length; i++) {
      console.log(files[i]);
      uploadFile(files[i]);
    }
  }

  return (
    <main className="content add-tournament-form">
      <h1 className="title">Organiser un nouveau tournoi</h1>

      <h2>Etape 1/4 </h2>
      <form className="single-add" onSubmit={handleNewTournamentSubmit}>

        <h3>Parametres du tournoi</h3>

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
                min={today()}
              />
            </div>

            <div className="input-line">
              <label htmlFor="tournamentPictureUrl">Illustration du tournoi </label>
              <input
                ref={fileSelect}
                type="file"
                accept="image/*"
                onChange={(e) => handleFiles(e.target.files)}
              />
            </div>

          </div> {/* col */}

          <div className="col img-preview">
            { tournament.tournamentPicturePreview
              && <img src={tournament.tournamentPicturePreview} alt="Illustration du tournoi" />}
          </div> {/* /col */}

        </div>{/* /row */}

        <div className="input-line">
          <label htmlFor="tournamentDescription">Description</label>
          <textarea
            name="tournamentDescription"
            id="tournamentDescription"
            value={tournament.tournamentDescription}
            onChange={(evt) => changeField(evt.target.value, evt.target.name)}
          />
        </div>

        <div className="row">
          <div className="col">
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
          </div> {/* /col */}

          <div className="col">
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
          </div> {/* col */}

          <div className="col">
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
          </div> {/* /col */}

          <div className="col">
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
          </div> {/* /col */}
        </div>{/* /row */}

        <div className="row">
          <div className="col align-right">
            <div
              className="input-line checkbox-line"
              title="Cochez cette case pour que tous les adhérent soient notifiés par email de l'ouverture d'un nouveau tournoi"
            >
              <input
                type="checkbox"
                name="tournamentNotification"
                id="tournamentNotification"
                onChange={(evt) => changeField(evt.target.checked, evt.target.name)}
                checked={tournament.tournamentNotification}
              />
              <label htmlFor="tournamentNotification">Notifier les adhérents </label>
              <i
                className="fa fa-question-circle"
                aria-hidden="true"
              />
            </div>

            <div className="input-line">
              <button type="submit" className="action-btn ">
                <i className="fa fa-plus" aria-hidden="true" /> Créer ce tournoi
              </button>
            </div>
          </div>{/* /col */}
        </div>{/* /row */}

      </form>
    </main>
  );
}

export default AddTournamentForm;
