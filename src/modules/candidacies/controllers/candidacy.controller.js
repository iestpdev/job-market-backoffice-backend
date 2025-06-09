import { BaseController } from "../../shared/controller-base.js";
import Candidacy from "../models/candidacy.model.js";
import Student from "../../students/models/student.model.js";
import { candidacySchema } from "../validators/candidacy.validator.js";
import uploadFileToSupabase from "../../../config/supabase/upload-file.js";

class CandidacyController extends BaseController {
    async getAll(req, res) {
        try {
            const candidacies = await Candidacy.getAll(this.getDbPool());
            res.json(candidacies);
        } catch (error) {
            this.handleError(res, 500, error, "Error al obtener las postulaciones");
        }
    }

    async getAllByCompanyId(req, res) {
        try {
            const companyId = parseInt(req.params.id);
            const candidacies = await Candidacy.getAllByCompanyId(this.getDbPool(), companyId);
            res.json(candidacies);
        } catch (error) {
            this.handleError(res, 500, error, "Error al obtener las postulaciones por empresaId");
        }
    }

    async getAllByStudentId(req, res) {
        try {
            const studentId = parseInt(req.params.id);
            const candidacies = await Candidacy.getAllByStudentId(this.getDbPool(), studentId);
            res.json(candidacies);
        } catch (error) {
            this.handleError(res, 500, error, "Error al obtener las postulaciones por ID del alumno");
        }
    }

    async getAttachmentsByStudentId(req, res) {
        try {
            const studentId = parseInt(req.params.id);
            const attachments = await Candidacy.getAttachmentsByStudentId(this.getDbPool(), studentId);
            res.json(attachments);
        } catch (error) {
            this.handleError(res, 500, error, "Error al obtener los documentos de la postulación por ID del alumno");
        }
    }

    async getById(req, res) {
        try {
            const id = parseInt(req.params.id);
            const candidacy = await Candidacy.getById(this.getDbPool(), id);
            if (!candidacy) return res.status(404).json({ message: "Postulación no encontrada" });
            res.json(candidacy);
        } catch (error) {
            this.handleError(res, 500, error, "Error al obtener la postulación");
        }
    }

    async create(req, res) {
        try {
            const { error, value } = candidacySchema.validate(req.body);
            if (error) return res.status(400).json({ message: "Validación fallida", details: error.details });

            const exists = await Candidacy.exists(this.getDbPool(), value.ofertaId, value.alumnoId);
            if (exists) return res.status(409).json({ message: "Ya se ha postulado a esta oferta." });

            const student = await Student.getById(this.getDbPool(), value.alumnoId);
            const candidacy = new Candidacy(
                null,
                value.ofertaId,
                value.alumnoId,
                new Date(),
                value.estadoRespuesta || "PENDING",
                student.CURRICULUM,
                null,
                null,
                null
            );

            const result = await candidacy.create(this.getDbPool());
            const newId = result.insertId;

            res.status(201).json({ message: "Postulación creada", id: newId });
        } catch (error) {
            this.handleError(res, 500, error, "Error al crear la postulación");
        }
    }

    async exists(req, res) {
        try {
            const ofertaId = parseInt(req.params.ofertaId);
            const alumnoId = parseInt(req.params.alumnoId);

            const exists = await Candidacy.exists(this.getDbPool(), ofertaId, alumnoId);
            res.json({ exists });
        } catch (error) {
            this.handleError(res, 500, error, "Error al verificar si ya se postuló");
        }
    }

    async uploadDocument(req, res) {
        try {
            const id = parseInt(req.params.id);
            const field = req.params.field;

            const fieldMap = {
                docAdjunto2: "DOC_ADJUNTO2",
                docAdjunto3: "DOC_ADJUNTO3",
                docAdjunto4: "DOC_ADJUNTO4"
            };

            const dbField = fieldMap[field];
            if (!dbField) {
                return res.status(400).json({ message: "Campo de documento no válido." });
            }

            const candidacy = await Candidacy.getById(this.getDbPool(), id);
            if (!candidacy || candidacy.ESTADO_RESPUESTA !== "PENDING") {
                return res.status(404).json({ message: "Postulación no encontrada o no editable." });
            }

            const file = req.file;
            if (!file) return res.status(400).json({ message: "Archivo no enviado." });

            const publicUrl = await uploadFileToSupabase(
                process.env.SUPABASE_BUCKET_FILES,
                file,
                "candidacies",
                id
            );
            await Candidacy.updateDoc(this.getDbPool(), id, publicUrl, dbField);

            res.json({ message: "Documento actualizado correctamente.", url: publicUrl });
        } catch (error) {
            this.handleError(res, 500, error, "Error al subir el documento");
        }
    }

    async deleteById(req, res) {
        try {
            const id = parseInt(req.params.id);
            const existing = await Candidacy.getById(this.getDbPool(), id);
            if (!existing) return res.status(404).json({ message: "Postulación no encontrada" });

            const result = await Candidacy.softDelete(this.getDbPool(), id);
            if (result.affectedRows <= 0) return res.status(404).json({ message: "Error al eliminar la postulación" });

            res.json({ message: "Postulación eliminada" });
        } catch (error) {
            this.handleError(res, 500, error, "Error al eliminar la postulación");
        }
    }

    async updateStatus(req, res) {
        try {
            const id = parseInt(req.params.id);
            const { status } = req.body;
            const validStatuses = ["APPROVED", "REJECTED", "PENDING"];
            if (!validStatuses.includes(status)) return res.status(400).json({ message: "Estado no válido" });

            const existing = await Candidacy.getById(this.getDbPool(), id);
            if (!existing) return res.status(404).json({ message: "Postulación no encontrada" });

            const result = await Candidacy.updateStatus(this.getDbPool(), id, status);
            if (result.affectedRows <= 0) return res.status(400).json({ message: `Error al actualizar el estado a ${status}` });

            res.json({ message: `Estado actualizado a ${status}` });
        } catch (error) {
            this.handleError(res, 500, error, "Error al actualizar el estado");
        }
    }
}

export default new CandidacyController();
