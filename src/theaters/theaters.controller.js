const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reduceProp = require("../utils/reduce-properties");

const reduceMovies = reduceProp("theater_id", {
  movie_id: ["movies", null, "movie_id"],
  title: ["movies", null, "title"],
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
  rating: ["movies", null, "rating"],
  description: ["movies", null, "description"],
  image_url: ["movies", null, "image_url"],
  created_at: ["movies", null, "created_at"],
  updated_at: ["movies", null, "updated_at"],
  is_showing: ["movies", null, "is_showing"],
//   theater_id: ["movies", null, "theater_id"],
});

async function list(req, res, next) {
  try {
    const data = await service.listTheatersWithMovies();
    const reducedData = reduceMovies(data);
    res.json({ data: reducedData });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  list: asyncErrorBoundary(list),
};
