BEGIN;

CREATE OR REPLACE FUNCTION "get_match_by_id" (integer)
RETURNS table(
  "id" integer,
	"note" text,
	"tournament_id" integer,
	"state_id" integer,
	"team" json) 
LANGUAGE SQL 
AS $$

SELECT
"M"."id",
"M"."note",
"M"."tournament_id",
"M"."state_id",
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
FROM "match" AS "M"
WHERE "M"."id" = $1

$$;

CREATE OR REPLACE FUNCTION "get_tournament_by_slug" (text)
RETURNS table(
  "id" integer,
	"title" text,
	"slug" text,
	"date" date,
	"description" text,
	"picture_url" text,
	"nb_playground" integer,
	"player_limit" integer,
	"discipline_id" integer,
	"type_id" integer,
	"state_id" integer,
	"club_id" integer,
  "nb_registered" integer,
  "managers" json,
  "registered" json,
  "matches" json) 
LANGUAGE SQL 
AS $$

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

(SELECT
  COUNT("U"."id")
FROM "user" AS "U"
JOIN "team" AS "TE"
  ON "TE"."tournament_id" = "T"."id"
JOIN "team_has_user" AS "TEU"
  ON "TEU"."team_id" = "TE"."id"
WHERE "TEU"."user_id" = "U"."id") AS nb_registered,

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
    'id', "M"."id"
  ))
FROM "match" AS "M"
WHERE "M"."tournament_id" = "T"."id"
), '[]') AS "matches"

FROM "tournament" AS "T"
WHERE "T"."slug" = $1;

$$;

CREATE OR REPLACE FUNCTION "get_tournament_by_id" (integer)
RETURNS table(
  "id" integer,
	"title" text,
	"slug" text,
	"date" date,
	"description" text,
	"picture_url" text,
	"nb_playground" integer,
	"player_limit" integer,
	"discipline_id" integer,
	"type_id" integer,
	"state_id" integer,
	"club_id" integer,
  "nb_registered" integer,
  "managers" json,
  "registered" json,
  "matches" json) 
LANGUAGE SQL 
AS $$

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

(SELECT
  COUNT("U"."id")
FROM "user" AS "U"
JOIN "team" AS "TE"
  ON "TE"."tournament_id" = "T"."id"
JOIN "team_has_user" AS "TEU"
  ON "TEU"."team_id" = "TE"."id"
WHERE "TEU"."user_id" = "U"."id") AS nb_registered,

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
    'id', "M"."id"
  ))
FROM "match" AS "M"
WHERE "M"."tournament_id" = "T"."id"
), '[]') AS "matches"

FROM "tournament" AS "T"
WHERE "T"."id" = $1;

$$;

COMMIT;