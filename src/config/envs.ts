import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  NATS_SERVERS: string[];
}

const envSchema = joi
  .object<EnvVars>({
    PORT: joi.number().required().default(3001),
    NATS_SERVERS: joi
      .array()
      .items(joi.string())
      .required()
      .default(['nats://localhost:4222']),
  })
  .unknown(true);

const { error, value: envVars } = envSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS?.split(','),
});

if (error) {
  throw new Error(
    `Config validation error: ${error.message}. Please check your environment variables.`,
  );
}

export const envs = {
  port: envVars.PORT,
  natsServers: envVars.NATS_SERVERS,
};
