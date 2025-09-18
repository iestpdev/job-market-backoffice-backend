import { BaseController } from "../../shared/controller-base.js";
import SavedOffer from "../models/saved-offer.model.js";

class SavedOfferController extends BaseController {
    async getAllByStudentId(req, res) {
        try {
            const studentId = parseInt(req.params.studentId);
            const savedOffers = await SavedOffer.getAllByStudentId(this.getDbPool(), studentId);
            res.json(savedOffers);
        } catch (error) {
            this.handleError(res, 500, error, "Error al obtener las ofertas guardadas por studentId");
        }
    }

    async create(req, res) {
        try {
            const { studentId, ofertaId } = req.body;
            if (!studentId || !ofertaId) return res.status(400).json({ message: "studentId y ofertaId son requeridos" });

            const exists = await SavedOffer.exists(this.getDbPool(), ofertaId, studentId);
            if (exists) return res.status(409).json({ message: "La oferta ya está guardada por este estudiante" });
            const savedOffer = new SavedOffer(ofertaId, studentId);
            
            const result = await savedOffer.create(this.getDbPool());
            if (result) res.status(201).json({ message: "Oferta guardada exitosamente"});

        } catch (error) {
            this.handleError(res, 500, error, "Error al guardar la oferta");
        }
    }

    async delete(req, res) {
        try {
            const { studentId, ofertaId } = req.body;
            if (!studentId || !ofertaId) return res.status(400).json({ message: "studentId y ofertaId son requeridos" });
            const result = await SavedOffer.hardDelete(this.getDbPool(), ofertaId, studentId);
            if (result.affectedRows === 0) return res.status(404).json({ message: "No se encontró la oferta guardada para eliminar" });
            res.json({ message: "Oferta guardada eliminada exitosamente" });
        } catch (error) {
            this.handleError(res, 500, error, "Error al eliminar la oferta guardada");
        }
    }
}

export default new SavedOfferController();