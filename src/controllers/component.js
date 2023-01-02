const component_service = require('../services/component');

const addNewComponent = async (req, res, next) => {
    let d = new Date();
    try {
        res.json(await component_service.addComponent(req.body)).status(200)
    } catch (err) {
        console.error(`Error while dealing with data`, err.message);
        next(err);
    }
}

module.exports = {
    addNewComponent
}