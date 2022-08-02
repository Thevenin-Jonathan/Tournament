ALTER TABLE IF EXISTS "match" DROP COLUMN "phase";
DROP FUNCTION IF EXISTS "get_tournament_by_id"(int);
DROP FUNCTION IF EXISTS "get_tournament_by_slug"(text);
DROP FUNCTION IF EXISTS "get_match_by_id"(text);
DROP FUNCTION IF EXISTS "get_team_by_id"(text);
DROP FUNCTION IF EXISTS "get_all_team"(text);
