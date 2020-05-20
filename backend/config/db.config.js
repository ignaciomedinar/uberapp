const env = require("./env.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  port: env.port,
  dialect: env.dialect,
  operatorsAliases: false,
  define: {
    timestamps: false,
  },
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.chofer = require("../models/choferes.js")(sequelize, Sequelize);
db.auto = require("../models/autos.js")(sequelize, Sequelize);
db.gasto = require("../models/gastos.js")(sequelize, Sequelize);
db.ingreso = require("../models/ingresos.js")(sequelize, Sequelize);
db.deuda = require("../models/deudas.js")(sequelize, Sequelize);
db.log = require("../models/log.js")(sequelize, Sequelize);

//Relations

db.chofer.belongsTo(db.auto, { foreignKey: "id_auto" });
db.deuda.belongsTo(db.chofer, { foreignKey: "id_chofer" });

db.chofer.hasMany(db.ingreso, { foreignKey: "id_chofer" });
db.gasto.hasMany(db.ingreso, { foreignKey: "id_gasto" });

module.exports = db;
