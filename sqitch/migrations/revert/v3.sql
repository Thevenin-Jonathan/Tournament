-- Revert tournament_sqitch:v3 from pg

BEGIN;

ALTER TABLE IF EXISTS "user" ALTER COLUMN "created_at" SET DEFAULT NULL;
ALTER TABLE IF EXISTS "user" ALTER COLUMN "updated_at" SET DEFAULT NULL;

ALTER TABLE IF EXISTS "tournament" ALTER COLUMN "created_at" SET DEFAULT NULL;
ALTER TABLE IF EXISTS "tournament" ALTER COLUMN "updated_at" SET DEFAULT NULL;

DROP TRIGGER IF EXISTS set_timestamp ON "user";
DROP TRIGGER IF EXISTS set_timestamp ON "tournament";
DROP FUNCTION IF EXISTS trigger_set_timestamp();

COMMIT;
