import { apiClient } from './client';

export interface ApiCertificate {
  id: number;
  title: string;
  issuer: string;
  description: string;
  credential_id: string | null;
  credential_url: string | null;
  image: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  skills: string[];
}

// Public
export const fetchCertificates = () => apiClient.get<ApiCertificate[]>('/certificates');

// Admin
export const fetchAllCertificates = () => apiClient.get<ApiCertificate[]>('/certificates/admin/all');
export const createCertificate = (data: FormData) => apiClient.post<ApiCertificate>('/certificates/admin', data);
export const updateCertificate = (id: number, data: FormData) => apiClient.put<ApiCertificate>(`/certificates/admin/${id}`, data);
export const deleteCertificate = (id: number) => apiClient.delete<{ message: string }>(`/certificates/admin/${id}`);
export const reorderCertificate = (id: number, sort_order: number) => apiClient.put<{ message: string }>(`/certificates/admin/${id}/reorder`, { sort_order } as unknown as Record<string, unknown>);
