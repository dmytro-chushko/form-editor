import { VALIDATION_MESSAGES } from '../model/validation-messages';
import { ValidationField, ValidationFieldMessages } from '../types';

export function addMessages(
  validation: ValidationField
): ValidationFieldMessages | undefined {
  if (!validation) return;

  return (Object.keys(validation) as (keyof ValidationField)[]).reduce(
    (acc, field) => {
      return field in VALIDATION_MESSAGES
        ? {
            ...acc,
            [field]: {
              value: validation[field],
              message: VALIDATION_MESSAGES[field],
            },
          }
        : acc;
    },
    {} as ValidationFieldMessages
  );
}
