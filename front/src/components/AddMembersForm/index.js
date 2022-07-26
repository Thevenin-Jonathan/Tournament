import { useDispatch } from 'react-redux';

function AddMembersForm() {
  const dispatch = useDispatch();

  const changeField = (value, input) => {
    dispatch({
      type: 'CHANGE_FIELD',
      input,
      value,
    });
  };

  const handleNewUserSubmit = (evt) => {
    evt.preventDefault();
    dispatch({
      type: 'CREATE_MEMBER',
    });
  };

  return (
    <main className="content add-members-form">
      <h1 className="title">Ajouter des membres</h1>

      <form className="mass-add">
        <h2>Ajout en masse</h2>
        <div className="input-line">
          <input type="file" className="input-file" />
          <i
            className="fa fa-question-circle"
            aria-hidden="true"
            title="le fichier CSV doit contenir
            les entêtes suivantes :
            - nom
            - prenom
            - email
            - telephone
            - genre
            - license"
          />
          <button type="button" className="action-btn">
            <i className="fa fa-cloud-upload" aria-hidden="true" /> Envoyer le fichier
          </button>
        </div>
      </form>

      <form className="single-add" onSubmit={handleNewUserSubmit}>

        <h2>Ajout d'un nouveau membre</h2>

        <div className="row">

          <div className="col">
            <div className="input-line">
              <label htmlFor="firstname">Prénom</label>
              <input type="text" name="firstname" id="firstname" onChange={(evt) => changeField(evt.target.value, 'addMemberfirstname')} />
            </div>

            <div className="input-line">
              <label htmlFor="lastname">Nom</label>
              <input type="text" name="lastname" id="lastname" onChange={(evt) => changeField(evt.target.value, 'addMemberlastname')} />
            </div>

            <div className="input-line">
              <label htmlFor="gender">Genre</label>
              <select id="gender" onChange={(evt) => changeField(evt.target.value, 'addMembergenderId')}>
                <option value="1">Homme</option>
                <option value="2">Femme</option>
              </select>
            </div>

            <div className="input-line">
              <label htmlFor="birthdate">Date de naissance</label>
              <input type="date" name="birthdate" id="birthdate" onChange={(evt) => changeField(evt.target.value, 'addMemberbirthdate')} />
            </div>
          </div>

          <div className="col">
            <div className="input-line">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" onChange={(evt) => changeField(evt.target.value, 'addMemberemail')} />
            </div>

            <div className="input-line">
              <label htmlFor="address">Adresse</label>
              <textarea name="address" id="address" onChange={(evt) => changeField(evt.target.value, 'addMemberaddress')} />
            </div>

          </div>

          <div className="col">
            <div className="input-line">
              <label htmlFor="phone">Téléphone</label>
              <input type="text" name="phone" id="phone" onChange={(evt) => changeField(evt.target.value, 'addMemberphone')} />
            </div>

            <div className="input-line">
              <label htmlFor="license">Licence</label>
              <input type="text" name="license" id="license" onChange={(evt) => changeField(evt.target.value, 'addMemberplayerLicense')} />
            </div>

          </div>
        </div>

        <div className="input-line">
          <button type="submit" className="action-btn pull-right">
            <i className="fa fa-user-plus" aria-hidden="true" /> Ajouter ce membre
          </button>
        </div>
      </form>
    </main>
  );
}

export default AddMembersForm;
