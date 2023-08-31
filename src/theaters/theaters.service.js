const knex = require("../db/connection");

function listTheatersWithMovies() {
  return knex("theaters as t")
    .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .select("*");
}

function listTheatersWithMoviesId(movieId) {
  return knex("theaters as t")
    .select("t.*")
    .join("movies_theaters as mt", "t.theater_id", "=", "mt.theater_id")
    .where("mt.movie_id", Number(movieId));
}

module.exports = {
  listTheatersWithMovies,
  listTheatersWithMoviesId,
};
