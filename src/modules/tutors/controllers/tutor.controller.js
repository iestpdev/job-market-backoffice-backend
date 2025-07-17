import { BaseController } from "../../shared/controller-base.js";
import Tutor from "../models/tutor.model.js";
import { tutorSchema } from "../validators/tutor.validator.js";

class TutorController extends BaseController {
    async getAll(_, res) {
        try {
            const tutors = await Tutor.getAll(this.getDbPool());
            res.json(tutors);
        } catch (error) {
            this.handleError(res, 500, error, "Error al obtener los tutores");
        }
    }

    async getById(req, res) {
        try {
            const id = parseInt(req.params.id);
            const tutor = await Tutor.getById(this.getDbPool(), id);

            if (!tutor) return res.status(404).json({ message: "tutor no encontrado" });
            res.json(tutor);
        } catch (error) {
            this.handleError(res, 500, error, "Error al obtener el tutor");
        }
    }

    async create(req, res) {
        try {
            const { error: validationError, value } = tutorSchema.validate(req.body);
            if (validationError) return res.status(400).json({ message: "Validación fallida", details: validationError.details });

            const tutor = new Tutor(
                null,
                value.apellidos,
                value.nombres,
                value.genero,
                value.fechNac,
                value.tipoDOI,
                value.numDOI,
            );

            const result = await tutor.create(this.getDbPool());
            const newId = result.insertId;

            res.status(201).json({ message: "Tutor creado", id: newId });
        } catch (error) {
            this.handleError(res, 500, error, "Error al crear el tutor");
        }
    }

    async update(req, res) {
        try {
            const id = parseInt(req.params.id);
            const existingTutor= await Tutor.getById(this.getDbPool(), id);
            if (!existingTutor) return res.status(404).json({ message: "Tutor no encontrado" });

            const mergedData = {
                apellidos: req.body?.apellidos || existingTutor.APELLIDOS,
                nombres: req.body?.nombres || existingTutor.NOMBRES,
                genero: req.body?.genero || existingTutor.GENERO,
                fechNac: req.body?.fechNac || existingTutor.FECH_NACIMIENTO,
                tipoDOI: req.body?.tipoDOI || existingTutor.TIPO_DOI,
                numDOI: req.body?.numDOI || existingTutor.NUM_DOI,
            };

            const { error, value } = tutorSchema.validate(mergedData);
            if (error) return res.status(400).json({ message: "Validación fallida", details: error.details });

            const tutor = new Tutor(
                id,
                value.apellidos,
                value.nombres,
                value.genero,
                value.fechNac,
                value.tipoDOI,
                value.numDOI,
            );

            const result = await tutor.update(this.getDbPool());

            if (result.affectedRows <= 0) return res.sendStatus(204);
            res.json({ message: "Tutor actualizado" });
        } catch (error) {
            this.handleError(res, 500, error, "Error al actualizar el tutor");
        }
    }

    async deleteById(req, res) {
        try {
            const id = parseInt(req.params.id);
            const tutor = await Tutor.getById(this.getDbPool(), id);
            if (!tutor) return res.status(404).json({ message: "Tutor no encontrado" });

            const result = await Tutor.softDelete(this.getDbPool(), id);
            if (result.affectedRows <= 0) return res.status(404).json({ message: "error al eliminar Tutor" });

            res.json({ message: "Tutor eliminado (soft delete)" });
        } catch (error) {
            this.handleError(res, 500, error, "Error al eliminar el Tutor");
        }
    }
}

export default new TutorController();
