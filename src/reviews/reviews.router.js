const router = require("express").Router({ mergeParams: true });
const controller = requrie("./reviews.controller")
const methodNotAllowed = require("../error/methodNotAllowed");

router.route("/").get(controller.list).all(methodNotAllowed);

router
  .route("/:reviewId")
  .put(controller.update)
  .delete(controller.delete)
  .all(methodNotAllowed);

  module.exports = rouer

