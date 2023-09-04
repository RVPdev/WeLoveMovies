// Import the service functions and error handling middleware
const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// Asynchronous function to list movies
async function list(req, res, next) {
  // Extract the is_showing query parameter from the request
  const { is_showing } = req.query;

  // If is_showing is present, fetch only the movies that are currently showing
  if (is_showing) {
    const data = await service.readIsShowing();
    res.json({ data: data });
  } else {
    // If is_showing is not present, fetch all movies
    const data = await service.list();
    res.json({ data: data });
  }
}

// Asynchronous middleware to check if a movie exists
async function movieExist(req, res, next) {
  // Extract the movieId parameter from the request
  const { movieId } = req.params;

  // Fetch the movie by its ID
  const data = await service.readId(movieId);

  // If the movie exists, store it in res.locals and proceed to the next middleware
  if (data) {
    res.locals.movie = data;
    return next();
  }

  // If the movie does not exist, return a 404 error
  return next({ status: 404, message: `Movie cannot be found.` });
}

// Asynchronous function to read a specific movie
async function read(req, res, next) {
  // Extract the movieId parameter from the request
  const { movieId } = req.params;

  // Fetch the movie by its ID
  const data = await service.readId(movieId);

  // Return the fetched movie data
  res.json({ data: data });
}

// Export the controller functions, wrapping them in the asyncErrorBoundary for error handling
module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExist), asyncErrorBoundary(read)],
};
