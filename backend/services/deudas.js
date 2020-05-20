const db = require("../config/db.config");
const actions = require("../actions/log");
const Logger = require("./logging");

class DeudasService {
  constructor() {
    this.Deuda = db.deuda;
    this.Log = db.log;
    this.actions = actions;
  }

  async getDeudas() {
    const deudas = await this.Deuda.findAll({
      where: { status: 1 },
    });
    return deudas || [];
  }

  async getDeuda({ deudaId }) {
    const deuda = await this.Deuda.findOne({
      where: { id: deudaId },
      include: [],
    });

    return deuda || {};
  }

  async createDeuda({ deuda }) {
    const createdDeuda = await this.Deuda.create({ ...deuda });
    const log = Logger(
      deuda,
      createdDeuda,
      this.actions.createdDeuda("Nuevo registro")
    );
    if (log) console.log("Se registró en el log");
    return createdDeuda;
  }

  async updateDeuda({ deudaId, status }) {
    const updatedDeudaId = await this.Deuda.update(
      { status },
      { where: { id: deudaId } }
    );
    const log = Logger(
      { deudaId, status },
      updatedDeudaId,
      this.actions.updateStatus("Baja lógica")
    );
    if (log) console.log("Se registró en el log");
  }

  async updateDeuda({ deuda }) {
    const deudaAntesDeActualizar = await this.Deuda.findOne({
      where: { id: deuda.id },
      include: [],
    });
    const updatedDeudaId = await this.Deuda.update(
      {
        //nombre: deuda.nombre,
        //numero: deuda.numero,
        //email: deuda.email,
      },
      { where: { id: deuda.id } }
    );
    const log = Logger(
      deudaAntesDeActualizar,
      deuda,
      this.actions.updateDeuda("Actualización")
    );
    if (log) console.log("Se registró en el log");
    return updatedDeudaId;
  }

  async deleteDeuda({ deudaId }) {
    const deudaAntesDeBorrar = await this.Deuda.findOne({
      where: { id: deudaId },
      include: [],
    });
    const deletedDeuda = await this.Deuda.destroy({
      where: { id: deudaId },
    });
    const log = Logger(
      deudaAntesDeBorrar,
      deudaId,
      this.actions.deleteDeuda("Baja permanente")
    );
    if (log) console.log("Se registró en el log");
    return deletedDeuda;
  }
}

module.exports = DeudasService;
