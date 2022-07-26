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
  return (
    <main className="content add-members-form">
      <h1 className="title">Ajouter des membres</h1>

      <form className="mass-add">
        <h2>Ajout en masse</h2>
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
        <input type="button" value="Envoyer le fichier" className="" />
      </form>

      <form className="single-add">

        <div className="input-line">
          <label htmlFor="firstname">Prénom : </label>
          <input type="text" name="firstname" id="firstname" onChange={(evt) => changeField(evt.target.value, 'addMemberfirstname')} />
        </div>

        <div className="input-line">
          <label htmlFor="lastname">Nom : </label>
          <input type="text" name="lastname" id="lastname" onChange={(evt) => changeField(evt.target.value, 'addMemberlastname')} />
        </div>

        <div className="input-line">
          <label htmlFor="birthdate">Date de naissance : </label>
          <input type="text" name="birthdate" id="birthdate" onChange={(evt) => changeField(evt.target.value, 'addMemberbirthdate')} />
        </div>

        <div className="input-line">
          <label htmlFor="gender">Genre : </label>
          <select id="gender" onChange={(evt) => changeField(evt.target.value, 'addMembergenderId')}>
            <option value="1">Homme</option>
            <option value="2">Femme</option>
          </select>
        </div>
      </form>
    </main>
  );
}

export default AddMembersForm;
