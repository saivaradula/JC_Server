const db = require('./db.service');
const helper = require('../utils/helper.util');
const config = require('../configs/general.config');
var md5 = require('md5');

const update = async (user) => {
    try {
        await db.query(
            `UPDATE users SET 
                name = "${user.name}",
                nickname = "${user.nickname}",
                contact_phone_primary = "${user.contact_phone_primary}",
                contact_phone_secondary = "${user.contact_phone_secondary}",
                contact_email = "${user.contact_email}",
                contact_address = "${user.contact_address}",
                profile_image = "${user.profile_image}"
            WHERE 
                id = ?`,
            [user.id]
        );
        return {
            data
        }
    } catch (error) {
        return { error };
    }
}

const addUser = async (user) => {
    try {
        let sql = `INSERT INTO users (
            name, nickname, contact_phone_primary,user_role,
            contact_phone_secondary, contact_email, contact_address, profile_image, created_by
        )
        VALUES 
        (
            "${user.name}",
            "${user.nickname}",
            "${user.contact_phone_primary}",
            "${user.user_role}",
            "${user.contact_phone_secondary}",
            "${user.contact_email}",
            "${user.contact_address}",
            "${user.profile_image}", ${user.created_by}
        )`;
        const nUser = await db.query(sql);

        let creds = `INSERT INTO user_credentials ( 
                user_id, login_name, password, created_by
            )
            VALUES 
            (
                "${nUser.insertId}",
                "${user.login_name}",
                "${md5('password')}",
                ${user.created_by}
            )`;
        await db.query(creds);
        return {
            data
        }
    } catch (error) {
        return { error };
    }
}

const userList = async () => {
    const sql = `
        SELECT U.*, C.* 
        FROM users U, user_credentials C 
        WHERE
            u.id = c.user_id AND
            u.is_active = 1 AND
            c.is_active = 1`

    let rows = await db.query(sql);
    const data = helper.emptyOrRows(rows);
    return {
        data
    }
}

module.exports = {
    update, addUser, userList
}