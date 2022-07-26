import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function Members() {
  const dispatch = useDispatch();
  const user = useSelector((state) => (state.user));

  useEffect(() => {
    dispatch({
      type: 'GET_MEMBERS',
      value: user.id,
    });
  }, []);

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
          <span className="members-name">{user.firstname} {user.lastname}</span>
          <span className="members-gender">homme</span>
          <span className="members-email">fifi@gmail.com</span>
          <span className="members-phone">06 77 56 98 23</span>
          <button type="button" className="list-item-btn">
            <i className="fa fa-pencil" aria-hidden="true" />
          </button>
        </li>
      </ol>
    </main>
  );
}

export default Members;
