require('rootpath')();
const express = require('express');
var session = require('express-session');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('_middleware/error-handler');

app.set("trust proxy", 1);

app.use(
    session({
        secret: 'backend-grandcar',
        resave: false,
        saveUninitialized: true,
    })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// allow cors requests from any origin and with credentials
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));


// api routes
// app.use('/vehiculos', require('./vehiculos/vehiculos.controller'));
app.use('/accounts', require('./accounts/accounts.controller'));
// app.use('/domicilios', require('./domicilio/domicilio.controller'));
// app.use('/arriendos', require('./arriendos/arriendos.controller'));
// app.use('/transbank', require('./transbank/webpay_plus_controller'));
// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 8080) : 8080;
app.listen(port, () => console.log('Server listening on port ' + port));


// const express = require('express');
// const cors = require("cors");
// const bodyParser = require('body-parser');
// const config = require('./config.json');
// const mysql = require('mysql2');
// const db = require('./db');

// const { host, port, user, password, database } = config.database;

// var connection;

// function handleDisconnect() {
//     connection = mysql.createConnection({ host, port, user, password, database }); // Recreate the connection, since
//                                                     // the old one cannot be reused.
//     connection.connect(function(err) {              // The server is either down
//       if(err) {                                     // or restarting (takes a while sometimes).
//         console.log('error when connecting to db:', err);
//         setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
//       }                                     // to avoid a hot loop, and to allow our node script to
//     });                                     // process asynchronous requests in the meantime.
//                                             // If you're also serving http, display a 503 error.
//     connection.on('error', function(err) {
//       console.log('db error', err);
//       if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
//         handleDisconnect();                         // lost due to either server restart, or a
//       } else {                                      // connnection idle timeout (the wait_timeout
//         throw err;                                  // server variable configures this)
//       }
//     });

// }

// handleDisconnect();

// // Creamos el servidor
// const app = express();

// // Conectamos a la BD
// app.use(cors())
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.listen(3000, () => {
//     console.log('El servidor esta corriendo perfectamente')
// })

// app.get('/vehiculos', (req, res) => {
//     let sql = 'SELECT * FROM `VEHICULO`';
//     connection.query(sql, (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });


