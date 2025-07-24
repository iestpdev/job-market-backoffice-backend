import Joi from 'joi';

export const userSchema = Joi.object({
    username: Joi.string().min(8).max(18).required(),

    currentPassword: Joi.string().optional(),

    newPassword: Joi.string()
        .min(8)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).+$'))
        .optional()
        .messages({
            'string.pattern.base': 'La nueva contraseña debe tener al menos una mayúscula, una minúscula, un número y un carácter especial',
            'string.min': 'La nueva contraseña debe tener mínimo 8 caracteres'
        }),

    companyId: Joi.number().integer().allow(null),
    studentId: Joi.number().integer().allow(null),
    tutorId: Joi.number().integer().allow(null),
    isActive: Joi.boolean().optional()
});
