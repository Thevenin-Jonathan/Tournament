-- Deploy tournament_sqitch:v1 to pg

BEGIN;

-------------------
-- CREATE TABLES --
-------------------

CREATE TABLE IF NOT EXISTS "tournament"(
  "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "title" TEXT NOT NULL,
  "date" DATE NOT NULL,
  "description" TEXT,
  "picture_url" TEXT,
  "nb_playground" INTEGER NOT NULL,
  "player_limit" INTEGER,
  "created_at" TIMESTAMPTZ,
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "discipline"(
  "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "name" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "type"(
  "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "name" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "state"(
  "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "name" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "match"(
  "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "note" TEXT
);

CREATE TABLE IF NOT EXISTS "team"(
  "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY
);

CREATE TABLE IF NOT EXISTS "user"(
  "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "firstname" TEXT NOT NULL,
  "lastname" TEXT NOT NULL,
  "address" TEXT,
  "birthdate" DATE NOT NULL,
  "gender" TEXT NOT NULL,
  "is_active" BOOLEAN NOT NULL DEFAULT TRUE,
  "email" TEXT NOT NULL,
  "password" TEXT NOT NULL,
  "url_avatar" TEXT,
  "player_license" TEXT,
  "created_at" TIMESTAMPTZ,
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "role"(
  "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "name" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "club"(
  "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "name" TEXT NOT NULL,
  "address" TEXT,
  "phone" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "logo_url" TEXT,
  "nb_playground" INTEGER NOT NULL,
  "website" TEXT,
  "club_ref" TEXT,
  "description" TEXT
);

CREATE TABLE IF NOT EXISTS "match_has_team"(
  "score" TEXT,
  "is_winner" BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS "tournament_has_user"(
);

CREATE TABLE IF NOT EXISTS "team_has_user"(
);

-------------------------
-- CREATE FOREIGN KEYS --
-------------------------

ALTER TABLE IF EXISTS "tournament" ADD COLUMN "discipline_id" INTEGER REFERENCES "discipline"("id");
ALTER TABLE IF EXISTS "tournament" ADD COLUMN "type_id" INTEGER REFERENCES "type"("id");
ALTER TABLE IF EXISTS "tournament" ADD COLUMN "state_id" INTEGER REFERENCES "state"("id");
ALTER TABLE IF EXISTS "tournament" ADD COLUMN "club_id" INTEGER REFERENCES "club"("id");
ALTER TABLE IF EXISTS "match" ADD COLUMN "state_id" INTEGER REFERENCES "state"("id");
ALTER TABLE IF EXISTS "match" ADD COLUMN "tournament_id" INTEGER REFERENCES "tournament"("id");
ALTER TABLE IF EXISTS "team" ADD COLUMN "tournament_id" INTEGER REFERENCES "tournament"("id");
ALTER TABLE IF EXISTS "user" ADD COLUMN "club_id" INTEGER REFERENCES "club"("id");
ALTER TABLE IF EXISTS "user" ADD COLUMN "role_id" INTEGER REFERENCES "role"("id");
ALTER TABLE IF EXISTS "match_has_team" ADD COLUMN "team_id" INTEGER REFERENCES "team"("id");
ALTER TABLE IF EXISTS "match_has_team" ADD COLUMN "match_id" INTEGER REFERENCES "match"("id");
ALTER TABLE IF EXISTS "tournament_has_user" ADD COLUMN "tournament_id" INTEGER REFERENCES "tournament"("id");
ALTER TABLE IF EXISTS "tournament_has_user" ADD COLUMN "user_id" INTEGER REFERENCES "user"("id");
ALTER TABLE IF EXISTS "team_has_user" ADD COLUMN "team_id" INTEGER REFERENCES "team"("id");
ALTER TABLE IF EXISTS "team_has_user" ADD COLUMN "user_id" INTEGER REFERENCES "user"("id");

-------------------------
-- CREATE PRIMARY KEYS --
-------------------------

ALTER TABLE IF EXISTS "match_has_team" ADD CONSTRAINT "match_has_team_pkey" PRIMARY KEY ("team_id", "match_id");
ALTER TABLE IF EXISTS "tournament_has_user" ADD CONSTRAINT "tournament_has_user_pkey" PRIMARY KEY ("tournament_id", "user_id");
ALTER TABLE IF EXISTS "team_has_user" ADD CONSTRAINT "team_has_user_pkey" PRIMARY KEY ("team_id", "user_id");

------------------------
--   CREATE INDEXES   --
------------------------
CREATE INDEX "tournament_date_idx" ON "tournament" USING btree ("date");
CREATE INDEX "user_firstname_idx" ON "user" USING btree ("firstname");
CREATE INDEX "user_lastname_idx" ON "user" USING btree ("lastname");
CREATE INDEX "user_email_idx" ON "user" USING btree ("email");
CREATE INDEX "user_password_idx" ON "user" USING hash ("password");

COMMIT;



