import Joi from 'joi';

export const companySchema = Joi.object({
  razonSocial: Joi.string().max(60).required(),
  ruc: Joi.string().length(11).pattern(/^[0-9]+$/).required(),

  direccion1: Joi.string().max(80).required(),
  direccion2: Joi.string().max(80).allow(null, ''),

  rubro: Joi.string().max(60).required(),

  contacto1: Joi.string().max(60).required(),
  telefono1: Joi.string().length(9).pattern(/^[0-9]+$/).required(),
  correo1: Joi.string().email().max(50).required(),

  contacto2: Joi.string().max(60).allow(null, ''),
  telefono2: Joi.string().length(9).pattern(/^[0-9]+$/).allow(null, ''),
  correo2: Joi.string().email().max(50).allow(null, ''),

  contacto3: Joi.string().max(60).allow(null, ''),
  telefono3: Joi.string().length(9).pattern(/^[0-9]+$/).allow(null, ''),
  correo3: Joi.string().email().max(50).allow(null, ''),

  isActive: Joi.boolean().optional()
});
