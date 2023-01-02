const auth_service = require('../services/authenticate');

async function loginUser(req, res, next) {

    try {
        res.json(await auth_service.login(req.body.u, req.body.p));
    } catch (err) {
        console.error(`Error while authenticating`, err.message);
        next(err);
    }
}


module.exports = {
    loginUser
}