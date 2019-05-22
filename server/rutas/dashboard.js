const express = require('express');
const app = express();
const Connection = require('tedious').Connection;
const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES;
const config = require('../config/config');


const connection = new Connection(config.configTedious);


app.get('/sp1076', (req, res) => {
    let ini = new Date(2019, 0, 1);
    let ter = new Date(2019, 0, 05);

    connection.on('connect', function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('Connected');
        }
    });
    
/*     connection.on('connect', function(err) {
        if (err) {
            console.log(err);
        }

        let request = new Request('SP_1076_GNTM', function(err) {
            if (err) {
              console.log(err);
            }
        });
      
        request.addOutputParameter('NombreTabla', TYPES.NVarChar(50));
        request.addParameter('fecini', TYPES.SmallDateTime, ini);
        request.addParameter('fecter', TYPES.SmallDateTime, ter);
        request.addParameter('codven', TYPES.SmallInt, '0');
        request.addParameter('codloc', TYPES.SmallInt, '0');
      
        request.on('returnValue', function(paramName, value, metadata) {
            console.log('hola', value);
            res.json({
                ok: true,
                paramName,
                value,
                metadata
            });
            
        });
      
        connection.callProcedure(request);
    }); */

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

let tablaOutputSp = recordsets.output.NombreTabla.split('.')[1].slice(1, -1); */


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
