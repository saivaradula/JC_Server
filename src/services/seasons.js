const db = require('./db.service');
const helper = require('../utils/helper.util');
const config = require('../configs/general.config');

const table = 'seasons'

const addSeason = async (seasonDetails) => {
    console.log(seasonDetails)
    try {
        let season = `INSERT INTO seasons ( customer_id, brand_id, created_by, notes, name )
        VALUES 
        (
            "${seasonDetails.customer_id}", "${seasonDetails.brand}", 
            "${seasonDetails.created_by}",
            "${seasonDetails.season_notes}", "${seasonDetails.season_name}"
        )
    `
        const nSeason = await db.query(season);
        return nSeason.insertId;
    } catch (err) {
        return err;
    }

}

module.exports = {
    addSeason
}