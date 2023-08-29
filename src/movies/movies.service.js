const knex = require("../db/connection");

function list() {
  return knex("movies").select("*");
}

function readIsShowing() {
  return knex("movies as m")
    .select("*")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .where("mt.is_showing", true);
}

function readId(movieId) {
  return knex("movies as m").select("*").where("m.movie_id", movieId).first();
}

module.exports = {
  list,
  readIsShowing,
  readId,
};
