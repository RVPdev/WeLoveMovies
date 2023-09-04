// Importing required services and utilities
const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reduceProp = require("../utils/reduce-properties");

// A utility function to reduce an array of objects into a nested structure
const reduceMovies = reduceProp("theater_id", {
  movie_id: ["movies", null, "movie_id"],
  title: ["movies", null, "title"],
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
  rating: ["movies", null, "rating"],
  description: ["movies", null, "description"],
  image_url: ["movies", null, "image_url"],
  created_at: ["movies", null, "created_at"],
  updated_at: ["movies", null, "updated_at"],
  is_showing: ["movies", null, "is_showing"],
});

// Asynchronous function to handle listing theaters
async function list(req, res, next) {
  const { movieId } = req.params; // Extract movieId from request parameters
  if (movieId) {
    try {
      // If a movie ID is provided, fetch theaters showing this specific movie
      const data = await service.listTheatersWithMoviesId(movieId);
      res.json({ data: data });
    } catch (err) {
      next(err); // Error handling
    }
  } else {
    try {
      // If no movie ID is provided, fetch all theaters and the movies they are showing
      const data = await service.listTheatersWithMovies();
      const reducedData = reduceMovies(data); // Reduce the data into a nested structure
      res.json({ data: reducedData });
    } catch (err) {
      next(err); // Error handling
    }
  }
}

// Exporting the list function wrapped in an error boundary
module.exports = {
  list: asyncErrorBoundary(list),
};
