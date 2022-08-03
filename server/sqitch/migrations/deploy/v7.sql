-- Deploy tournament_sqitch:v7 to pg

BEGIN;

CREATE OR REPLACE VIEW "get_all_match_for_stat" AS
SELECT
    "M"."id" AS "match_id",
    "U"."id" AS "user_id",
    "MHT"."is_winner" AS "is_winner",
    "TO"."discipline_id" AS "discipline_id"
FROM "match" AS "M"
JOIN "match_has_team" AS "MHT"
    ON "M".id = "MHT"."match_id"
JOIN "team" AS "TE"
    ON "TE"."id" = "MHT"."team_id"
JOIN "team_has_user" AS "THU"
    ON "THU"."team_id" = "TE"."id"
JOIN "user" AS "U"
    ON "U"."id" = "THU"."user_id"
JOIN "tournament" AS "TO"
    ON "TO"."id" = "M"."tournament_id";
    
CREATE OR REPLACE FUNCTION "get_match_played" (user_id integer, disc_id integer)
RETURNS integer
LANGUAGE SQL 
AS $$

SELECT COUNT("GAM"."is_winner")
FROM "get_all_match_for_stat" AS "GAM"
WHERE "GAM"."discipline_id" = $2
    AND "GAM"."user_id" = $1;

$$;

CREATE OR REPLACE FUNCTION "get_match_win" (user_id integer, disc_id integer)
RETURNS integer
LANGUAGE SQL 
AS $$

SELECT COUNT("GAM"."is_winner")
FROM "get_all_match_for_stat" AS "GAM"
WHERE "GAM"."discipline_id" = $2
    AND "GAM"."user_id" = $1
    AND "GAM"."is_winner" = true;

$$;

CREATE OR REPLACE FUNCTION "get_match_perc_win" (user_id integer, disc_id integer) RETURNS decimal AS $$
DECLARE

total_played integer := "get_match_played"($1, $2);
total_win integer := "get_match_win"($1, $2);

BEGIN
    IF total_played < 1 THEN
        RETURN 0;
    END IF;
    RETURN TRUNC((total_win::decimal / total_played::decimal)::decimal * 100, 2);
    
END;
$$ LANGUAGE PLPGSQL;

CREATE OR REPLACE VIEW "get_all_stats" AS
SELECT
    "U"."id",
    "U"."firstname",
    "U"."lastname",
    "U"."birthdate",
    "U"."url_avatar",
    "U"."gender_id",  
    COALESCE((
        SELECT COUNT("THU"."user_id")
        FROM "team_has_user" AS "THU"
        JOIN "tournament" AS "TO"
            ON "TO"."winner_id" = "THU"."team_id"
        WHERE "THU"."user_id" = "U"."id"), 0) AS "tournament_win",
    (SELECT JSON_AGG(JSON_BUILD_OBJECT(
        'nb_played', ("get_match_played"("U"."id", 1)),
        'nb_win', ("get_match_win"("U"."id", 1)),
        'percent_win', ("get_match_perc_win"("U"."id", 1))))) AS "single_men",
    (SELECT JSON_AGG(JSON_BUILD_OBJECT(
        'nb_played', ("get_match_played"("U"."id", 2)),
        'nb_win', ("get_match_win"("U"."id", 2)),
        'percent_win', ("get_match_perc_win"("U"."id", 2))))) AS "single_women",
    (SELECT JSON_AGG(JSON_BUILD_OBJECT(
        'nb_played', ("get_match_played"("U"."id", 3)),
        'nb_win', ("get_match_win"("U"."id", 3)),
        'percent_win', ("get_match_perc_win"("U"."id", 3))))) AS "double_men",
    (SELECT JSON_AGG(JSON_BUILD_OBJECT(
        'nb_played', ("get_match_played"("U"."id", 4)),
        'nb_win', ("get_match_win"("U"."id", 4)),
        'percent_win', ("get_match_perc_win"("U"."id", 4))))) AS "double_women",
    (SELECT JSON_AGG(JSON_BUILD_OBJECT(
        'nb_played', ("get_match_played"("U"."id", 5)),
        'nb_win', ("get_match_win"("U"."id", 5)),
        'percent_win', ("get_match_perc_win"("U"."id", 5))))) AS "double_mixed"
FROM "user" AS "U"
GROUP BY 1,2,3,4,5,6;

COMMIT;
