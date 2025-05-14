import { BaseController } from "../../shared/controller-base.js";
import Offer from "../models/offer.model.js";
import { offerSchema } from "../validators/offer.validator.js";

class OfferController extends BaseController {
  async getAll(req, res) {
    try {
      const offers = await Offer.getAll(this.getDbPool());
      res.json(offers);
    } catch (error) {
      this.handleError(res, 500, error, "Error al obtener las ofertas");
    }
  }

  async getById(req, res) {
    try {
      const id = parseInt(req.params.id);
      const offer = await Offer.getById(this.getDbPool(), id);
      if (!offer) return res.status(404).json({ message: "Oferta no encontrada" });
      res.json(offer);
    } catch (error) {
      this.handleError(res, 500, error, "Error al obtener la oferta");
    }
  }

  async create(req, res) {
    try {
      const { error: validationError, value } = offerSchema.validate(req.body);
      if (validationError) return res.status(400).json({ message: "Validación fallida", details: validationError.details });

      const offer = new Offer(
        null,
        value.companyId,
        value.titulo,
        value.descripcion,
        value.sueldo,
        value.adHonorem,
        value.viaticos,
        value.bonos,
        value.requisitos,
        value.beneficios,
        value.numVacantes,
        value.fechaPublicacion,
        value.fechaCierre,
        value.contacto,
        value.correo,
        value.telefono
      );

      const result = await offer.create(this.getDbPool());
      res.status(201).json({ message: "Oferta creada", id: result.insertId });
    } catch (error) {
      this.handleError(res, 500, error, "Error al crear la oferta");
    }
  }

  async update(req, res) {
    try {
      const id = parseInt(req.params.id);
      const existingOffer = await Offer.getById(this.getDbPool(), id);
      if (!existingOffer) return res.status(404).json({ message: "Oferta no encontrada" });

      const mergedData = {
        companyId: req.body?.companyId ?? existingOffer.EMPRESA_ID,
        titulo: req.body?.titulo ?? existingOffer.TITULO,
        descripcion: req.body?.descripcion ?? existingOffer.DESCRIPCION,
        sueldo: req.body?.sueldo ?? existingOffer.SUELDO,
        adHonorem: req.body?.adHonorem ?? !!existingOffer.AD_HONOREM,
        viaticos: req.body?.viaticos ?? existingOffer.VIATICOS,
        bonos: req.body?.bonos ?? existingOffer.BONOS,
        requisitos: req.body?.requisitos ?? existingOffer.REQUISITOS,
        beneficios: req.body?.beneficios ?? existingOffer.BENEFICIOS,
        numVacantes: req.body?.numVacantes ?? existingOffer.NUM_VACANTES,
        fechaPublicacion: req.body?.fechaPublicacion ?? existingOffer.FECHA_PUBLICACION,
        fechaCierre: req.body?.fechaCierre ?? existingOffer.FECHA_CIERRE,
        contacto: req.body?.contacto ?? existingOffer.CONTACTO,
        correo: req.body?.correo ?? existingOffer.CORREO,
        telefono: req.body?.telefono ?? existingOffer.TELEFONO
      };

      const { error, value } = offerSchema.validate(mergedData);
      if (error) return res.status(400).json({ message: "Validación fallida", details: error.details });

      const offer = new Offer(
        id,
        value.companyId,
        value.titulo,
        value.descripcion,
        value.sueldo,
        value.adHonorem,
        value.viaticos,
        value.bonos,
        value.requisitos,
        value.beneficios,
        value.numVacantes,
        value.fechaPublicacion,
        value.fechaCierre,
        value.contacto,
        value.correo,
        value.telefono
      );

      const result = await offer.update(this.getDbPool());

      if (result.affectedRows <= 0) return res.sendStatus(204);
      res.json({ message: "Oferta actualizada" });
    } catch (error) {
      this.handleError(res, 500, error, "Error al actualizar la oferta");
    }
  }

  async deleteById(req, res) {
    try {
      const id = parseInt(req.params.id);
      const offer = await Offer.getById(this.getDbPool(), id);
      if (!offer) return res.status(404).json({ message: "Oferta no encontrada" });

      const result = await Offer.softDelete(this.getDbPool(), id);
      if (result.affectedRows <= 0) return res.status(404).json({ message: "Error al eliminar la oferta" });

      res.json({ message: "Oferta eliminada" });
    } catch (error) {
      this.handleError(res, 500, error, "Error al eliminar la oferta");
    }
  }
}

export default new OfferController();
