const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const hasProperties = require("../errors/hasProperties");
const hasRequiredProperties = hasProperties(
  "review_id",
  "content",
  "score",
  "critic_id",
  "movie_id"
);

const VALID_PROPERTIES = [
  "review_id",
  "content",
  "score",
  "critic_id",
  "movie_id",
];

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}


async function update(req, res, next) {
  const { reviewId } = req.params; // Extract the reviewId from the request parameters
  const { data } = req.body; // Extract data from the request body

  try {
    const existingReview = await service.read(reviewId); // Check if the review exists
    if (!existingReview) {
      return res.status(404).json({ error: "Review cannot be found." }); // Handle non-existing review
    }

    const updatedReview = {
      ...existingReview,
      ...data,
      review_id: existingReview.review_id, // Ensure the review_id remains the same
    };

    const updatedData = await service.update(updatedReview); // Update the review

    res.json({ data: updatedData }); // Send the updated review along with the critic information
  } catch (err) {
    next(err); // Forward errors to the error handler
  }
}

module.exports = {
  update: [hasOnlyValidProperties, hasRequiredProperties ,asyncErrorBoundary(update)],
};
