-- Revert tournament_sqitch:v1 from pg

BEGIN;

DROP TABLE 
    "tournament", 
    "discipline",
    "type",
    "state",
    "match",
    "team",
    "user",
    "role",
    "club",
    "match_has_team",
    "tournament_has_user",
    "team_has_user";
    -- CASCADE;       

COMMIT;
