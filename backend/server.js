const express = require("express");
const app = express();

const ingresosApi = require("./routes/ingresos");

app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-type,Accept,access-token,X-Key"
  );
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// routes
ingresosApi(app);

// HACER SYNC CON LA BD
const db = require("./config/db.config.js");

const Ingreso = db.ingreso;
const Log = db.log;
const Auto = db.auto;

// force: true will drop the table if it already exists
db.sequelize.sync({ force: false }).then(() => {
  //  inicializar la base con algunos registros
  initialize();
});

// Create a Server
var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("App listening at http://%s:%s", host, port);
});

function initialize() {
  Auto.create({
    placa: "333AAA",
    modelo: "2019",
    color: "Blanco",
    owner: "Manuel",
    porcentaje: "10",
    status: 1,
  });
  Auto.create({
    placa: "111CAA",
    modelo: "2017",
    color: "Negro",
    owner: "Jorge",
    porcentaje: "15",
    status: 1,
  });
}
