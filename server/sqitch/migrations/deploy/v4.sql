-- Deploy tournament_sqitch:v4 to pg

BEGIN;

ALTER TABLE IF EXISTS "match_has_team" ALTER COLUMN "is_winner" SET DEFAULT null;

ALTER TABLE IF EXISTS "user"
    ALTER COLUMN "role_id" SET DEFAULT 1,
    ALTER COLUMN "club_id" SET DEFAULT 2,
    ALTER COLUMN "player_license" SET not null,
    ALTER COLUMN "gender_id" SET not null;

ALTER TABLE IF EXISTS "tournament" 
    ALTER COLUMN "discipline_id" SET not null,
    ALTER COLUMN "type_id" SET not null,
    ALTER COLUMN "state_id" SET not null,
    ALTER COLUMN "state_id" SET DEFAULT 1,
    ALTER COLUMN "club_id" SET not null,
    ALTER COLUMN "club_id" SET DEFAULT 1;

ALTER TABLE IF EXISTS "team" ALTER COLUMN "tournament_id" SET not null;

ALTER TABLE IF EXISTS "match" 
    ALTER COLUMN "state_id" SET not null,
    ALTER COLUMN "state_id" SET DEFAULT 1,
    ALTER COLUMN "tournament_id" SET not null;

ALTER TABLE IF EXISTS "club" ALTER COLUMN "club_ref" SET not null;

COMMIT;
