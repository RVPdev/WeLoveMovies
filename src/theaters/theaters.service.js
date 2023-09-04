// Import the database connection
const knex = require("../db/connection");

// Function to list all theaters with movies
function listTheatersWithMovies() {
  return knex("theaters as t") // Query the 'theaters' table, alias it as 't'
    .join("movies_theaters as mt", "mt.theater_id", "t.theater_id") // Join with 'movies_theaters' table on theater_id
    .join("movies as m", "m.movie_id", "mt.movie_id") // Join with 'movies' table on movie_id
    .select("*"); // Select all columns from all tables
}

// Function to list theaters showing a specific movie by its ID
function listTheatersWithMoviesId(movieId) {
  return knex("theaters as t") // Query the 'theaters' table, alias it as 't'
    .select("t.*") // Select all columns from 'theaters' table
    .join("movies_theaters as mt", "t.theater_id", "=", "mt.theater_id") // Join with 'movies_theaters' table on theater_id
    .where("mt.movie_id", Number(movieId)); // Filter based on the movie's ID
}

// Export the functions for use in other modules
module.exports = {
  listTheatersWithMovies,
  listTheatersWithMoviesId,
};
