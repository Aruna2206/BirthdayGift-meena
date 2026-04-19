import { API_BASE_URL } from './config';

export const adminLogin = async (formData: URLSearchParams) => {
  const response = await fetch(`${API_BASE_URL}/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Invalid credentials');
  }

  return response.json();
};
