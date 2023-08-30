const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
  const { is_showing } = req.query;

  if (is_showing) {
    try {
      const data = await service.readIsShowing();
      res.json({ data: data });
    } catch (err) {
      next(err);
    }
  } else {
    try {
      const data = await service.list();
      res.json({ data: data });
    } catch (err) {
      next(err);
    }
  }
}

async function read(req, res, next) {
    const {movieId} = req.params;
    try{
        const data = await service.readId(movieId);
        if (data) {  // If data exists, send it back
            res.json({ data: data });
        } else {  // If no data exists (i.e., ID is incorrect)
            res.status(404).json({ error: "Movie cannot be found." });
        }
    } catch(err) {
        next(err)
    }
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: asyncErrorBoundary(read),
};
