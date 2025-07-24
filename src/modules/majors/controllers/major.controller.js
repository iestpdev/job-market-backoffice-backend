import { BaseController } from "../../shared/controller-base.js";
import Major from "../models/major.model.js";
import { majorSchema } from "../validators/majors.validator.js";

class MajorController extends BaseController {
    async getAll(_, res) {
        try {
            const majors = await Major.getAll(this.getDbPool());
            res.json(majors);
        } catch (error) {
            this.handleError(res, 500, error, "Error al obtener los programas de estudio");
        }
    }

    async GetActivated(_, res) {
        try {
            const majors = await Major.getActived(this.getDbPool());
            res.json(majors);
        } catch (error) {
            this.handleError(res, 500, error, "Error al obtener los programas de estudio activos");
        }
    }

    async getById(req, res) {
        try {
            const id = parseInt(req.params.id);
            const major = await Major.getById(this.getDbPool(), id);

            if (!major) return res.status(404).json({ message: "Programa de estudio no encontrado" });
            res.json(major);
        } catch (error) {
            this.handleError(res, 500, error, "Error al obtener el programa de estudio");
        }
    }

    async create(req, res) {
        try {
            const { error, value } = majorSchema.validate(req.body);
            if (error) return res.status(400).json({ message: "Validación fallida", details: error.details });

            const major = new Major(null, value.nombre, value.estado);
            const result = await major.create(this.getDbPool());
            const newId = result.insertId;

            res.status(201).json({ message: "Programa de estudio creado", id: newId });
        } catch (error) {
            this.handleError(res, 500, error, "Error al crear el programa de estudio");
        }
    }

    async update(req, res) {
        try {
            const id = parseInt(req.params.id);
            const existingMajor = await Major.getById(this.getDbPool(), id);
            if (!existingMajor) return res.status(404).json({ message: "Programa de estudio no encontrado" });

            const { error } = majorSchema.validate(req.body, { abortEarly: false });
            if (error) return res.status(400).json({ message: "Validación fallida", details: error.details.map(d => d.message) });

            const current = existingMajor;
            const {
                nombre = current.NOMBRE,
                estado = current.ESTADO
            } = req.body;

            const major = new Major(id, nombre, estado);
            const result = await major.update(this.getDbPool());

            if (result.affectedRows <= 0) return res.sendStatus(204);
            res.json({ message: "Programa de estudio actualizado" });
        } catch (error) {
            this.handleError(res, 500, error, "Error al actualizar el programa de estudio");
        }
    }

    async deleteById(req, res) {
        try {
            const id = parseInt(req.params.id);
            const major = await Major.getById(this.getDbPool(), id);
            if (!major) return res.status(404).json({ message: "Programa de estudio no encontrado" });

            const result = await Major.softDelete(this.getDbPool(), id);
            if (result.affectedRows <= 0)
                return res.status(404).json({ message: "Error al eliminar el programa de estudio" });

            res.json({ message: "Programa de estudio eliminado" });
        } catch (error) {
            this.handleError(res, 500, error, "Error al eliminar el programa de estudio");
        }
    }
}

export default new MajorController();
