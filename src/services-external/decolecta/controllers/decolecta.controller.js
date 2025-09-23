import { getSunatByRuc, getReniecByDni } from "../services/decoleta.service.js";
import { BaseController } from "../../../modules/shared/controller-base.js";

class DecolectaController extends BaseController {
    async getSunat(req, res) {
        try {
            const { ruc } = req.params;
            const data = await getSunatByRuc(ruc);
            res.json(data);
        } catch (error) {
            this.handleError(res, 500, error, "Error al consultar SUNAT");
        }
    }

    async getReniec(req, res) {
        try {
            const { dni } = req.params;
            const data = await getReniecByDni(dni);
            res.json(data);
        } catch (error) {
            this.handleError(res, 500, error, "Error al consultar RENIEC");
        }
    }
}

export default new DecolectaController();
