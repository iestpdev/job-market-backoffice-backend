import Joi from 'joi';

export const offerSchema = Joi.object({
  companyId: Joi.number().integer().required(),
  titulo: Joi.string().max(50).required(),
  descripcion: Joi.string().required(),
  sueldo: Joi.number().integer().min(0).max(65535).allow(null),
  adHonorem: Joi.boolean().default(false),
  viaticos: Joi.number().integer().min(0).max(65535).allow(null),
  bonos: Joi.number().integer().min(0).max(65535).allow(null),
  requisitos: Joi.string().required(),
  beneficios: Joi.string().required(),
  numVacantes: Joi.number().integer().min(1).max(255).allow(null),
  fechaPublicacion: Joi.date().iso().allow(null),
  fechaCierre: Joi.date().iso().allow(null),
  contacto: Joi.string().max(60).allow(null, ''),
  correo: Joi.string().email().max(50).allow(null, ''),
  telefono: Joi.string().max(50).allow(null, '')
});
