import axios from 'axios';
import type { 
  ApiResponse, 
  SiteData, 
  ProjectsResponse, 
  Project, 
  ExperienceResponse,
  ContactFormData,
  ContactResponse 
} from '../types';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.error || error.message || 'An error occurred';
    console.error('API Error:', message);
    return Promise.reject(new Error(message));
  }
);

// Site API
export const getSiteData = async (): Promise<SiteData> => {
  const { data } = await api.get<ApiResponse<SiteData>>('/site');
  if (!data.success || !data.data) throw new Error(data.error || 'Failed to fetch site data');
  return data.data;
};

// Projects API
export const getProjects = async (featured?: boolean): Promise<ProjectsResponse> => {
  const params = featured ? { featured: 'true' } : {};
  const { data } = await api.get<ApiResponse<ProjectsResponse>>('/projects', { params });
  if (!data.success || !data.data) throw new Error(data.error || 'Failed to fetch projects');
  return data.data;
};

export const getProject = async (slug: string): Promise<Project> => {
  const { data } = await api.get<ApiResponse<Project>>(`/projects/${slug}`);
  if (!data.success || !data.data) throw new Error(data.error || 'Failed to fetch project');
  return data.data;
};

// Experience API
export const getExperience = async (): Promise<ExperienceResponse> => {
  const { data } = await api.get<ApiResponse<ExperienceResponse>>('/experience');
  if (!data.success || !data.data) throw new Error(data.error || 'Failed to fetch experience');
  return data.data;
};

// Contact API
export const submitContact = async (formData: ContactFormData): Promise<ContactResponse> => {
  const { data } = await api.post<ApiResponse<ContactResponse>>('/contact', formData);
  if (!data.success || !data.data) throw new Error(data.error || 'Failed to submit contact form');
  return data.data;
};

export default api;
