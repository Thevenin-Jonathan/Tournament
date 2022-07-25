-- Deploy tournament_sqitch:v3 to pg

BEGIN;

ALTER TABLE IF EXISTS "user" ALTER COLUMN "created_at" SET DEFAULT NOW();
ALTER TABLE IF EXISTS "user" ALTER COLUMN "updated_at" SET DEFAULT NOW();

-- Fonction de mise à jour de la colonne updated_at obtenue ici
-- https://x-team.com/blog/automatic-timestamps-with-postgresql/
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER set_timestamp
BEFORE UPDATE ON "user"
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

ALTER TABLE IF EXISTS "tournament" ALTER COLUMN "created_at" SET DEFAULT NOW();
ALTER TABLE IF EXISTS "tournament" ALTER COLUMN "updated_at" SET DEFAULT NOW();

CREATE OR REPLACE TRIGGER set_timestamp
BEFORE UPDATE ON "tournament"
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

COMMIT;
