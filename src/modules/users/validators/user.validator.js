import Joi from 'joi';

export const userSchema = Joi.object({
    username: Joi.string().min(8).max(18).required(),
    userpass: Joi.string()
        .min(8)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).+$'))
        .required()
        .messages({
            'string.pattern.base': 'La contraseña debe tener al menos una mayúscula, una minúscula, un número y un carácter especial',
            'string.min': 'La contraseña debe tener mínimo 8 caracteres'
        }),
    companyId: Joi.number().integer().allow(null),
    studentId: Joi.number().integer().allow(null),
    isActive: Joi.boolean().optional()
});
