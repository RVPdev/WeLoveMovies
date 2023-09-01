const knex = require("../db/connection");

function list() {
  return knex("movies").select("*");
}

function readIsShowing() {
  return knex("movies as m")
    .select("m.*")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .where("mt.is_showing", true)
    .groupBy("m.movie_id")
    .orderBy("m.movie_id");
}

function readId(movieId) {
  return knex("movies as m").select("*").where("m.movie_id", Number(movieId)).first();
}

module.exports = {
  list,
  readIsShowing,
  readId,
};
