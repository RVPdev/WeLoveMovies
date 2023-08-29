const service = require("./movies.service");

async function List(req, res, next) {
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

module.exports = {
  List,
};
