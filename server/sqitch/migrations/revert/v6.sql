-- Revert tournament_sqitch:v6 from pg

BEGIN;

DROP VIEW IF EXISTS "get_all_team";
DROP VIEW IF EXISTS "get_tournament";
DROP VIEW IF EXISTS "get_match";
DROP VIEW IF EXISTS "get_team";

COMMIT;
