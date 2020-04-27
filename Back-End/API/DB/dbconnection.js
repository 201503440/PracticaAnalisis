// ========================================= CONFIGURACIÓN MYSQL =========================================
var mysql = require('mysql');
var dbconfig = require('./dbconfig.js');

var connection = mysql.createConnection({
    host: dbconfig.host,
    user: dbconfig.user,
    password: dbconfig.password,
    database: dbconfig.database
});
// ======================================= FIN CONFIGURACIÓN MYSQL =======================================

exports.config = function () {
    return connection;
}