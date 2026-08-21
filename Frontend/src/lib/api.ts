export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

export function authHeader(token?: string | null) {
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}
