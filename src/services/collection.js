const db = require('./db.service');
const helper = require('../utils/helper.util');
const config = require('../configs/general.config');


const addCollection = async (collectionDetails) => {

    let collection = `INSERT INTO collections 
                ( customer_id, brand_id, season_id, created_by, notes, name )
            VALUES 
            (
                "${collectionDetails.customer_id}", "${collectionDetails.brand}", 
                "${collectionDetails.season}", "${collectionDetails.created_by}",
                "${collectionDetails.collection_notes}", 
                "${collectionDetails.collection_name}"
            )
        `;
    const nCollection = await db.query(collection);
    return nCollection.insertId;
}

module.exports = {
    addCollection
}