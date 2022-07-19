## Modele logique de données

- Tournament(**<ins>code_tournament</ins>**, title, date, description, picture_url, nb_playground, player_limit, created_at, updated_at, #code_discipline, #code_type, #code_state, #code_club)
- Discipline(**<ins>code_discipline</ins>**, name)
- Type(**<ins>code_type</ins>**, name)
- State(**<ins>code_state</ins>**, name)
- Match(**<ins>code_match</ins>**, note, #code_state, #code_tournament)
- Team(**<ins>code_team</ins>**, #code_tournament)
- User(**<ins>code_user</ins>**, firstname, lastname, address, birthdate, gender, is_active, email, password, url_avatar, created_at, updated_at, #code_role, #code_club)
- Role(**<ins>code_role</ins>**, name)
- Club(**<ins>code_club</ins>**, name, address, phone, email, logo_url, nb_playground, website, club_ref, description )
- PLAY(score, is_winner, **<ins>#code_match</ins>**, **<ins>#code_team</ins>**)
- BELONGS(**<ins>#code_team</ins>**, **<ins>#code_user</ins>**)
- MANAGE(**<ins>#code_tournament</ins>**, **<ins>#code_user</ins>**)