import { Link } from 'react-router-dom';

function Members() {
  return (
    <main className="content members">
      <h1 className="title">Membres du club</h1>
      <span>92 membres</span>

      <div className="group-1">
        <input className="members-search" type="search" value="" placeholder=" Rechercher un membre" />

        {/* Lien pour ajouter un membre, page ? */}
        <Link className="action-btn" to="/add-members">+ Ajouter un membre</Link>
      </div>

      <ol className="members-list">
        <li className="members-list-item">
          <span className="members-name">Allibe Philippe</span>
          <span className="members-gender">homme</span>
          <span className="members-email">fifi@gmail.com</span>
          <span className="members-phone">06 77 56 98 23</span>
          <button type="button" className="list-item-btn">
            <i className="fa fa-pencil" aria-hidden="true" />
          </button>
        </li>
        <li className="members-list-item">
          <span className="members-name">Allibe Philippe</span>
          <span className="members-gender">homme</span>
          <span className="members-email">fifi@gmail.com</span>
          <span className="members-phone">06 77 56 98 23</span>
          <button type="button" className="list-item-btn">
            <i className="fa fa-pencil" aria-hidden="true" />
          </button>
        </li>
        <li className="members-list-item">
          <span className="members-name">Allibe Philippe</span>
          <span className="members-gender">homme</span>
          <span className="members-email">fifi@gmail.com</span>
          <span className="members-phone">06 77 56 98 23</span>
          <button type="button" className="list-item-btn">
            <i className="fa fa-pencil" aria-hidden="true" />
          </button>
        </li>
        <li className="members-list-item">
          <span className="members-name">Buguey Léa</span>
          <span className="members-gender">femme</span>
          <span className="members-email">leab@gmail.com</span>
          <span className="members-phone">06 77 59 08 24</span>
          <button type="button" className="list-item-btn">
            <i className="fa fa-pencil" aria-hidden="true" />
          </button>
        </li>
        <li className="members-list-item">
          <span className="members-name">Buguey Léa</span>
          <span className="members-gender">femme</span>
          <span className="members-email">leab@gmail.com</span>
          <span className="members-phone">06 77 59 08 24</span>
          <button type="button" className="list-item-btn">
            <i className="fa fa-pencil" aria-hidden="true" />
          </button>
        </li>
        <li className="members-list-item">
          <span className="members-name">Buguey Léa</span>
          <span className="members-gender">femme</span>
          <span className="members-email">leab@gmail.com</span>
          <span className="members-phone">06 77 59 08 24</span>
          <button type="button" className="list-item-btn">
            <i className="fa fa-pencil" aria-hidden="true" />
          </button>
        </li>
      </ol>
    </main>
  );
}

export default Members;
