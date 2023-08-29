const service = require("./movies.service");

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
        res.json({data: data});
    } catch(err) {
        next(err)
    }
}

module.exports = {
  list,
  read,
};
