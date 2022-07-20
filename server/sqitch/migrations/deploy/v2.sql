-- Deploy tournament_sqitch:v2 to pg

BEGIN;

-- applique le format jour-mois-année par defaut pour le type DATE
ALTER DATABASE "tournament" SET DATESTYLE TO "ISO, DMY";

ALTER TABLE "user" ADD CONSTRAINT "user_email_check"
    CHECK("email" ~ '^[\w\-\.]+@([\w-]+\.)+[\w-]{2,6}$');

COMMIT;
