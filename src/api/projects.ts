import { apiClient } from './client';

export interface ApiProject {
  id: number;
  slug: string;
  title: string;
  description: string;
  full_description: string;
  image: string | null;
  github_url: string | null;
  live_url: string | null;
  demo_url: string | null;
  category_id: number | null;
  category_name: string | null;
  category_slug: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  tags: string[];
  techStack: string[];
  features: string[];
  gallery: { id: number; image_path: string; sort_order: number }[];
}

export interface ApiCategory {
  id: number;
  name: string;
  slug: string;
  project_count: number;
}

// Public
export const fetchProjects = () => apiClient.get<ApiProject[]>('/projects');
export const fetchProjectBySlug = (slug: string) => apiClient.get<ApiProject>(`/projects/${slug}`);
export const fetchProjectsByCategory = (slug: string) => apiClient.get<ApiProject[]>(`/projects/category/${slug}`);
export const fetchCategories = () => apiClient.get<ApiCategory[]>('/categories');

// Admin
export const fetchAllProjects = () => apiClient.get<ApiProject[]>('/projects/admin/all');
export const createProject = (data: FormData) => apiClient.post<ApiProject>('/projects/admin', data);
export const updateProject = (id: number, data: FormData) => apiClient.put<ApiProject>(`/projects/admin/${id}`, data);
export const deleteProject = (id: number) => apiClient.delete<{ message: string }>(`/projects/admin/${id}`);
export const uploadGalleryImages = (id: number, data: FormData) => apiClient.post<{ id: number; image_path: string }[]>(`/projects/admin/${id}/gallery`, data);
export const deleteGalleryImage = (galleryId: number) => apiClient.delete<{ message: string }>(`/projects/admin/gallery/${galleryId}`);
export const reorderProject = (id: number, sort_order: number) => apiClient.put<{ message: string }>(`/projects/admin/${id}/reorder`, { sort_order } as unknown as Record<string, unknown>);
