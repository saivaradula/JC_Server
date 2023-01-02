const env = process.env;
const fs = require('fs');
const db = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'just_casting',
    port: 3306
};

const jcServer = {
    host: 'localhost',
    user: 'justcasting',
    password: 'ci573G~a0',
    database: 'admin_',
    port: 3306
};


module.exports = db;
// module.exports = jcServer;