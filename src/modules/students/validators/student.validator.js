import Joi from 'joi';

export const studentSchema = Joi.object({
  apellidos: Joi.string().max(20).required(),
  nombres: Joi.string().max(20).required(),
  correo_institucional: Joi.string()
    .email({ tlds: { allow: false } })
    .pattern(/@iestpchincha\.edu\.pe$/) // obliga a terminar en el dominio
    .required()
    .messages({
      'string.email': 'El correo debe tener un formato válido',
      'string.pattern.base': 'El correo debe pertenecer al dominio @iestpchincha.edu.pe',
      'any.required': 'El correo institucional es obligatorio'
    }),
  telefono: Joi.string().pattern(/^\d{9}$/).required().messages({
    'string.pattern.base': 'El teléfono debe tener 9 dígitos',
    'any.required': 'El teléfono es obligatorio'
  }),
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
