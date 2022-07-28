const pool = require("../config/database");

/**
 * Return all player stats from database
 * @async
 * @returns {stats[]} all player stats
 */
async function findAll() {
  const result = await pool.query(
    `
    SELECT "id", "firstname", "lastname", "birthdate", "url_avatar", "gender_id", "stat_played_tournament",
      "stat_single_played", "stat_won_single", "stat_double_played", "stat_won_double", "stat_mix_played", "stat_won_mix"
    FROM "user"
    LEFT JOIN (
      SELECT
        "t1"."user_id",
        SUM(
          CASE
          WHEN "t1"."state_id" = '4'
          THEN 1 ELSE 0 END) AS "stat_played_tournament"
        FROM (
          SELECT
            "user"."id" AS "user_id",
            "state_id",
            "player_limit"
          FROM "tournament"
          INNER JOIN "team" ON "team"."tournament_id" = "tournament"."id"
          INNER JOIN "team_has_user" ON "team_has_user"."team_id" = "team"."id"
          INNER JOIN "user" ON "user"."id" = "team_has_user"."user_id") AS "t1"
          GROUP BY 1) AS "t2"
    ON "t2"."user_id" = "user"."id"
    LEFT JOIN (
      SELECT
        "t1"."user_id",
      SUM(CASE
        WHEN "t1"."id" = '1' OR "t1"."id" = '2'
        THEN 1 ELSE 0 END) AS "stat_single_played",
      SUM(CASE
        WHEN ("t1"."id" = '1' OR "t1"."id" = '2')
          AND "is_winner" = true
        THEN 1 ELSE 0 END) AS "stat_won_single",
      SUM(CASE
        WHEN "t1"."id" = '3' OR "t1"."id" = '4'
        THEN 1 ELSE 0 END) AS "stat_double_played", 
      SUM(CASE
        WHEN ("t1"."id" = '3' OR "t1"."id" = '4')
          AND "is_winner" = true
        THEN 1 ELSE 0 END) AS "stat_won_double",
      SUM(CASE
        WHEN "t1"."id" = '5'
        THEN 1 ELSE 0 END) AS "stat_mix_played",
      SUM(CASE
        WHEN "t1"."id" = '5'
          AND "is_winner" = true
        THEN 1 ELSE 0 END) AS "stat_won_mix"
      FROM (SELECT
        "user"."id" AS "user_id",
        "is_winner",
        "discipline"."id"
        FROM "user"
        INNER JOIN "team_has_user"
          ON "team_has_user"."user_id" = "user"."id"
        INNER JOIN "team"
          ON "team"."id" = "team_has_user"."team_id"
        INNER JOIN "match_has_team"
          ON "match_has_team"."team_id" = "team"."id"
        INNER JOIN "match"
          ON "match"."id" = "match_has_team"."match_id"
        INNER JOIN "tournament"
          ON "tournament"."id" = "match"."tournament_id"
        INNER JOIN "discipline"
          ON "discipline"."id" = "tournament"."discipline_id"
        WHERE "match"."state_id" = 4
        GROUP BY 1, 2, 3) AS "t1"
      GROUP BY 1) AS "t4"
    ON "t4"."user_id" = "user"."id"
    GROUP BY 1, 7, 8, 9, 10, 11, 12, 13
    ORDER BY "id"
    `
  );
  return result.rows;
}

/**
 * Return one player stats from database
 * @async
 * @param {number} id User identifiant
 * @returns {object} player stats
 */
async function findById(id) {
  const result = await pool.query(
    `
    SELECT "id", "firstname", "lastname", "birthdate", "url_avatar", "gender_id", "stat_played_tournament",
      "stat_single_played", "stat_won_single", "stat_double_played", "stat_won_double", "stat_mix_played", "stat_won_mix"
    FROM "user"
    LEFT JOIN (
      SELECT
        "t1"."user_id",
        SUM(
          CASE
          WHEN "t1"."state_id" = '4'
          THEN 1 ELSE 0 END) AS "stat_played_tournament"
        FROM (
          SELECT
            "user"."id" AS "user_id",
            "state_id",
            "player_limit"
          FROM "tournament"
          INNER JOIN "team" ON "team"."tournament_id" = "tournament"."id"
          INNER JOIN "team_has_user" ON "team_has_user"."team_id" = "team"."id"
          INNER JOIN "user" ON "user"."id" = "team_has_user"."user_id") AS "t1"
          GROUP BY 1) AS "t2"
    ON "t2"."user_id" = "user"."id"
    LEFT JOIN (
      SELECT
        "t1"."user_id",
      SUM(CASE
        WHEN "t1"."id" = '1' OR "t1"."id" = '2'
        THEN 1 ELSE 0 END) AS "stat_single_played",
      SUM(CASE
        WHEN ("t1"."id" = '1' OR "t1"."id" = '2')
          AND "is_winner" = true
        THEN 1 ELSE 0 END) AS "stat_won_single",
      SUM(CASE
        WHEN "t1"."id" = '3' OR "t1"."id" = '4'
        THEN 1 ELSE 0 END) AS "stat_double_played", 
      SUM(CASE
        WHEN ("t1"."id" = '3' OR "t1"."id" = '4')
          AND "is_winner" = true
        THEN 1 ELSE 0 END) AS "stat_won_double",
      SUM(CASE
        WHEN "t1"."id" = '5'
        THEN 1 ELSE 0 END) AS "stat_mix_played",
      SUM(CASE
        WHEN "t1"."id" = '5'
          AND "is_winner" = true
        THEN 1 ELSE 0 END) AS "stat_won_mix"
      FROM (SELECT
        "user"."id" AS "user_id",
        "is_winner",
        "discipline"."id"
        FROM "user"
        INNER JOIN "team_has_user"
          ON "team_has_user"."user_id" = "user"."id"
        INNER JOIN "team"
          ON "team"."id" = "team_has_user"."team_id"
        INNER JOIN "match_has_team"
          ON "match_has_team"."team_id" = "team"."id"
        INNER JOIN "match"
          ON "match"."id" = "match_has_team"."match_id"
        INNER JOIN "tournament"
          ON "tournament"."id" = "match"."tournament_id"
        INNER JOIN "discipline"
          ON "discipline"."id" = "tournament"."discipline_id"
        WHERE "match"."state_id" = 4
        GROUP BY 1, 2, 3) AS "t1"
      GROUP BY 1) AS "t4"
    ON "t4"."user_id" = "user"."id"
    WHERE "user"."id" = $1
    GROUP BY 1, 7, 8, 9, 10, 11, 12, 13
    ORDER BY "id"
    `,
    [id]
  );
  return result.rows[0];
}

module.exports = {
  findAll,
  findById
}