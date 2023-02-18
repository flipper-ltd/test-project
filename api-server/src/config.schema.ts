import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  PORT: Joi.number().default(3001).optional(),
  FOLDER: Joi.string()
    .regex(
      /^(?![#\/.])(?!.*[#\/.]$).*/,
      "The path shouldn't be leading period, slashes, or trailing slashes",
    )
    .required(),
});
