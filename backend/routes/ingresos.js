const express = require("express");
const IngresosService = require("../services/ingresos");

function ingresosApi(app) {
  const router = express.Router();
  app.use("/api/ingresos", router);

  const ingresosService = new IngresosService();

  router.get("/", async function(req, res, next) {
    try {
      const ingresos = await ingresosService.getIngresos();

      res.status(200).json({
        data: ingresos,
        message: "lista de ingresos devuelta"
      });
    } catch (err) {
      next(err);
    }
  });

  router.get("/:ingresoId", async function(req, res, next) {
    
    const { ingresoId } = req.params;
    try {
      const ingreso = await ingresosService.getIngreso({ ingresoId });

      res.status(200).json({
        data: ingreso,
        message: "ingreso encontrado"
      });
    } catch (err) {
      next(err);
    }
  });

  // Nuevo registro
  router.post("/", async function(req, res, next) {
    const { body: ingreso } = req;
    console.log(ingreso);
    try {
      const createdIngresoId = await ingresosService.createIngreso({
        ingreso
      });

      res.status(200).json({
        data: createdIngresoId,
        message: "ingreso creado"
      });
    } catch (err) {
      next(err);
    }
  });

  // Editar status
  router.put("/:ingresoId", async function(req, res, next) {
    const { ingresoId } = req.params;
    const status = 0
    try {
      const updatedIngresoId = await ingresosService.updateStatus({
        ingresoId,
        status
      });

      res.status(200).json({
        data: updatedIngresoId,
        message: "ingreso actualizado"
      });
    } catch (err) {
      next(err);
    }
  });

  // Editar información
  router.put("/", async function(req, res, next) {
    const { body: ingreso } = req;
    try {
      const updatedIngreso = await ingresosService.updateIngreso({
        ingreso
      });

      res.status(200).json({
        data: updatedIngreso,
        message: "data ingreso actualizado"
      });
    } catch (err) {
      next(err);
    }
  });

  //Borrar registro
  router.delete("/:ingresoId", async function(req, res, next) {
    console.log(req.params);
    const { ingresoId } = req.params;
    try {
      const deletedIngresoId = await ingresosService.deleteIngreso({
        ingresoId
      });

      res.status(200).json({
        data: deletedIngresoId,
        message: "ingreso actualizado"
      });
    } catch (err) {
      next(err);
    }
  });
}

/**/
module.exports = ingresosApi;
