-- Revert tournament_sqitch:v2 from pg

BEGIN;

ALTER TABLE IF EXISTS "user" DROP CONSTRAINT IF EXISTS "user_email_check";
ALTER TABLE IF EXISTS "club" DROP CONSTRAINT IF EXISTS "club_email_check";

ALTER TABLE IF EXISTS "club" DROP CONSTRAINT IF EXISTS "club_phone_check";

DROP TABLE IF EXISTS "result", "gender" CASCADE;

ALTER TABLE IF EXISTS "user" DROP CONSTRAINT IF EXISTS "user_phone_check";
ALTER TABLE IF EXISTS "user" DROP COLUMN "phone";

ALTER TABLE IF EXISTS "user" ADD COLUMN IF NOT EXISTS "gender" TEXT NOT NULL;
ALTER TABLE IF EXISTS "user" DROP COLUMN IF EXISTS "gender_id" CASCADE;

ALTER TABLE IF EXISTS "match_has_team" ADD COLUMN IF NOT EXISTS "score" TEXT;
ALTER TABLE IF EXISTS "match_has_team" DROP COLUMN IF EXISTS "result_id" CASCADE;

COMMIT;
