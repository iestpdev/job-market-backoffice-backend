import { BaseController } from "../../shared/controller-base.js";
import Company from "../models/company.model.js";
import { companySchema } from "../validators/company.validator.js";
import uploadImageToSupabase from "../../../config/supabase/upload-image.js";
import dotenv from "dotenv";
dotenv.config();

class CompanyController extends BaseController {
    async getAll(req, res) {
        try {
            const companies = await Company.getAll(this.getDbPool());
            res.json(companies);
        } catch (error) {
            this.handleError(res, 500, error, "Error al obtener las empresas");
        }
    }

    async getById(req, res) {
        try {
            const id = parseInt(req.params.id);
            const company = await Company.getById(this.getDbPool(), id);
            if (!company) return res.status(404).json({ message: "Empresa no encontrada" });
            res.json(company);
        } catch (error) {
            this.handleError(res, 500, error, "Error al obtener la empresa");
        }
    }

    async create(req, res) {
        try {
            const { error: validationError, value } = companySchema.validate(req.body);
            if (validationError) return res.status(400).json({ message: "Validación fallida", details: validationError.details });
            if (!req.file) return res.status(400).json({ message: "El logo es obligatorio" });

            const company = new Company(
                null,
                value.razonSocial,
                value.ruc,
                '',
                value.direccion1,
                value.direccion2,
                value.rubro,
                value.contacto1,
                value.telefono1,
                value.correo1,
                value.contacto2,
                value.telefono2,
                value.correo2,
                value.contacto3,
                value.telefono3,
                value.correo3
            );

            const result = await company.create(this.getDbPool());
            const newId = result.insertId;

            const logoUrl = await uploadImageToSupabase(
                process.env.SUPABASE_BUCKET_IMAGES,
                req.file,
                "companies",
                newId
            );
            await Company.updateLogo(this.getDbPool(), newId, logoUrl);

            res.status(201).json({ message: "Empresa creada", id: newId });
        } catch (error) {
            this.handleError(res, 500, error, "Error al crear la empresa");
        }
    }

    async update(req, res) {
        try {
            const id = parseInt(req.params.id);
            const existingCompany = await Company.getById(this.getDbPool(), id);
            if (!existingCompany) return res.status(404).json({ message: "Empresa no encontrada" });

            const mergedData = {
                razonSocial: req.body?.razonSocial || existingCompany.RAZON_SOCIAL,
                ruc: req.body?.ruc || existingCompany.RUC,
                direccion1: req.body?.direccion1 || existingCompany.DIRECCION1,
                direccion2: req.body?.direccion2 || existingCompany.DIRECCION2,
                rubro: req.body?.rubro || existingCompany.RUBRO,
                contacto1: req.body?.contacto1 || existingCompany.CONTACTO1,
                telefono1: req.body?.telefono1 || existingCompany.TELEFONO1,
                correo1: req.body?.correo1 || existingCompany.CORREO1,
                contacto2: req.body?.contacto2 || existingCompany.CONTACTO2,
                telefono2: req.body?.telefono2 || existingCompany.TELEFONO2,
                correo2: req.body?.correo2 || existingCompany.CORREO2,
                contacto3: req.body?.contacto3 || existingCompany.CONTACTO3,
                telefono3: req.body?.telefono3 || existingCompany.TELEFONO3,
                correo3: req.body?.correo3 || existingCompany.CORREO3,
            };

            const { error, value } = companySchema.validate(mergedData);
            if (error) return res.status(400).json({ message: "Validación fallida", details: error.details });

            let logoUrl = existingCompany.LOGO;
            if (req.file) {
                logoUrl = await uploadImageToSupabase(
                    process.env.SUPABASE_BUCKET_IMAGES,
                    req.file,
                    "companies",
                    id
                );
            }

            const company = new Company(
                id,
                value.razonSocial,
                value.ruc,
                logoUrl,
                value.direccion1,
                value.direccion2,
                value.rubro,
                value.contacto1,
                value.telefono1,
                value.correo1,
                value.contacto2,
                value.telefono2,
                value.correo2,
                value.contacto3,
                value.telefono3,
                value.correo3
            );

            const result = await company.update(this.getDbPool());
            if (result.affectedRows <= 0) return res.sendStatus(204);
            res.json({ message: "Empresa actualizada" });
        } catch (error) {
            this.handleError(res, 500, error, "Error al actualizar la empresa");
        }
    }

    async deleteById(req, res) {
        try {
            const id = parseInt(req.params.id);
            const company = await Company.getById(this.getDbPool(), id);
            if (!company) return res.status(404).json({ message: "Empresa no encontrada" });
            if (company.is_active) return res.status(400).json({ message: "La empresa aún sigue activa y no puede ser eliminada" });
        

            const result = await Company.softDelete(this.getDbPool(), id);
            if (result.affectedRows <= 0) return res.status(404).json({ message: "Error al eliminar empresa" });

            res.json({ message: "Empresa eliminada" });
        } catch (error) {
            this.handleError(res, 500, error, "Error al eliminar la empresa");
        }
    }

    async activate(req, res) {
        try {
            const id = parseInt(req.params.id);
            const result = await Company.activate(this.getDbPool(), id);
            if (result.affectedRows <= 0) return res.status(404).json({ message: "No se pudo activar la empresa" });

            res.json({ message: "Empresa activada" });
        } catch (error) {
            this.handleError(res, 500, error, "Error al activar la empresa");
        }
    }

    async deactivate(req, res) {
        try {
            const id = parseInt(req.params.id);
            const result = await Company.deactivate(this.getDbPool(), id);
            if (result.affectedRows <= 0) return res.status(404).json({ message: "No se pudo desactivar la empresa" });

            res.json({ message: "Empresa desactivada" });
        } catch (error) {
            this.handleError(res, 500, error, "Error al desactivar la empresa");
        }
    }
}

export default new CompanyController();