import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  PRODUCT_MS_HOST: string;
  PRODUCT_MS_PORT: number;
}

const envSchema = joi
  .object<EnvVars>({
    PORT: joi.number().required().default(3000),
    PRODUCT_MS_HOST: joi.string().required().default('localhost'),
    PRODUCT_MS_PORT: joi.number().required().default(3001),
  })
  .unknown(true);

const { error, value: envVars } = envSchema.validate(process.env);

if (error) {
  throw new Error(
    `Config validation error: ${error.message}. Please check your environment variables.`,
  );
}

export const envs = {
  port: envVars.PORT,
  productMsHost: envVars.PRODUCT_MS_HOST,
  productMsPort: envVars.PRODUCT_MS_PORT,
};
