const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reduceProperties = require('../utils/reduce-properties');




const hasProperties = require("../errors/hasProperties");
const hasRequiredProperties = hasProperties(
  "review_id",
  "content",
  "score",
  "critic_id",
  "movie_id"
);

const VALID_PROPERTIES = [
  "content",
  "score",
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


module.exports = {
  update: [hasOnlyValidProperties, hasRequiredProperties ,asyncErrorBoundary(update)],
};
