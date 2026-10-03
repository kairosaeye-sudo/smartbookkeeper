const BASE = '';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || `Request failed: ${res.status}`);
  }
  return data;
}

export const api = {
  // Auth
  login: (email: string, password: string) =>
    request<{ user: any }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  register: (name: string, email: string, password: string, businessName: string) =>
    request<{ user: any }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, businessName }),
    }),
  logout: () => request('/api/auth/logout', { method: 'POST' }),
  me: () => request<{ user: any }>('/api/auth/me'),

  // Transactions
  getTransactions: () => request<{ transactions: any[] }>('/api/transactions'),
  createTransaction: (t: any) =>
    request<{ transaction: any }>('/api/transactions', {
      method: 'POST',
      body: JSON.stringify(t),
    }),
  updateTransaction: (id: string, t: any) =>
    request<{ transaction: any }>(`/api/transactions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(t),
    }),
  deleteTransaction: (id: string) =>
    request(`/api/transactions/${id}`, { method: 'DELETE' }),

  // Receipts
  getReceipts: () => request<{ receipts: any[] }>('/api/receipts'),
  createReceipt: (r: any) =>
    request<{ receipt: any }>('/api/receipts', {
      method: 'POST',
      body: JSON.stringify(r),
    }),
  updateReceipt: (id: string, r: any) =>
    request<{ receipt: any }>(`/api/receipts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(r),
    }),

  // Categories
  getCategories: () => request<{ categories: any[] }>('/api/categories'),
  createCategory: (c: any) =>
    request<{ category: any }>('/api/categories', {
      method: 'POST',
      body: JSON.stringify(c),
    }),
  updateCategory: (id: string, c: any) =>
    request<{ category: any }>(`/api/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(c),
    }),

  // Reports
  getReport: () => request<{ report: any }>('/api/reports'),
};
