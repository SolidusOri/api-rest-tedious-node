const express = require('express');
const app = express();
const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES;
const db = require('../db/db');



app.get('/sp1076', (req, res) => {

    res.set('Content-Type', 'application/json');

    let ini = new Date(2019, 0, 1);
    let ter = new Date(2019, 0, 05);

    let request = new Request('SP_1076_GNTM', function(err) {
        if (err) {
            console.log(err);
        }
    });

    request.addOutputParameter('NombreTabla', TYPES.NVarChar);
    request.addParameter('fecini', TYPES.SmallDateTime, ini);
    request.addParameter('fecter', TYPES.SmallDateTime, ter);
    request.addParameter('codven', TYPES.SmallInt, '0');
    request.addParameter('codloc', TYPES.SmallInt, '0');


    request.on('returnValue', function(paramName, value, metadata) {

        let tablaOutputSp = value.split('.')[1].slice(1, -1);

        let requestTabla = new Request('SELECT * FROM ' + tablaOutputSp, function(err, rowCount) {
            if (err) {
                console.log(err);
            }
        });

        let result = "";
        requestTabla.on('done', function(rowCount, more, rows) {
            /* columns.forEach(function(column) {
                if (column.value === null) {
                    console.log('NULL');
                } else {
                    result += column.value + " ";
                }
            }); */
            res.json({
                ok: true,
                tablaOutputSp,
                rowCount,
                more,
                rows
            });
            result = "";
        });

        db.executeSQL(requestTabla);
    });

    db.executeSQL(request);
});



/* if (err) {
    return res.json({
        ok: false,
        error: {
            mensaje: 'Error al ejecutar sp',
            err
        }
    })
}

if (recordsets.rowsAffected.length === 0) {
    return res.json({
        ok: false,
        mensaje: 'No hay informacion para la consulta'
    });
}


/* prueba */
app.get('/prueba/:msj', (req, res) => {

    /* el encabezado de la respuesta la configura de forma automatica segun el contenido que enviamos , para configurarlo de forma manual esta el metodo set()*/
    //res.set('Content-Type', 'text/html');

    //parametro obligatorio
    mensaje = req.params.msj;
    res.json({
        nombre: 'Robinson',
        edad: 30,
        sexo: 'H',
        mensaje,
        direccion: {
            calle: 'Villanova',
            numero: 1587,
            comuna: {
                codigo: 45,
                nombre: 'Cerro Navia'
            },
            ciudad: 'Santiago',
            pais: 'Chile'
        }
    });

    //el metodo end lo podemos usar para finalizar la respuesta seria util tambien en un 40, tanto send como json terminan la respuesta automaticamente
    //res.status(404).end();
    //res.end();
});






module.exports = app;