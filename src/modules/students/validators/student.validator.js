import Joi from 'joi';

export const studentSchema = Joi.object({
  apellidos: Joi.string().max(20).required(),
  nombres: Joi.string().max(20).required(),
  genero: Joi.string().valid('M', 'F').required(),
  fechNac: Joi.date().required(),
  tipoDOI: Joi.string().max(3).required(),
  numDOI: Joi.string().max(15).required(),
  programaEstudioId: Joi.number().integer().required().messages({
    'any.required': 'El programa de estudio es obligatorio',
    'number.base': 'El programa de estudio debe ser un ID numérico válido'
  }),
  esEgresado: Joi.boolean().required()
});
