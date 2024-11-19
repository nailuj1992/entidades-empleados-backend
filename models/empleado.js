const mongoose = require("mongoose");

const EmpleadoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  salary: { type: String, required: true },
});

module.exports = mongoose.model("Empleado", EmpleadoSchema);