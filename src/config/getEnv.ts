type ENVS = 'ENV' | 'ENV2';

export const getEnv = (envToGet: ENVS) => {
  if (process.env[envToGet] === undefined) {
    throw new Error(`ENV ${envToGet} NOT FOUND`);
  }

  return process.env[envToGet];
};
