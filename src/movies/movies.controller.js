const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
  const { is_showing } = req.query;

  if (is_showing) {
    const data = await service.readIsShowing();
    res.json({ data: data });
  } else {
    const data = await service.list();
    res.json({ data: data });
  }
}

async function movieExist(req, res, next) {
  const { movieId } = req.params;
  const data = await service.readId(movieId);
  if (data) {
    res.locals.movie = data;
    return next();
  }
  return next({ status: 404, message: `Movie cannot be found.` });
}

async function read(req, res, next) {
  const { movieId } = req.params;
  const data = await service.readId(movieId);
  res.json({ data: data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExist), asyncErrorBoundary(read)],
};
