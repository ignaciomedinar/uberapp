const express = require("express");
const DeudasService = require("../services/deudas");

function deudasApi(app) {
  const router = express.Router();
  app.use("/api/deudas", router);

  const deudasService = new DeudasService();

  router.get("/", async function(req, res, next) {
    try {
      const deudas = await deudasService.getDeudas();

      res.status(200).json({
        data: deudas,
        message: "lista de deudas devuelta"
      });
    } catch (err) {
      next(err);
    }
  });

  router.get("/:deudaId", async function(req, res, next) {
    
    const { deudaId } = req.params;
    try {
      const deuda = await deudasService.getDeuda({ deudaId });

      res.status(200).json({
        data: deuda,
        message: "deuda encontrado"
      });
    } catch (err) {
      next(err);
    }
  });

  // Nuevo registro
  router.post("/", async function(req, res, next) {
    const { body: deuda } = req;
    console.log(deuda);
    try {
      const createdDeudaId = await deudasService.createDeuda({
        deuda
      });

      res.status(200).json({
        data: createdDeudaId,
        message: "deuda creado"
      });
    } catch (err) {
      next(err);
    }
  });

  // Editar status
  router.put("/:deudaId", async function(req, res, next) {
    const { deudaId } = req.params;
    const status = 0
    try {
      const updatedDeudaId = await deudasService.updateStatus({
        deudaId,
        status
      });

      res.status(200).json({
        data: updatedDeudaId,
        message: "deuda actualizado"
      });
    } catch (err) {
      next(err);
    }
  });

  // Editar información
  router.put("/", async function(req, res, next) {
    const { body: deuda } = req;
    try {
      const updatedDeuda = await deudasService.updateDeuda({
        deuda
      });

      res.status(200).json({
        data: updatedDeuda,
        message: "data deuda actualizado"
      });
    } catch (err) {
      next(err);
    }
  });

  //Borrar registro
  router.delete("/:deudaId", async function(req, res, next) {
    console.log(req.params);
    const { deudaId } = req.params;
    try {
      const deletedDeudaId = await deudasService.deleteDeuda({
        deudaId
      });

      res.status(200).json({
        data: deletedDeudaId,
        message: "deuda actualizado"
      });
    } catch (err) {
      next(err);
    }
  });
}

/**/
module.exports = deudasApi;
