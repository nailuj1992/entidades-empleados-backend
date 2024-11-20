const Empleado = require("../models/empleado");

// Obtener un empleado por su id
exports.getOne = async (req, res) => {
    try {
        const { id } = req.params;
        const empleado = await Empleado.findById(id);
        if (!empleado) {
            return res.status(404).json({ message: "Empleado no encontrado" });
        }
        res.json(empleado);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el empleado", error });
    }
};

// Actualizar un empleado existente
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, position, salary } = req.body;

        const empleado = await Empleado.findById(id);
        if (!empleado) {
            return res.status(404).json({ message: "Empleado no encontrado" });
        }

        // Actualizar la información del empleado
        if (name) empleado.name = name;
        if (position) empleado.position = position;
        if (salary) empleado.salary = salary;

        await empleado.save();
        res.json({ message: "Empleado actualizado exitosamente", empleado });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el empleado", error });
    }
};

// Eliminar un empleado
exports.remove = async (req, res) => {
    try {
        const { id } = req.params;

        const empleado = await Empleado.findById(id);
        if (!empleado) {
            return res.status(404).json({ message: "Empleado no encontrado" });
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