const express = require("express");
const ChoferesService = require("../services/choferes");

function choferesApi(app) {
  const router = express.Router();
  app.use("/api/choferes", router);

  const choferesService = new ChoferesService();

  router.get("/", async function(req, res, next) {
    try {
      const choferes = await choferesService.getChoferes();

      res.status(200).json({
        data: choferes,
        message: "lista de choferes devuelta"
      });
    } catch (err) {
      next(err);
    }
  });

  router.get("/:choferId", async function(req, res, next) {
    
    const { choferId } = req.params;
    try {
      const chofer = await choferesService.getAuto({ choferId });

      res.status(200).json({
        data: chofer,
        message: "chofer encontrado"
      });
    } catch (err) {
      next(err);
    }
  });

  // Nuevo registro
  router.post("/", async function(req, res, next) {
    const { body: chofer } = req;
    console.log(chofer);
    try {
      const createdAutoId = await choferesService.createAuto({
        chofer
      });

      res.status(200).json({
        data: createdAutoId,
        message: "chofer creado"
      });
    } catch (err) {
      next(err);
    }
  });

  // Editar status
  router.put("/:choferId", async function(req, res, next) {
    const { choferId } = req.params;
    const status = 0
    try {
      const updatedAutoId = await choferesService.updateStatus({
        choferId,
        status
      });

      res.status(200).json({
        data: updatedAutoId,
        message: "chofer actualizado"
      });
    } catch (err) {
      next(err);
    }
  });

  // Editar información
  router.put("/", async function(req, res, next) {
    const { body: chofer } = req;
    try {
      const updatedAuto = await choferesService.updateAuto({
        chofer
      });

      res.status(200).json({
        data: updatedAuto,
        message: "data chofer actualizado"
      });
    } catch (err) {
      next(err);
    }
  });

  //Borrar registro
  router.delete("/:choferId", async function(req, res, next) {
    console.log(req.params);
    const { choferId } = req.params;
    try {
      const deletedAutoId = await choferesService.deleteAuto({
        choferId
      });

      res.status(200).json({
        data: deletedAutoId,
        message: "chofer actualizado"
      });
    } catch (err) {
      next(err);
    }
  });
}

/**/
module.exports = choferesApi;
