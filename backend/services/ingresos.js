const db = require("../config/db.config");
const actions = require("../actions/log");
const Logger = require("./logging");

class IngresosService {
  constructor() {
    this.Ingreso = db.ingreso;
    this.Log = db.log;
    this.actions = actions;
  }

  async getIngresos(mes) {
    const ingresos = await this.Ingreso.findAll();
    return ingresos || [];
  }

  async getIngreso({ ingresoId }) {
    const ingreso = await this.Ingreso.findOne({
      where: { id: ingresoId },
      include: [],
    });

    return ingreso || {};
  }

  async createIngreso({ ingreso }) {
    const createdIngreso = await this.Ingreso.create({ ...ingreso });
    const log = Logger(
      ingreso,
      createdIngreso,
      this.actions.createdIngreso("Nuevo registro")
    );
    if (log) console.log("Se registró en el log");
    return createdIngreso;
  }

  async updateIngreso({ ingresoId, status }) {
    const updatedIngresoId = await this.Ingreso.update(
      { status },
      { where: { id: ingresoId } }
    );
    const log = Logger(
      { ingresoId, status },
      updatedIngresoId,
      this.actions.updateStatus("Baja lógica")
    );
    if (log) console.log("Se registró en el log");
  }

  async updateIngreso({ ingreso }) {
    const ingresoAntesDeActualizar = await this.Ingreso.findOne({
      where: { id: ingreso.id },
      include: [],
    });
    const updatedIngresoId = await this.Ingreso.update(
      {
        //nombre: ingreso.nombre,
        //numero: ingreso.numero,
        //email: ingreso.email,
      },
      { where: { id: ingreso.id } }
    );
    const log = Logger(
      ingresoAntesDeActualizar,
      ingreso,
      this.actions.updateIngreso("Actualización")
    );
    if (log) console.log("Se registró en el log");
    return updatedIngresoId;
  }

  async deleteIngreso({ ingresoId }) {
    const ingresoAntesDeBorrar = await this.Ingreso.findOne({
      where: { id: ingresoId },
      include: [],
    });
    const deletedIngreso = await this.Ingreso.destroy({
      where: { id: ingresoId },
    });
    const log = Logger(
      ingresoAntesDeBorrar,
      ingresoId,
      this.actions.deleteIngreso("Baja permanente")
    );
    if (log) console.log("Se registró en el log");
    return deletedIngreso;
  }
}

module.exports = IngresosService;
