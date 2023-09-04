// Load environment variables if the process is running under a USER environment.
// This is typically true during development.
if (process.env.USER) require("dotenv").config();

// Import the express library to create the web server.
const express = require("express");

// Create an instance of the express application.
const app = express();

// Import the CORS middleware to handle Cross-Origin Resource Sharing.
const cors = require('cors');

// Import the routers for movies, theaters, and reviews.
const movieRouter = require("./movies/movies.router");
const theatersRouter = require('./theaters/theaters.router');
const reviewsRouter = require('./reviews/reviews.router');

// Import the middleware for handling "Not Found" and other errors.
const notFound = require('./errors/notFound');
const errorHandler = require('./errors/errorHandler');

// Enable CORS for all routes.
app.use(cors());

// Enable parsing of JSON payloads in incoming HTTP requests.
app.use(express.json());

// Use the movieRouter for all routes starting with '/movies'.
app.use('/movies', movieRouter);

// Use the theatersRouter for all routes starting with '/theaters'.
app.use('/theaters', theatersRouter);

// Use the reviewsRouter for all routes starting with '/reviews'.
app.use("/reviews", reviewsRouter);

// If none of the above routes match, use the notFound middleware.
app.use(notFound);

// Handle any errors that occur during request processing.
app.use(errorHandler);

// Export the configured app to be used in other parts of the application.
module.exports = app;
