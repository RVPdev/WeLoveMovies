// Import the Knex connection
const knex = require("../db/connection");

// Function to list all movies
function list() {
  // Use Knex to select all records from the "movies" table
  return knex("movies").select("*");
}

// Function to list all movies that are currently showing
function readIsShowing() {
  // Use Knex to select records from the "movies" table aliased as 'm'
  // Join it with the "movies_theaters" table aliased as 'mt'
  // Filter the records where "is_showing" is true
  // Group the results by movie_id and order them by movie_id
  return knex("movies as m")
    .select("m.*")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .where("mt.is_showing", true)
    .groupBy("m.movie_id")
    .orderBy("m.movie_id");
}

// Function to read a specific movie by its ID
function readId(movieId) {
  // Use Knex to select the movie record with a specific ID
  // Convert the movieId to Number type and get the first matching record
  return knex("movies as m")
    .select("*")
    .where("m.movie_id", Number(movieId))
    .first();
}

// Export the service functions
module.exports = {
  list,
  readIsShowing,
  readId,
};
