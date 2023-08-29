const service = require('./movies.service');

async function List (req, res, next) {
    try {
        const data = await service.list()
        res.json({data: data});
    } catch (err) {
        next(err);
    }
}

module.exports = {
    List,
};