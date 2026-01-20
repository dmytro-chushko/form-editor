export async function exportResults(
  endpoint: string,
  params: Record<string, string | undefined>,
  format: 'xlsx' | 'csv'
) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([key, val]) => {
    if (val) qs.set(key, String(val));
  });
  qs.set('format', format);

  const url = `${endpoint}?${qs.toString()}`;

  // Використовуємо нативний window.location для ініціації завантаження файлу браузером
  window.location.href = url;
}
