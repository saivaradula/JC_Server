const seasons_service = require('../services/seasons');

const addNewSeason = async (req, res, next) => {
    let d = new Date();
    try {
        res.json(await seasons_service.addSeason(req.body)).status(200)
    } catch (err) {
        console.error(`Error while dealing with data`, err.message);
        next(err);
    }
}

module.exports = {
    addNewSeason
}