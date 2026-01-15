export function validateResultData(value: unknown) {
  if (value && typeof value === 'string') return value;

  if (typeof value === 'boolean') return value ? 'true' : 'false';

  if (typeof value === 'number') return value.toString();

  return '-';
}
