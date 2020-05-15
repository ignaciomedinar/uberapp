const express = require("express");
const GastosService = require("../services/gastos");

function gastosApi(app) {
  const router = express.Router();
  app.use("/api/gastos", router);

  const gastosService = new GastosService();

  router.get("/", async function(req, res, next) {
    try {
      const gastos = await gastosService.getGastos();

      res.status(200).json({
        data: gastos,
        message: "lista de gastos devuelta"
      });
    } catch (err) {
      next(err);
    }
  });

  router.get("/:gastoId", async function(req, res, next) {
    
    const { gastoId } = req.params;
    try {
      const gasto = await gastosService.getGasto({ gastoId });

      res.status(200).json({
        data: gasto,
        message: "gasto encontrado"
      });
    } catch (err) {
      next(err);
    }
  });

  // Nuevo registro
  router.post("/", async function(req, res, next) {
    const { body: gasto } = req;
    console.log(gasto);
    try {
      const createdGastoId = await gastosService.createGasto({
        gasto
      });

      res.status(200).json({
        data: createdGastoId,
        message: "gasto creado"
      });
    } catch (err) {
      next(err);
    }
  });

  // Editar status
  router.put("/:gastoId", async function(req, res, next) {
    const { gastoId } = req.params;
    const status = 0
    try {
      const updatedGastoId = await gastosService.updateStatus({
        gastoId,
        status
      });

      res.status(200).json({
        data: updatedGastoId,
        message: "gasto actualizado"
      });
    } catch (err) {
      next(err);
    }
  });

  // Editar información
  router.put("/", async function(req, res, next) {
    const { body: gasto } = req;
    try {
      const updatedGasto = await gastosService.updateGasto({
        gasto
      });

      res.status(200).json({
        data: updatedGasto,
        message: "data gasto actualizado"
      });
    } catch (err) {
      next(err);
    }
  });

  //Borrar registro
  router.delete("/:gastoId", async function(req, res, next) {
    console.log(req.params);
    const { gastoId } = req.params;
    try {
      const deletedGastoId = await gastosService.deleteGasto({
        gastoId
      });

      res.status(200).json({
        data: deletedGastoId,
        message: "gasto actualizado"
      });
    } catch (err) {
      next(err);
    }
  });
}

/**/
module.exports = gastosApi;
