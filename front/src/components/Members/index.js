import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { genderText } from 'src/utils';

function Members() {
  const dispatch = useDispatch();
  const user = useSelector((state) => (state.user));
  const ui = useSelector((state) => (state.interface));
  const isAdmin = useSelector((state) => (state.user.isAdmin));

  useEffect(() => {
    dispatch({
      type: 'GET_MEMBERS',
    });
  }, []);

  // supprime le résultat de la recherche searchMember
  useEffect(() => {
    user.searchMember = '';
  }, [user.searchMember]);

  if (!ui.isLoading) {
    // console.log(user.members);
  }

  const changeField = (value, input) => {
    dispatch({
      type: 'CHANGE_FIELD',
      input,
      value,
    });
  };

  // member search filter
  // eslint-disable-next-line arrow-body-style
  const filteredMembers = () => {
    return user.members.filter((member) => (
      member.firstname.toLowerCase().includes(user.searchMember.toLowerCase())
      || member.lastname.toLowerCase().includes(user.searchMember.toLowerCase())
    ));
  };

  // members list sorted by lastname
  // /!\ localeCompare() only works with strings
  const sortedfilteredMembers = filteredMembers().sort(
    (a, b) => a.lastname.localeCompare(b.lastname),
  );

  // format phone numbers function
  // eslint-disable-next-line arrow-body-style
  const toFormatPhoneNumber = (phoneNumber) => {
    if (phoneNumber !== null) {
      return phoneNumber.replace(/(.{2})(?=.)/g, '$1 ');
    }
    return null;
  };

  return (
    <main className="content members">
      <h1 className="title">Membres du club</h1>
      <span>{user.members.length} membres</span>
      <div className="wrapper">
        <input
          className="members-search"
          type="text"
          onChange={(evt) => changeField(evt.target.value, 'searchMember')}
          placeholder="Rechercher un membre"
        />
        {isAdmin && (
        <Link className="action-btn" to="/membres/ajouter-membres">
          <i className="fa fa-plus" aria-hidden="true" /> Ajouter un membre
        </Link>
        )}
      </div>
      <ol className="members-list">
        {sortedfilteredMembers.map((member) => (
          <li key={member.id}>
            <Link className="members-list-item" to={`/membres/${member.id}`}>
              <span className="members-name">
                {member.firstname} {member.lastname}
              </span>
              <span className="members-gender">{genderText(member.gender_id)}</span>
              <span className="members-email">{member.email}</span>
              <span className="members-phone">{toFormatPhoneNumber(member.phone)}</span>
              <button type="button" className="list-item-btn">
                <i className="fa fa-pencil" aria-hidden="true" />
              </button>
            </Link>
          </li>
        ))}
      </ol>
    </main>
  );
}

export default Members;
