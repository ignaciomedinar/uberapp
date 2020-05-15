const db = require("../config/db.config");
const actions = require("../actions/log");
const Logger = require("./logging");

class AutosService {
  constructor() {
    this.Auto = db.auto;
    this.Log = db.log;
    this.actions = actions;
  }

  async getAutos() {
    const autos = await this.Auto.findAll({
      where: { status: 1 },
    });
    return autos || [];
  }

  async getAuto({ autoId }) {
    const auto = await this.Auto.findOne({
      where: { id: autoId },
      include: [],
    });

    return auto || {};
  }

  async createAuto({ auto }) {
    const createdAuto = await this.Auto.create({ ...auto });
    const log = Logger(
      auto,
      createdAuto,
      this.actions.createdAuto("Nuevo registro")
    );
    if (log) console.log("Se registró en el log");
    return createdAuto;
  }

  async updateAuto({ autoId, status }) {
    const updatedAutoId = await this.Auto.update(
      { status },
      { where: { id: autoId } }
    );
    const log = Logger(
      { autoId, status },
      updatedAutoId,
      this.actions.updateStatus("Baja lógica")
    );
    if (log) console.log("Se registró en el log");
  }

  async updateAuto({ auto }) {
    const autoAntesDeActualizar = await this.Auto.findOne({
      where: { id: auto.id },
      include: [],
    });
    const updatedAutoId = await this.Auto.update(
      {
        //nombre: auto.nombre,
        //numero: auto.numero,
        //email: auto.email,
      },
      { where: { id: auto.id } }
    );
    const log = Logger(
      autoAntesDeActualizar,
      auto,
      this.actions.updateAuto("Actualización")
    );
    if (log) console.log("Se registró en el log");
    return updatedAutoId;
  }

  async deleteAuto({ autoId }) {
    const autoAntesDeBorrar = await this.Auto.findOne({
      where: { id: autoId },
      include: [],
    });
    const deletedAuto = await this.Auto.destroy({
      where: { id: autoId },
    });
    const log = Logger(
      autoAntesDeBorrar,
      autoId,
      this.actions.deleteAuto("Baja permanente")
    );
    if (log) console.log("Se registró en el log");
    return deletedAuto;
  }
}

module.exports = AutosService;
