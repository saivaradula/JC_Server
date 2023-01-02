const mould_service = require('../services/mould');

const addNewMould = async (req, res, next) => {
    try {
        res.json(await mould_service.addMould(req.body)).status(200)
    } catch (err) {
        console.error(`Error while dealing with data`, err.message);
        next(err);
    }
}

module.exports = {
    addNewMould
}