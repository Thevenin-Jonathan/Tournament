-- Revert tournament_sqitch:v7 from pg

BEGIN;

DROP VIEW IF EXISTS "get_all_match_for_stat";
DROP VIEW IF EXISTS "get_all_stats";
DROP FUNCTION IF EXISTS "get_match_played" (user_id integer, disc_id integer);
DROP FUNCTION IF EXISTS "get_match_win" (user_id integer, disc_id integer);
DROP FUNCTION IF EXISTS "get_match_perc_win" (user_id integer, disc_id integer);

COMMIT;
