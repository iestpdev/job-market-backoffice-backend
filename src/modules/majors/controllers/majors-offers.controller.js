import { BaseController } from "../../shared/controller-base.js";
import MajorsOffers from "../models/majors-offers.model.js";

class MajorsOffersController extends BaseController {
    async getAllByOfferId(req, res) {
        try {
            const offerId = parseInt(req.params.offerId);
            const result = await MajorsOffers.getAllByOfferId(this.getDbPool(), offerId);
            res.json(result);
        } catch (error) {
            this.handleError(res, 500, error, "Error al obtener programas asociados a la oferta");
        }
    }

    async assignProgramsToOffer(req, res) {
        try {
            const offerId = parseInt(req.params.offerId);
            const programIds = req.body.programIds;

            if (!Array.isArray(programIds) || programIds.length === 0) {
                return res.status(400).json({ message: "Debe proporcionar un arreglo válido de IDs de programas" });
            }

            await MajorsOffers.softDeleteByOfferId(this.getDbPool(), offerId);

            const insertResults = [];
            for (const majorId of programIds) {
                const relation = new MajorsOffers(null, offerId, majorId);
                const result = await relation.create(this.getDbPool());
                insertResults.push(result);
            }

            res.status(201).json({ message: "Programas asignados correctamente", count: insertResults.length });
        } catch (error) {
            this.handleError(res, 500, error, "Error al asignar programas a la oferta");
        }
    }
}

export default new MajorsOffersController();
