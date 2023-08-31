const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reduceProperties = require("../utils/reduce-properties");

const reduceTheaterandMoviesRaw = {
  critic_id: ["critic", "critic_id"],
  preferred_name: ["critic", "preferred_name"],
  surname: ["critic", "surname"],
  organization_name: ["critic", "organization_name"],
  updated_at: ["critic", "updated_at"],
};

const reduceTheaterandMoviesCoocked = {
  preferred_name: ["critic", "preferred_name"],
  surname: ["critic", "surname"],
  organization_name: ["critic", "organization_name"],
};

async function reviewExist(req, res, next) {
  const { reviewId } = req.params;
  const data = await service.readReview(reviewId);
  if (data) {
    res.locals.review = data;
    return next();
  }
  return next({ status: 404, message: `Review cannot be found.` });
}

async function list(req, res, next) {
  const { movieId } = req.params;
  if (movieId) {
    let data = await service.readMovie(movieId);
    const dataReduced = reduceProperties(
      "review_id",
      reduceTheaterandMoviesRaw
    );
    data = dataReduced(data);
    res.json({ data: data });
  } else {
    const data = await service.list();
    res.json({ data: data });
  }
}

async function update(req, res, next) {
  const updateReview = {
    ...res.locals.review,
    ...res.body.data,
    review_id: res.locals.review.review_id,
  };
  let data = await service.update(updateReview);
  const recudeData = reduceProperties(
    "review_id",
    reduceTheaterandMoviesCoocked
  );
  data = recudeData(data);
  res.json({ data: data[0] });
}

async function destroy(req, res, next) {
  const { review_id } = res.locals.review;
  const data = await service.delete(review_id);
  res.status(204).json({});
}

module.exports = {
  list,
  update: [asyncErrorBoundary(reviewExist), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(reviewExist), asyncErrorBoundary(destroy)],
};
