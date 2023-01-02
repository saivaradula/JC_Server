const collection_service = require('../services/collection');

const addNewCollection = async (req, res, next) => {
    let d = new Date();
    try {
        res.json(await collection_service.addCollection(req.body)).status(200)
    } catch (err) {
        console.error(`Error while dealing with data`, err.message);
        next(err);
    }
}

module.exports = {
    addNewCollection
}