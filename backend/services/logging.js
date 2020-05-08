const db = require("../config/db.config");

const Logger = (receivedData = {}, processedData = {}, action) => {
  console.log(
    "Recibido:" + receivedData,
    "Procesado:" + processedData,
    "Accion:" + action
  );
  switch (action.type) {
    case "CREATE_INGRESO":
      db.log.create({
        id_ingreso: processedData.id,
        accion: action.text,
        registro_antes: "N/A",
        registro_despues: JSON.stringify(processedData),
      });
      return true;
    case "UPDATE_INGRESO":
      db.log.create({
        id_ingreso: receivedData.id,
        accion: action.text,
        registro_antes: JSON.stringify(receivedData),
        registro_despues: JSON.stringify(processedData),
      });
      return true;
    case "UPDATE_STATUS":
      db.log.create({
        id_ingreso: receivedData.ingresoId,
        accion: action.text,
        registro_antes: JSON.stringify(receivedData),
        registro_despues: `Se eliminó lógicamente registro con id: ${processedData}`,
      });
      return true;
    case "DETELE_INGRESO":
      db.log.create({
        id_ingreso: receivedData.id,
        accion: action.text,
        registro_antes: JSON.stringify(receivedData),
        registro_despues: `Se eliminó lógicamente registro con id: ${receivedData.id}`,
      });
      return true;
    default:
      return state;
  }
};

module.exports = Logger;
