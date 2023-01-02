const user_service = require('../services/users');

async function updateUser(req, res, next) {
    try {
        await user_service.update(req.body);
        res.json(true).status(200)
    } catch (err) {
        res.json(false).status(500)
        console.error(`Error while working with database.`, err.message);
        next(err);
    }
}

async function addUser(req, res, next) {
    try {
        await user_service.addUser(req.body);
        res.json(true).status(200)
    } catch (err) {
        res.json(false).status(500)
        console.error(`Error while working with database.`, err.message);
        next(err);
    }
}

async function userList(req, res, next) {
    try {
        res.json(await user_service.userList());
    } catch (err) {
        res.json(false).status(500)
        console.error(`Error while working with database.`, err.message);
        next(err);
    }
}

module.exports = {
    updateUser, addUser, userList
}