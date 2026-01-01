import { ValidationFieldMessages, ValidationWithEmailPattern } from '../types';

export function convertEmailValidation(
  validation?: ValidationFieldMessages
): ValidationWithEmailPattern | undefined {
  if (!validation) return;

  if ('email' in validation) {
    const { email, ...restOfValidation } = validation;

    return {
      ...restOfValidation,
      pattern: {
        value: /^[a-zA-Z0-0._%+-]+@[a-zA-Z0-0.-]+\.[a-zA-Z]{2,}$/,
        message: email?.message || '',
      },
    };
  }

  return validation;
}
