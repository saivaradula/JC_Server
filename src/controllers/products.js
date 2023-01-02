const product_service = require('../services/products');
const formidable = require('formidable');

const addProducts = async (req, res, next) => {
    try {
        const form = formidable({ multiples: true, uploadDir: __dirname });
        form.parse(req, (err, fields, files) => {
            console.log('fields:', fields);
            console.log('files:', files);
        });
        // console.log(req)
        // res.json(await product_service.addProduct(req.body)).status(200)
    } catch (err) {
        console.error(`Error while dealing with data`, err.message);
        next(err);
    }
}

module.exports = {
    addProducts
}
