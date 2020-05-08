// CONSTANTES
const CREATE_INGRESO = "CREATE_INGRESO";
const UPDATE_INGRESO = "UPDATE_INGRESO";
const UPDATE_STATUS = "UPDATE_STATUS";
const DETELE_INGRESO = "DETELE_INGRESO";

// CREAR ACCIONES
const actions = {
  createIngreso: (text) => ({
    type: CREATE_INGRESO,
    text,
  }),
  updateIngreso: (text) => ({
    type: UPDATE_INGRESO,
    text,
  }),
  updateStatus: (text) => ({
    type: UPDATE_STATUS,
    text,
  }),
  deleteIngreso: (text) => ({
    type: DETELE_INGRESO,
    text,
  }),
};

module.exports = actions;
