import { apiClient } from './client';

export interface LoginResponse {
  token: string;
  user: { id: number; username: string };
}

export interface StatsResponse {
  projects: { total: number; active: number };
  certificates: { total: number; active: number };
  categories: { name: string; slug: string; count: number }[];
}

export const login = (username: string, password: string) =>
  apiClient.post<LoginResponse>('/auth/login', { username, password } as unknown as Record<string, unknown>);

export const verifyToken = () =>
  apiClient.get<{ user: { id: number; username: string; created_at: string } }>('/auth/me');

export const fetchStats = () => apiClient.get<StatsResponse>('/stats');

export const updateProfile = (data: { username: string; oldPassword?: string; newPassword?: string }) =>
  apiClient.put<{ message: string; username: string }>('/auth/profile', data as unknown as Record<string, unknown>);
