import type { ServiceDef } from './interface';
export type { ServiceDef } from './interface';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('mf_token');
}

export function setToken(token: string) {
  localStorage.setItem('mf_token', token);
}

export function clearToken() {
  localStorage.removeItem('mf_token');
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });
  if (res.status === 304) {
    // If 304, there's no body, so we can't parse JSON. 
    // Usually browser fetch handles this, but if we get here, return null or handle as needed.
    // For our API, if it's 304, hopefully data is cached, but we'll try to return something sensible.
    return { data: [] } as any; 
  }

  let json: any;
  try {
    json = await res.json();
  } catch (err) {
    if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
    return null as any;
  }

  if (!res.ok) throw new Error(json.message || `Request failed (${res.status})`);
  return json.data as T;
}

async function requestWithApiKey<T>(path: string, apiKey: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      ...(options.headers || {}),
    },
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Request failed');
  return json;
}

// Auth
export const authApi = {
  requestMagicLink: (email: string) =>
    request('/auth/magic-link', { method: 'POST', body: JSON.stringify({ email }) }),
  verify: (token: string) =>
    request<{ token: string; user: { id: string; email: string; name?: string } }>(`/auth/verify?token=${token}`),
  me: () => request<{ id: string; email: string; name?: string }>('/auth/me'),
  deleteAccount: () => request('/auth/me', { method: 'DELETE' }),
};

// SMTP
export const smtpApi = {
  test: (data: object) =>
    request('/smtp/test', { method: 'POST', body: JSON.stringify(data) }),
  save: (data: object) =>
    request('/smtp', { method: 'POST', body: JSON.stringify(data) }),
  list: () => request('/smtp'),
  update: (id: string, data: object) =>
    request(`/smtp/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => request(`/smtp/${id}`, { method: 'DELETE' }),
};

// API Keys
export const keysApi = {
  generate: (data: object) =>
    request('/keys', { method: 'POST', body: JSON.stringify(data) }),
  list: () => request('/keys'),
  revoke: (id: string) => request(`/keys/${id}`, { method: 'DELETE' }),
};

// Logs
export const logsApi = {
  list: (params?: { page?: number; limit?: number; status?: string }) => {
    const q = new URLSearchParams();
    if (params?.page) q.set('page', String(params.page));
    if (params?.limit) q.set('limit', String(params.limit));
    if (params?.status) q.set('status', params.status);
    return fetch(`${API_BASE}/logs?${q}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    }).then((r) => r.json());
  },
  get: (id: string) => request(`/logs/${id}`),
};

// Templates
export const templatesApi = {
  create: (data: object) =>
    request('/templates', { method: 'POST', body: JSON.stringify(data) }),
  list: () => request('/templates'),
  get: (id: string) => request(`/templates/${id}`),
  update: (id: string, data: object) =>
    request(`/templates/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => request(`/templates/${id}`, { method: 'DELETE' }),
};

// Services catalogue (public – no auth)

export const servicesApi = {
  list: (): Promise<ServiceDef[]> =>
    fetch(`${API_BASE}/services`).then(async (r) => {
      const json = await r.json();
      if (!r.ok) throw new Error(json.message || 'Failed to load services');
      return json.data as ServiceDef[];
    }),
};

// Send Mail (public API key call, for demo)
// export const sendMailApi = (apiKey: string, data: object) =>
//   requestWithApiKey('/send-mail', apiKey, { method: 'POST', body: JSON.stringify(data) });
