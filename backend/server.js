const express = require("express");
const app = express();

const ingresosApi = require("./routes/ingresos");
const autosApi = require("./routes/autos")
const choferesApi = require("./routes/choferes")
const gastosApi = require("./routes/gastos")
const deudasApi = require("./routes/deudas")

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
autosApi(app);
choferesApi(app);
gastosApi(app);
deudasApi(app);

// HACER SYNC CON LA BD
const db = require("./config/db.config.js");

const Ingreso = db.ingreso;
const Log = db.log;
const Auto = db.auto;
const Chofer = db.chofer;
const Gasto = db.gasto;
const Deuda = db.deuda;


// force: true will drop the table if it already exists
db.sequelize.sync({ force: true }).then(() => {
  //  inicializar la base con algunos registros
  initialize();
  initializeChofer();
  initializeIngreso();
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
  // Auto.create({
  //   id: 0,
  //   placa: "NA",
  //   modelo: "Unassigned",
  //   color: "NA",
  //   owner: "NA",
  //   porcentaje: "0",
  //   status: 1,
  // }); 
}

function initializeChofer() {
  Chofer.create({
    nombre: "Nacho",
    celular: "1234567890",
    email: "nacho@medina.com",
    clabe: "123456789012345678",
    status: 1,
  });
  Chofer.create({
    nombre: "Manuel",
    celular: "9876543210",
    email: "manuel@comi.com",
    clabe: "123456789012345678",
    status: 1,
  });
}

function initializeIngreso() {
  Ingreso.create({
    semana: 1,
    chofer: "Manuel",
    auto: "333AAA",
    fecha: 19,
    uber: 1500,
    didi: 1700,
    renta: 2100,
    paraChofer: 1500+1700-2100,
    owner: "Juan",
    utilidad: 2100
  });
}