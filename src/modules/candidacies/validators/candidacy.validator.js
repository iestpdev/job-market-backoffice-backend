import Joi from 'joi';

export const candidacySchema = Joi.object({
  ofertaId: Joi.number().integer().positive().required(),
  alumnoId: Joi.number().integer().positive().required(),
  estadoRespuesta: Joi.string().valid('PENDING', 'APPROVED', 'REJECTED').default('PENDING'),
  docAdjunto2: Joi.string().uri().optional().allow(null),
  docAdjunto3: Joi.string().uri().optional().allow(null),
  docAdjunto4: Joi.string().uri().optional().allow(null)
});
