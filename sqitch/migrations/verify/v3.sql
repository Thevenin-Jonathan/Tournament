-- Verify tournament_sqitch:v3 on pg

BEGIN;

DO $$
BEGIN
    BEGIN
        perform pg_get_functiondef('trigger_set_timestamp()'::regprocedure);
    EXCEPTION WHEN undefined_function THEN
        raise EXCEPTION 'Func trigger_set_timestamp does not found';
    END;
END $$;

ROLLBACK;

DO $$
BEGIN
    perform tgname
    FROM pg_trigger
    WHERE NOT tgisinternal
    AND tgname = 'set_timestamp'
    AND tgrelid = 'user'::regclass;
    IF NOT found THEN 
        raise exception 'trigger on user not found';
    END IF;
END $$;

DO $$
BEGIN
    perform tgname
    FROM pg_trigger
    WHERE NOT tgisinternal
    AND tgname = 'set_timestamp'
    AND tgrelid = 'tournament'::regclass;
    IF NOT found THEN 
        raise exception 'trigger on tournament not found';
    END IF;
END $$;

-- Thank to source:
-- https://stackoverflow.com/questions/33174638/how-to-check-if-trigger-exists-in-postgresql