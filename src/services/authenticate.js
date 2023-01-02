const db = require('./db.service');
const helper = require('../utils/helper.util');
const config = require('../configs/general.config');
var md5 = require('md5');

async function login(username, password) {
    password = md5(password);
    const rows = await db.query(
        `SELECT U.id, U.name, U.user_role, U.nickname, C.login_name, 
            U.contact_phone_primary, U.contact_phone_secondary,
            U.contact_email, U.contact_address, U.created_by, U.created_on,
            U.profile_image
         FROM users U, user_credentials C 
            WHERE 
                U.id = C.user_id
                AND C.login_name = ? 
                AND C.password = ? 
                AND U.is_active = ${true} 
                AND C.is_active = ${true}`,
        [username, password]
    );
    const data = helper.emptyOrRows(rows);

    return {
        data
    }
}

module.exports = {
    login
}