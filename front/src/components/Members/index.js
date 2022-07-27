import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { genderText } from 'src/utils';

function Members() {
  const dispatch = useDispatch();
  const user = useSelector((state) => (state.user));
  const ui = useSelector((state) => (state.interface));

  useEffect(() => {
    dispatch({
      type: 'GET_MEMBERS',
    });
  }, []);

  if (!ui.isLoading) {
    // console.log(user.members);
  }

  return (
    <main className="content members">
      <h1 className="title">Membres du club</h1>
      <span>92 membres</span>

      <div className="group-1">
        <input className="members-search" type="search" value="" placeholder=" Rechercher un membre" />

        <Link className="action-btn" to="/membres/ajouter-membres">+ Ajouter un membre</Link>
      </div>

      <ol className="members-list">
        {user.members.map((member) => (
          <li
            key={member.id}
            className="members-list-item"
          >
            <span className="members-name">
              <Link to={`/membres/${member.id}`}>{member.firstname} {member.lastname}</Link>
            </span>
            <span className="members-gender">{genderText(member.gender_id)}</span>
            <span className="members-email">{member.email}</span>
            <span className="members-phone">{member.phone}</span>
            <button type="button" className="list-item-btn">
              <i className="fa fa-pencil" aria-hidden="true" />
            </button>

          </li>
        ))}
      </ol>
    </main>
  );
}

export default Members;
