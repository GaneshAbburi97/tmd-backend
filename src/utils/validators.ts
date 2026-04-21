import Joi from 'joi';

export const passwordSchema = Joi.string()
  .min(8)
  .pattern(/[a-z]/, 'lowercase')
  .pattern(/[A-Z]/, 'uppercase')
  .pattern(/[0-9]/, 'digit')
  .required();

export const authSchemas = {
  register: Joi.object({
    email: Joi.string().email().required(),
    password: passwordSchema,
    firstName: Joi.string().required(),
    lastName: Joi.string().required()
  }),
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),
  refreshToken: Joi.object({ refreshToken: Joi.string().required() }),
  forgotPassword: Joi.object({ email: Joi.string().email().required() }),
  resetPassword: Joi.object({ token: Joi.string().required(), password: passwordSchema }),
  verifyEmail: Joi.object({ token: Joi.string().required() })
};

export const painSchema = Joi.object({
  intensity: Joi.number().integer().min(1).max(10).required(),
  location: Joi.string().required(),
  triggers: Joi.string().required(),
  notes: Joi.string().allow('', null),
  recordedAt: Joi.date().optional()
});

export const moodSchema = Joi.object({
  moodLevel: Joi.number().integer().min(1).max(10).required(),
  stressLevel: Joi.number().integer().min(1).max(10).required(),
  anxietyLevel: Joi.number().integer().min(1).max(10).required(),
  notes: Joi.string().allow('', null)
});

export const appointmentSchema = Joi.object({
  providerName: Joi.string().required(),
  providerSpecialty: Joi.string().required(),
  appointmentAt: Joi.date().required(),
  reason: Joi.string().required(),
  notes: Joi.string().allow('', null)
});

export const exerciseCompletionSchema = Joi.object({
  exerciseId: Joi.string().uuid().required(),
  durationMinutes: Joi.number().integer().min(1).required(),
  notes: Joi.string().allow('', null)
});

export const cbtProgressSchema = Joi.object({
  moduleId: Joi.string().uuid().required(),
  completed: Joi.boolean().required()
});
