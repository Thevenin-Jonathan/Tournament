-- Verify tournament_sqitch:v1 on pg

BEGIN;

SELECT "id", "title", "date", "description", "picture_url", "nb_playground", "player_limit",
  "discipline_id", "type_id", "state_id", "club_id", "created_at", "updated_at"
FROM "tournament";

SELECT "id", "name"
FROM "discipline";

SELECT "id", "name"
FROM "type";

SELECT "id", "name"
FROM "state";

SELECT "id", "note", "state_id", "tournament_id"
FROM "match";

SELECT "id", "tournament_id"
FROM "team";

SELECT "id", "firstname", "lastname", "address", "birthdate", "gender", "is_active", "email",
  "password", "url_avatar", "player_license", "club_id", "role_id", "created_at", "updated_at"
FROM "user";

SELECT "id", "name"
FROM "role";

SELECT "id", "name", "address", "phone", "email", "logo_url", "nb_playground", "website", "club_ref", "description"
FROM "club";

SELECT "score", "is_winner", "match_id", "team_id"
FROM "match_has_team";

SELECT "tournament_id", "user_id"
FROM "tournament_has_user";

SELECT "team_id", "user_id"
FROM "team_has_user";

ROLLBACK;
