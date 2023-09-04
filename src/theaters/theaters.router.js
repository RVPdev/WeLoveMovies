// Import required modules
const router = require("express").Router({ mergeParams: true }); // Initialize Express router, merging parameters from parent routes
const controller = require('./theaters.controller'); // Import the controller for theaters
const methodNotAllowed = require('../errors/methodNotAllowed'); // Import the utility function for handling "Method Not Allowed" errors

// Define the route for the root path related to theaters
router.route("/")
  .get(controller.list) // Handle GET requests with the 'list' method from the controller
  .all(methodNotAllowed); // For all other HTTP methods, return a "Method Not Allowed" error

// Export the configured router
module.exports = router;
