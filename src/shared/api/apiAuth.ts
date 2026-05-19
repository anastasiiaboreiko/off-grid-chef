import type { User } from "../types/User";
import type { UserRegistration } from '../types/UserRegistration';

const API_URL = import.meta.env.VITE_API_URL;

type LoginResponse = {
  access: string;
  refresh: string;
}

export async function signupUser(data: UserRegistration): Promise<User> {
  const response = await fetch(`${API_URL}/users/signup/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json()
    throw errorData;
  }

  return response.json();
};

export async function loginUser(data: Pick<UserRegistration, 'email' | 'password'>): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/users/login/`, {
    method: 'POST', 
    headers:  {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json()
    throw errorData;
  }

  return response.json();
};

export async function getCurrentUser(accessToken: string): Promise<User> {
  const response = await fetch(`${API_URL}/users/me/`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to get current user')
  }

  return response.json();
};

export async function logoutUser(
  accessToken: string,
  refreshToken: string,
): Promise<void> {

  const response = await fetch(`${API_URL}/users/logout/`, {
    method: 'POST',
    headers:  {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      refresh: refreshToken,
    }),
  });
  if (!response.ok) {
    throw new Error('Failed to logout');
  }
};