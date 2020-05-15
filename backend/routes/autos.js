const express = require("express");
const AutosService = require("../services/autos");

function autosApi(app) {
  const router = express.Router();
  app.use("/api/autos", router);

  const autosService = new AutosService();

  router.get("/", async function(req, res, next) {
    try {
      const autos = await autosService.getAutos();

      res.status(200).json({
        data: autos,
        message: "lista de autos devuelta"
      });
    } catch (err) {
      next(err);
    }
  });

  router.get("/:autoId", async function(req, res, next) {
    
    const { autoId } = req.params;
    try {
      const auto = await autosService.getAuto({ autoId });

      res.status(200).json({
        data: auto,
        message: "auto encontrado"
      });
    } catch (err) {
      next(err);
    }
  });

  // Nuevo registro
  router.post("/", async function(req, res, next) {
    const { body: auto } = req;
    console.log(auto);
    try {
      const createdAutoId = await autosService.createAuto({
        auto
      });

      res.status(200).json({
        data: createdAutoId,
        message: "auto creado"
      });
    } catch (err) {
      next(err);
    }
  });

  // Editar status
  router.put("/:autoId", async function(req, res, next) {
    const { autoId } = req.params;
    const status = 0
    try {
      const updatedAutoId = await autosService.updateStatus({
        autoId,
        status
      });

      res.status(200).json({
        data: updatedAutoId,
        message: "auto actualizado"
      });
    } catch (err) {
      next(err);
    }
  });

  // Editar información
  router.put("/", async function(req, res, next) {
    const { body: auto } = req;
    try {
      const updatedAuto = await autosService.updateAuto({
        auto
      });

      res.status(200).json({
        data: updatedAuto,
        message: "data auto actualizado"
      });
    } catch (err) {
      next(err);
    }
  });

  //Borrar registro
  router.delete("/:autoId", async function(req, res, next) {
    console.log(req.params);
    const { autoId } = req.params;
    try {
      const deletedAutoId = await autosService.deleteAuto({
        autoId
      });

      res.status(200).json({
        data: deletedAutoId,
        message: "auto actualizado"
      });
    } catch (err) {
      next(err);
    }
  });
}

/**/
module.exports = autosApi;
