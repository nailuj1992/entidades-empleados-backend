const mongoose = require("mongoose");

const EntidadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nit: { type: String, required: true },
  empleados: [{ type: mongoose.Schema.Types.ObjectId, ref: "Empleado" }],
});

module.exports = mongoose.model("Entidad", EntidadSchema);