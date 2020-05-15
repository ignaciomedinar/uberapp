const db = require("../config/db.config");
const actions = require("../actions/log");
const Logger = require("./logging");

class ChoferesService {
  constructor() {
    this.Chofer = db.chofer;
    this.Log = db.log;
    this.actions = actions;
  }

  async getChoferes() {
    const choferes = await this.Chofer.findAll({
      where: { status: 1 },
    });
    return choferes || [];
  }

  async getChofer({ choferId }) {
    const chofer = await this.Chofer.findOne({
      where: { id: choferId },
      include: [],
    });

    return chofer || {};
  }

  async createChofer({ chofer }) {
    const createdChofer = await this.Chofer.create({ ...chofer });
    const log = Logger(
      chofer,
      createdChofer,
      this.actions.createdChofer("Nuevo registro")
    );
    if (log) console.log("Se registró en el log");
    return createdChofer;
  }

  async updateChofer({ choferId, status }) {
    const updatedChoferId = await this.Chofer.update(
      { status },
      { where: { id: choferId } }
    );
    const log = Logger(
      { choferId, status },
      updatedChoferId,
      this.actions.updateStatus("Baja lógica")
    );
    if (log) console.log("Se registró en el log");
  }

  async updateChofer({ chofer }) {
    const choferAntesDeActualizar = await this.Chofer.findOne({
      where: { id: chofer.id },
      include: [],
    });
    const updatedChoferId = await this.Chofer.update(
      {
        //nombre: chofer.nombre,
        //numero: chofer.numero,
        //email: chofer.email,
      },
      { where: { id: chofer.id } }
    );
    const log = Logger(
      choferAntesDeActualizar,
      chofer,
      this.actions.updateChofer("Actualización")
    );
    if (log) console.log("Se registró en el log");
    return updatedChoferId;
  }

  async deleteChofer({ choferId }) {
    const choferAntesDeBorrar = await this.Chofer.findOne({
      where: { id: choferId },
      include: [],
    });
    const deletedChofer = await this.Chofer.destroy({
      where: { id: choferId },
    });
    const log = Logger(
      choferAntesDeBorrar,
      choferId,
      this.actions.deleteChofer("Baja permanente")
    );
    if (log) console.log("Se registró en el log");
    return deletedChofer;
  }
}

module.exports = ChoferesService;
