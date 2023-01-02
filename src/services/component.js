const db = require('./db.service');
const helper = require('../utils/helper.util');
const config = require('../configs/general.config');

const addComponent = async (componentDetails) => {
    console.log(componentDetails)
    let componentSql = `INSERT INTO components  
                ( customer_id, brand_id, season_id, collection_id, created_by, notes, name, category )
            VALUES 
            (
                "${componentDetails.customer_id}", "${componentDetails.brand}", 
                "${componentDetails.season}", "${componentDetails.collection}", 
                "${componentDetails.created_by}", "${componentDetails.component_desc}", 
                "${componentDetails.component_name}", "${componentDetails.component_category}"
            )
        `;
    const nComponent = await db.query(componentSql);

    let imageSql = `INSERT INTO jc_images (table_id, image_string, image_for, created_by)
                    VALUES
                        (
                            "${nComponent.insertId}",
                            "${componentDetails.component_image}",
                            'component',
                            "${componentDetails.created_by}"
                        )
                    `;
    await db.query(imageSql);
    return nComponent.insertId;
}

module.exports = {
    addComponent
}