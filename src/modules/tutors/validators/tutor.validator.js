import Joi from 'joi';

export const tutorSchema = Joi.object({
    apellidos: Joi.string().max(20).required(),
    nombres: Joi.string().max(20).required(),
    genero: Joi.string().valid('M', 'F').required(),
    fechNac: Joi.date().required(),
    tipoDOI: Joi.string().max(3).required(),
    numDOI: Joi.string().max(15).required()
});
