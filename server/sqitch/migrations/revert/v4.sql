BEGIN;

--
ALTER TABLE IF EXISTS "user" 
	ALTER COLUMN "club_id" SET DEFAULT NULL,
	ALTER COLUMN "role_id" SET DEFAULT NULL,
	ALTER COLUMN "gender_id" SET DEFAULT NULL,
	ALTER COLUMN "player_license" DROP NOT NULL;

--
ALTER TABLE IF EXISTS "club" ALTER COLUMN "club_ref" DROP NOT NULL;

--
ALTER TABLE IF EXISTS "tournament" ALTER COLUMN "discipline_id" DROP NOT NULL;
ALTER TABLE IF EXISTS "tournament" ALTER COLUMN "type_id" DROP NOT NULL;
ALTER TABLE IF EXISTS "tournament" ALTER COLUMN "state_id" DROP NOT NULL;
ALTER TABLE IF EXISTS "tournament" ALTER COLUMN "club_id" DROP NOT NULL;;

--
ALTER TABLE IF EXISTS "team" ALTER COLUMN "tournament_id" DROP NOT NULL;

--
ALTER TABLE IF EXISTS "match_has_team" ALTER COLUMN "is_winner" SET DEFAULT FALSE;

--
ALTER TABLE IF EXISTS "match" 
	ALTER COLUMN "state_id" DROP NOT NULL,
	ALTER COLUMN "state_id" SET DEFAULT NULL,
	ALTER COLUMN "tournament_id" DROP NOT NULL;

ALTER TABLE "match_has_team"
    DROP CONSTRAINT match_has_team_match_id_fkey,
    DROP CONSTRAINT match_has_team_team_id_fkey,
    ADD CONSTRAINT match_has_team_match_id_fkey FOREIGN KEY ("match_id") REFERENCES "match"("id"),
    ADD CONSTRAINT match_has_team_team_id_fkey FOREIGN KEY ("team_id") REFERENCES "team"("id");

ALTER TABLE "team_has_user"
    DROP CONSTRAINT team_has_user_user_id_fkey,
    DROP CONSTRAINT team_has_user_team_id_fkey,
    ADD CONSTRAINT team_has_user_user_id_fkey FOREIGN KEY ("user_id") REFERENCES "user"("id"),
    ADD CONSTRAINT team_has_user_team_id_fkey FOREIGN KEY ("team_id") REFERENCES "team"("id");

COMMIT;