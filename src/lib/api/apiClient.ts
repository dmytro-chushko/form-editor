export async function apiPost<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    let message = 'Request failed';
    try {
      const data = await res.json();
      message = data?.error || message;
    } catch {}
    throw new Error(message);
  }
  try {
    return await res.json();
  } catch {
    return {} as T;
  }
}

export async function apiGet<T>(url: string): Promise<T> {
  const res = await fetch(url, { method: 'GET' });

  if (!res.ok) {
    throw new Error('Request failed');
  }

  return res.json();
}
