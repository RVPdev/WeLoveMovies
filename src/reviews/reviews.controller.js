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

// const reduceTheaterandMoviesCoocked = {
//   preferred_name: ["critic", "preferred_name"],
//   surname: ["critic", "surname"],
//   organization_name: ["critic", "organization_name"],
// };

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
    // ...res.locals.review,
    ...req.body.data,
    review_id: req.params.reviewId,
  };
  console.log(updateReview, '~~~~~~~~~~~~~~~~~')
  let data = await service.update(updateReview);

  let critic_id = data.critic_id;

  let updateReviewWithCritic = await service.readCritic(critic_id);

  data.critic = updateReviewWithCritic;

  // console.log(data, "`````````````````````````")
  res.json({ data });

  // const recudeData = reduceProperties(
  //   "review_id",
  //   reduceTheaterandMoviesCoocked
  // );
  // data = recudeData(data);
  // console.log(data);
  // res.json({ data: data[0] });

  //
}

async function destroy(req, res, next) {
  const { review_id } = res.locals.review;
  const data = await service.destroy(review_id);
  res.status(204).json({});
}

module.exports = {
  list: asyncErrorBoundary(list),
  update: [asyncErrorBoundary(reviewExist), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(reviewExist), asyncErrorBoundary(destroy)],
};
