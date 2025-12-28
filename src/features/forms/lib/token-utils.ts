import { decryptToken, encryptToken } from '@/lib/cryptography';

import { FormTokenSchema, formTokenSchema } from '../model/form-token.schema';

export function createToken(payload: FormTokenSchema) {
  const token = encryptToken(JSON.stringify(payload));

  return encodeURIComponent(token);
}

export function validateToken(token: string) {
  try {
    const decryptedString = decryptToken(token);

    const data = JSON.parse(decryptedString);

    const validatedData = formTokenSchema.parse(data);

    if (Date.now() > validatedData.expiresAt) {
      return { valid: false, error: 'Token expired' };
    }

    return { valid: true, formId: validatedData.formId };
  } catch {
    return { valid: false, error: 'Invalid token' };
  }
}
