const Empleado = require("../models/empleado");

// Obtener un empleado por su id
exports.getOne = async (req, res) => {
    try {
        const { id } = req.params;
        const empleado = await Empleado.findById(id);
        if (!empleado) {
            return res.status(404).json({ message: "Empleado no encontrada" });
        }
        res.json(empleado);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el empleado", error });
    }
};

// Eliminar un empleado
exports.remove = async (req, res) => {
    try {
        const { id } = req.params;

        const empleado = await Empleado.findById(id);
        if (!empleado) {
            return res.status(404).json({ message: "Empleado no encontrada" });
        }

        // Eliminar la entidad
        await Empleado.findByIdAndDelete(id);

        res.json({ message: "Empleado eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el empleado", error });
    }
};

exports.health = async (req, res) => {
    res.json({ message: "200 OK" });
};