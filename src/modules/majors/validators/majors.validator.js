import Joi from 'joi';

export const majorSchema = Joi.object({
    nombre: Joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({
            'string.empty': 'El nombre no puede estar vacío',
            'string.min': 'El nombre debe tener al menos 3 caracteres',
            'string.max': 'El nombre no debe exceder los 100 caracteres'
        }),

    estado: Joi.boolean()
        .required()
        .messages({
            'any.required': 'El estado es obligatorio'
        })
});
