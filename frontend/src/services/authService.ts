const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export const register = async (data: { name: string; email: string; password: string }) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Erro ao registrar usuário');
  }
  return res.json();
};

export const login = async (data: { email: string; password: string }) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // JWT cookie
    body: JSON.stringify(data),
  });
  console.log(res);
};

export const logout = async () => {
  const res = await fetch(`${API_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Erro ao deslogar');
  return res.json();
};
