-- Verify tournament_sqitch:v2 on pg

BEGIN;

DO $$
BEGIN
    PERFORM TRUE
       FROM   information_schema.table_constraints
      WHERE  constraint_name  = 'user_email_check'
        AND constraint_type = 'CHECK';
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Check user email constraint on user not found !';
    END IF;
END;
$$;

DO $$
BEGIN
    PERFORM TRUE
       FROM   information_schema.table_constraints
      WHERE  constraint_name  = 'club_email_check'
        AND constraint_type = 'CHECK';
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Check club email constraint on user not found !';
    END IF;
END;
$$;

DO $$
BEGIN
    PERFORM TRUE
       FROM   information_schema.table_constraints
      WHERE  constraint_name  = 'club_phone_check'
        AND constraint_type = 'CHECK';
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Check club phone constraint on user not found !';
    END IF;
END;
$$;

DO $$
BEGIN
    PERFORM TRUE
       FROM   information_schema.table_constraints
      WHERE  constraint_name  = 'user_phone_check'
        AND constraint_type = 'CHECK';
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Check user phone constraint on user not found !';
    END IF;
END;
$$;

SELECT "id", "label" FROM "result";
SELECT "id", "name" FROM "gender";
SELECT "phone" FROM "user";
SELECT "gender_id" FROM "user";
SELECT "result_id" FROM "match_has_team";

DO $$
BEGIN
    PERFORM TRUE
       FROM   information_schema.columns
      WHERE  table_name  = 'user'
        AND column_name = 'gender';
    IF FOUND THEN
        RAISE EXCEPTION 'Gender column does not found !';
    END IF;
END;
$$;

DO $$
BEGIN
    PERFORM TRUE
       FROM   information_schema.columns
      WHERE  table_name  = 'match_has_team'
        AND column_name = 'score';
    IF FOUND THEN
        RAISE EXCEPTION 'Score column does not found !';
    END IF;
END;
$$;

ROLLBACK;
