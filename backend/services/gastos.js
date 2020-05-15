const db = require("../config/db.config");
const actions = require("../actions/log");
const Logger = require("./logging");

class GastosService {
  constructor() {
    this.Gasto = db.gasto;
    this.Log = db.log;
    this.actions = actions;
  }

  async getGastos() {
    const gastos = await this.Gasto.findAll({
      where: { status: 1 },
    });
    return gastos || [];
  }

  async getGasto({ gastoId }) {
    const gasto = await this.Gasto.findOne({
      where: { id: gastoId },
      include: [],
    });

    return gasto || {};
  }

  async createGasto({ gasto }) {
    const createdGasto = await this.Gasto.create({ ...gasto });
    const log = Logger(
      gasto,
      createdGasto,
      this.actions.createdGasto("Nuevo registro")
    );
    if (log) console.log("Se registró en el log");
    return createdGasto;
  }

  async updateGasto({ gastoId, status }) {
    const updatedGastoId = await this.Gasto.update(
      { status },
      { where: { id: gastoId } }
    );
    const log = Logger(
      { gastoId, status },
      updatedGastoId,
      this.actions.updateStatus("Baja lógica")
    );
    if (log) console.log("Se registró en el log");
  }

  async updateGasto({ gasto }) {
    const gastoAntesDeActualizar = await this.Gasto.findOne({
      where: { id: gasto.id },
      include: [],
    });
    const updatedGastoId = await this.Gasto.update(
      {
        //nombre: gasto.nombre,
        //numero: gasto.numero,
        //email: gasto.email,
      },
      { where: { id: gasto.id } }
    );
    const log = Logger(
      gastoAntesDeActualizar,
      gasto,
      this.actions.updateGasto("Actualización")
    );
    if (log) console.log("Se registró en el log");
    return updatedGastoId;
  }

  async deleteGasto({ gastoId }) {
    const gastoAntesDeBorrar = await this.Gasto.findOne({
      where: { id: gastoId },
      include: [],
    });
    const deletedGasto = await this.Gasto.destroy({
      where: { id: gastoId },
    });
    const log = Logger(
      gastoAntesDeBorrar,
      gastoId,
      this.actions.deleteGasto("Baja permanente")
    );
    if (log) console.log("Se registró en el log");
    return deletedGasto;
  }
}

module.exports = GastosService;
