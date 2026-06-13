const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getHeaders(isFormData = false): HeadersInit {
    const headers: HeadersInit = {};
    const token = localStorage.getItem('admin_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }
    return headers;
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: this.getHeaders(),
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }
    return response.json();
  }

  async post<T>(endpoint: string, data: Record<string, unknown> | FormData): Promise<T> {
    const isFormData = data instanceof FormData;
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(isFormData),
      body: isFormData ? data : JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }
    return response.json();
  }

  async put<T>(endpoint: string, data: Record<string, unknown> | FormData): Promise<T> {
    const isFormData = data instanceof FormData;
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PUT',
      headers: this.getHeaders(isFormData),
      body: isFormData ? data : JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }
    return response.json();
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }
    return response.json();
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
export { API_BASE_URL };

export const getImageUrl = (imagePath: string | null | undefined): string => {
  if (!imagePath) return '';
  if (
    imagePath.startsWith('http://') || 
    imagePath.startsWith('https://') || 
    imagePath.startsWith('data:') || 
    imagePath.startsWith('blob:')
  ) {
    return imagePath;
  }
  const serverBase = API_BASE_URL.replace(/\/api$/, '');
  return `${serverBase}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
};
