import * as Joi from 'joi';
import { DEFAULT_APP_PORT, DEFAULT_JWT_EXPIRES } from './constants';

export const configValidationSchema = Joi.object({
  PORT: Joi.number().default(DEFAULT_APP_PORT).required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432).required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  DB_AUTO_LOAD_ENTITIES: Joi.boolean().required(),
  DB_SYNCHRONIZE: Joi.boolean().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES: Joi.number().default(DEFAULT_JWT_EXPIRES).required(),
});
