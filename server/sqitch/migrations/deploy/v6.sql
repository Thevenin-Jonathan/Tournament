BEGIN;

DROP FUNCTION IF EXISTS "get_tournament_by_id"(int);
DROP FUNCTION IF EXISTS "get_tournament_by_slug"(text);
DROP FUNCTION IF EXISTS "get_match_by_id"(text);
DROP FUNCTION IF EXISTS "get_team_by_id"(text);
DROP FUNCTION IF EXISTS "get_all_team"(text);

CREATE OR REPLACE VIEW "get_all_team" AS
SELECT
  "T"."id",
  "T"."tournament_id",
COALESCE ((SELECT JSON_AGG(
  JSON_BUILD_OBJECT(
    'user_id', "TU"."user_id",
    'gender_id', (SELECT
                  "gender_id"
                  FROM "user" AS "U"
                  WHERE "U"."id" = "TU"."user_id")
  ))
FROM "team_has_user" AS "TU"
WHERE "TU"."team_id" = "T"."id"), '[]') AS "users"
FROM "team" AS "T"
ORDER BY "T"."id";

CREATE OR REPLACE VIEW "get_team" AS
SELECT
  "T"."id",
  "T"."tournament_id",
COALESCE ((SELECT JSON_AGG(
  JSON_BUILD_OBJECT(
    'user_id', "TU"."user_id",
    'gender_id', (SELECT
                  "gender_id"
                  FROM "user" AS "U"
                  WHERE "U"."id" = "TU"."user_id")
  ))
FROM "team_has_user" AS "TU"
WHERE "TU"."team_id" = "T"."id"), '[]') AS "users",
COALESCE ((SELECT JSON_AGG(
  JSON_BUILD_OBJECT(
    'match_id', "MT"."match_id",
    'is_winner', "MT"."is_winner",
    'result_id', "MT"."result_id"
  ))
FROM "match_has_team" AS "MT"
WHERE "MT"."team_id" = "T"."id"), '[]') AS "matches"  
FROM "team" AS "T";

CREATE OR REPLACE VIEW "get_tournament" AS
SELECT
"T"."id",
"T"."title",
"T"."slug",
"T"."date",
"T"."description",
"T"."picture_url",
"T"."nb_playground",
"T"."player_limit",
"T"."discipline_id",
"T"."type_id",
"T"."state_id",
"T"."club_id",
"T"."winner_id",

(SELECT
  COUNT("U"."id")
FROM "user" AS "U"
JOIN "team" AS "TE"
  ON "TE"."tournament_id" = "T"."id"
JOIN "team_has_user" AS "TEU"
  ON "TEU"."team_id" = "TE"."id"
WHERE "TEU"."user_id" = "U"."id") AS "nb_registered",
COALESCE ((SELECT JSON_AGG(
  JSON_BUILD_OBJECT(
    'id', "id"
  ))
FROM "user" AS "U"
JOIN "tournament_has_user" AS "TU"
  ON "TU"."tournament_id" = "T"."id"
WHERE "TU"."user_id" = "U"."id"
), '[]') AS "managers",
COALESCE ((SELECT JSON_AGG(
  JSON_BUILD_OBJECT(
    'id', "U"."id"
  ))
FROM "user" AS "U"
JOIN "team" AS "TE"
  ON "TE"."tournament_id" = "T"."id"
JOIN "team_has_user" AS "TEU"
  ON "TEU"."team_id" = "TE"."id"
WHERE "TEU"."user_id" = "U"."id"
), '[]') AS "registered",
COALESCE ((SELECT JSON_AGG(
  JSON_BUILD_OBJECT(
    'id', "M"."id",
    'phase', "M"."phase",
    'teams', COALESCE ((SELECT JSON_AGG(
                JSON_BUILD_OBJECT(
                'id', "MHT"."team_id",
                'result_id', "MHT"."result_id",
                'is_winner', "MHT"."is_winner")                 
                ORDER BY "MHT"."team_id")
                FROM "match_has_team" AS "MHT"
                WHERE "MHT"."match_id" = "M"."id"), '[]')) 
ORDER BY "M"."id") AS "teams"
FROM "match" AS "M"
WHERE "M"."tournament_id" = "T"."id"), '[]') AS "matches",
COALESCE ((SELECT JSON_AGG(
  JSON_BUILD_OBJECT(
    'id', "TE"."id",
    'users', COALESCE ((SELECT JSON_AGG(
                JSON_BUILD_OBJECT(
                'id', "TU"."user_id")
                ORDER BY "TU"."user_id")
                FROM "team_has_user" AS "TU"
                WHERE "TU"."team_id" = "TE"."id"), '[]'))
ORDER BY "TE"."id") AS "users"
FROM "team" AS "TE"
WHERE "TE"."tournament_id" = "T"."id"), '[]') AS "teams"
FROM "tournament" AS "T";

CREATE OR REPLACE VIEW "get_match" AS
SELECT
"M"."id",
"M"."note",
"M"."tournament_id",
"M"."state_id",
"M"."phase",
(SELECT JSON_AGG(
  JSON_BUILD_OBJECT(
    'team_id', "MT"."team_id",
    'is_winner', "MT"."is_winner",
    'result_id', "MT"."result_id",
    'user', (SELECT JSON_AGG(
              JSON_BUILD_OBJECT(
                'user_id', "U"."id"
              )
            )
            FROM "user" AS "U"
            LEFT JOIN "team_has_user" AS "TU"
              ON "TU"."user_id" = "U"."id"
            WHERE "TU"."team_id" = "T"."id"
            ))) AS "team"
FROM "team" AS "T"
JOIN "match_has_team" AS "MT"
  ON "MT"."team_id" = "T"."id"
WHERE "MT"."match_id" = "M"."id"
)
FROM "match" AS "M";

COMMIT;
