const db = require('./db.service');
const helper = require('../utils/helper.util');
const config = require('../configs/general.config');

const addMould = async (mouldDetails) => {
    let mould = `INSERT INTO moulds  
                ( customer_id, brand_id, season_id, collection_id, created_by, notes, name )
            VALUES 
            (
                "${mouldDetails.customer_id}", "${mouldDetails.brand}", "${mouldDetails.season}",
                "${mouldDetails.collection}", "${mouldDetails.created_by}",
                "${mouldDetails.mould_notes}", "${mouldDetails.mould_name}"
            )
        `;
    const nMould = await db.query(mould);
    return nMould.insertId;
}

module.exports = {
    addMould
}