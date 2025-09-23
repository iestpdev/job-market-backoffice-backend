import Joi from 'joi';

export const registerStudentSchema = Joi.object({
  apellidos: Joi.string().max(20).required(),
  nombres: Joi.string().max(20).required(),
  correo_institucional: Joi.string()
    .email({ tlds: { allow: false } })
    .pattern(/@iestpchincha\.edu\.pe$/)
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
  programaEstudioId: Joi.number().integer().required(),
  esEgresado: Joi.boolean().required(),
  username: Joi.string().alphanum().min(4).max(20).required().messages({
    'any.required': 'El nombre de usuario es obligatorio',
    'string.alphanum': 'El nombre de usuario solo puede contener letras y números',
    'string.min': 'El nombre de usuario debe tener al menos 4 caracteres',
    'string.max': 'El nombre de usuario no puede exceder los 20 caracteres'
  }),
  userpass: Joi.string().min(6).max(50).required().messages({
    'any.required': 'La contraseña es obligatoria',
    'string.min': 'La contraseña debe tener al menos 6 caracteres',
    'string.max': 'La contraseña no puede exceder los 50 caracteres'
  })
});