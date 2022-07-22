function Profil() {
  return (
    <main className="content profil">
      <div className="title">
        <h1>Mon profil</h1>
      </div>

      <div className="profil-content">
        <div className="profil-infos">
          <img className="profil-image" src="" alt="profil" />
          <ul className="profil-details">
            <li>
              <button type="button" className="list-item-btn">
                <i className="fa fa-pencil" aria-hidden="true" />
              </button>
              John Kennedy
            </li>
            <li>
              <button type="button" className="list-item-btn">
                <i className="fa fa-pencil" aria-hidden="true" />
              </button>
              1234567
            </li>
            <li>
              <button type="button" className="list-item-btn">
                <i className="fa fa-pencil" aria-hidden="true" />
              </button>
              Hommme
            </li>
            <li>
              <button type="button" className="list-item-btn">
                <i className="fa fa-pencil" aria-hidden="true" />
              </button>
              12/06/1996
            </li>
            <li>
              <button type="button" className="list-item-btn">
                <i className="fa fa-pencil" aria-hidden="true" />
              </button>
              165 rue des fleurs
            </li>
            <li>
              <button type="button" className="list-item-btn">
                <i className="fa fa-pencil" aria-hidden="true" />
              </button>
              38880 Pontcharra
            </li>
            <li>
              <button type="button" className="list-item-btn">
                <i className="fa fa-pencil" aria-hidden="true" />
              </button>
              j.kennedy@gmail.com
            </li>
            <li>
              <button type="button" className="list-item-btn">
                <i className="fa fa-pencil" aria-hidden="true" />
              </button>
              01 23 45 67 89
            </li>
          </ul>
        </div>
        <ul className="profil-stats">
          <li>Mes statistiques</li>
          <li>Participations totales: 3</li>
          <li>Matchs joués: 24</li>
          <li>Victoires en simple: 1</li>
          <li>Victoires en double: 0</li>
          <li>Victoires en mixte: 2</li>
        </ul>
      </div>
    </main>
  );
}

export default Profil;
