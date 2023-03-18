import { ZodError } from 'zod';

export const zodErrorParse = (err: ZodError) => {
  const issues = err.issues.map(({ path, message }) => ({
    [`${path}`]: message,
  }));

  return {
    code: 400,
    message: 'validationError',
    errors: issues,
  };
};
