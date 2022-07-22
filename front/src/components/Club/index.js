import clublogo from 'src/assets/logo-bayard-bad-blanc.png';

function Club() {
  return (
    <main className="content club">

      <div className="title">
        <h1>Profil du club</h1>
        <span className="members-nb">92 membres</span>
      </div>

      <div className="club-profil">
        <div className="club-profil-infos">
          <h2 className="club-name">Bayard Bad</h2>
          <ul className="club-infos">
            <li className="club-info">
              <button type="button" className="list-item-btn">
                <i className="fa fa-pencil" aria-hidden="true" />
              </button>
              Adresse: 175 avenue de Paris 35000 Rennes
            </li>
            <li className="club-info">
              <button type="button" className="list-item-btn">
                <i className="fa fa-pencil" aria-hidden="true" />
              </button>
              Email: bayardclub@free.fr
            </li>
            <li className="club-info">
              <button type="button" className="list-item-btn">
                <i className="fa fa-pencil" aria-hidden="true" />
              </button>
              Tél: 01 23 45 67 89
            </li>
            <li className="club-info">
              <button type="button" className="list-item-btn">
                <i className="fa fa-pencil" aria-hidden="true" />
              </button>
              Site web: www.bayardclub.com
            </li>
          </ul>
        </div>
        <div className="club-profil-image">
        <img src={clublogo} className="club-logo" alt="Logo Tournament" />
        </div>
      </div>
      <div className="club-description">
        <button type="button" className="list-item-btn">
          <i className="fa fa-pencil" aria-hidden="true" />
        </button>
        Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec,
        ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa,
        varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy
        molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.
        Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim.
        Pellentesque congue. Ut in risus volutpat libero pharetra tempor.
        Cras vestibulum bibendum augue. Praesent egestas leo in pede.
      </div>
    </main>
  );
}

export default Club;

// eslint-disable-next-line no-lone-blocks
{ /* quand je clique ici, j'active ou désactive le mode d'édition

  <button
    className="list-item__iconbtn"
    type="button"
    onClick={() => onEditToggle(task.id)}
  >
    ✍️
  </button>;

*/ }
