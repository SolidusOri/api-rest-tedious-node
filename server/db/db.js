//================================================
//  Archivo Manejador de las conexiones a la base
//================================================
const Connection = require('tedious').Connection;
const config = require('../config/config');


exports.executeSQL = function(request) {

    let conn = new Connection(config.configTedious);

    conn.on('connect', function(err) {
        if (err) {
            console.log(err);
        } else {

            if (request.parameters.length > 0) {
                conn.callProcedure(request);
            } else {
                conn.execSql(request);
            }
        }
    });
};