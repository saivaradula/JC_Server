const customers_service = require('../services/customers');

const addCustomer = async (req, res) => {
    let d = new Date();
    try {
        // let custId = Math.floor(100000 + Math.random() * d.getDate() + d.getHours() + d.getMilliseconds())
        res.json(await customers_service.addCustomer(req.body)).status(200)
    } catch (err) {
        console.error(`Error while authenticating`, err.message);
        next(err);
    }
}

const getCustomers = async (req, res, next) => {
    try {
        res.json(await customers_service.getCustomers()).status(200)
    } catch (err) {
        console.error(`Error while authenticating`, err.message);
        next(err);
    }
}

const getCustomerBrands = async (req, res, next) => {
    try {
        res.json(await customers_service.getCustomerBrands(req.params.id)).status(200)
    } catch (err) {
        console.error(`Error while dealing with data`, err.message);
        next(err);
    }
}

const getCustomerSeason = async (req, res, next) => {
    try {
        res.json(
            await
                customers_service.getCustomerSeason(req.params.id, req.params.bid))
            .status(200)
    } catch (err) {
        console.error(`Error while dealing with data`, err.message);
        next(err);
    }
}

const getCustomerCollection = async (req, res, next) => {
    try {
        res.json(
            await
                customers_service.getCustomerCollection(req.params.id, req.params.bid, req.params.sid))
            .status(200)
    } catch (err) {
        console.error(`Error while dealing with data`, err.message);
        next(err);
    }
}

const getCustomerProducts = async (req, res, next) => {
    try {
        res.json(
            await
                customers_service.getCustomerProducts
                    (
                        req.params.id,
                        req.params.bid,
                        req.params.sid,
                        req.params.cid,
                        req.params.mid,
                        req.params.ccid
                    )
        ).status(200)
    } catch (err) {
        console.error(`Error while dealing with data`, err.message);
        next(err);
    }
}

const getCustomerMoulds = async (req, res, next) => {
    try {
        res.json(
            await
                customers_service.getCustomerMoulds
                    (
                        req.params.id,
                        req.params.bid,
                        req.params.sid,
                        req.params.cid
                    )
        ).status(200)
    } catch (err) {
        console.error(`Error while dealing with data`, err.message);
        next(err);
    }
}

const getCustomerComponents = async (req, res, next) => {
    try {
        res.json(
            await
                customers_service.getCustomerComponents
                    (
                        req.params.id,
                        req.params.bid,
                        req.params.sid,
                        req.params.cid
                    )
        ).status(200)
    } catch (err) {
        console.error(`Error while dealing with data`, err.message);
        next(err);
    }
}

module.exports = {
    addCustomer,
    getCustomers,
    getCustomerBrands,
    getCustomerSeason,
    getCustomerCollection,
    getCustomerProducts,
    getCustomerMoulds,
    getCustomerComponents
}