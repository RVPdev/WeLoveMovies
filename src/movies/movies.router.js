// Import required modules and controllers
const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// Import routers for theaters and reviews
const theatersRouter = require("../theaters/theaters.router");
const reviewsRouter = require("../reviews/reviews.router");

// Define the root route for movies
// GET requests will be handled by the list function in the controller
// All other HTTP methods will return a "Method Not Allowed" error
router.route("/")
  .get(controller.list)
  .all(methodNotAllowed);

// Define the route for getting a specific movie by its ID
// GET requests will be handled by the read function in the controller
// All other HTTP methods will return a "Method Not Allowed" error
router.route("/:movieId")
  .get(controller.read)
  .all(methodNotAllowed);

// Define the nested route for getting theaters for a specific movie
// Forward the request to the theatersRouter
router.use("/:movieId/theaters", theatersRouter);

// Define the nested route for getting reviews for a specific movie
// Forward the request to the reviewsRouter
router.use("/:movieId/reviews", reviewsRouter);

// Export the router to be used in the main application
module.exports = router;
