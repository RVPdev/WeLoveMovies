// Import required modules and middleware
const router = require("express").Router({ mergeParams: true });
const controller = require('./reviews.controller');
const methodNotAllowed = require("../errors/methodNotAllowed");

// Define routes for '/reviews'

// GET request to list all reviews
// All other methods are not allowed
router.route("/")
  .get(controller.list)
  .all(methodNotAllowed);

// Define routes for '/reviews/:reviewId'

// PUT request to update a review by its ID
// DELETE request to delete a review by its ID
// All other methods are not allowed
router.route("/:reviewId")
  .put(controller.update)
  .delete(controller.delete)
  .all(methodNotAllowed);

// Export the router to be used in the app
module.exports = router;
