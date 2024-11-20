const Entidad = require("../models/entidad");
const Empleado = require("../models/empleado");

// Obtener todas las entidades
exports.getAll = async (req, res) => {
  try {
    const entidades = await Entidad.find().populate("empleados");
    res.json(entidades);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las entidades", error });
  }
};

// Obtener una entidad por su id
exports.getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const entidad = await Entidad.findById(id)?.populate("empleados");
    if (!entidad) {
      return res.status(404).json({ message: "Entidad no encontrada" });
    }
    res.json(entidad);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la entidad", error });
  }
};

// Crear una nueva entidad
exports.create = async (req, res) => {
  try {
    const { name, nit, empleados } = req.body;

    // Crear empleados si son proporcionados
    const empleadoDocs = empleados
      ? await Empleado.insertMany(empleados.map((emp) => ({ ...emp })))
      : [];

    const entidad = new Entidad({ name, nit, empleados: empleadoDocs.map((emp) => emp._id) });
    await entidad.save();

    res.status(201).json({ message: "Entidad creada exitosamente", entidad });
  } catch (error) {
    res.status(500).json({ message: "Error al crear la entidad", error });
  }
};

// Actualizar una entidad existente
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, nit, empleados } = req.body;

    const entidad = await Entidad.findById(id);
    if (!entidad) {
      return res.status(404).json({ message: "Entidad no encontrada" });
    }

    // Actualizar la información de la entidad
    if (name) entidad.name = name;
    if (nit) entidad.nit = nit;

    if (empleados) {
      // Eliminar empleados antiguos
      await Empleado.deleteMany({ _id: { $in: entidad.empleados } });

      // Crear nuevos empleados
      const empleadoDocs = await Empleado.insertMany(empleados.map((emp) => ({ ...emp })));
      entidad.empleados = empleadoDocs.map((emp) => emp._id);
    }

    await entidad.save();
    res.json({ message: "Entidad actualizada exitosamente", entidad });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la entidad", error });
  }
};

// Eliminar una entidad
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    const entidad = await Entidad.findById(id);
    if (!entidad) {
      return res.status(404).json({ message: "Entidad no encontrada" });
    }

    // Eliminar empleados asociados
    await Empleado.deleteMany({ _id: { $in: entidad.empleados } });

    // Eliminar la entidad
    await Entidad.findByIdAndDelete(id);

    res.json({ message: "Entidad eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la entidad", error });
  }
};

exports.health = async (req, res) => {
  res.json({ message: "200 OK" });
};