// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Site types
export interface SocialLink {
  platform: string;
  url: string;
  icon?: string;
}

export interface SiteData {
  _id: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  profileImage: string;
  resumeUrl: string;
  location: string;
  currentRole?: string;
  currentCompany?: string;
  email: string;
  socialLinks: SocialLink[];
  skills: string[];
  aboutText: string;
  themeDefault: 'light' | 'dark';
}

// Project types
export interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  longDescription?: string;
  technologies: string[];
  tech?: string[];
  images: string[];
  thumbnailUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  repoUrl?: string;
  date: string;
  featured: boolean;
  order: number;
}

export interface ProjectsResponse {
  projects: Project[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Experience types
export interface Experience {
  _id: string;
  company: string;
  role: string;
  type: 'work' | 'education' | 'achievement' | 'hackathon';
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  location?: string;
  tech?: string[];
  order: number;
}

export interface ExperienceResponse {
  all: Experience[];
  grouped: {
    work: Experience[];
    education: Experience[];
    achievements: Experience[];
    hackathons: Experience[];
  };
}

// Contact types
export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
  website?: string; // honeypot
}

export interface ContactResponse {
  message: string;
  id: string;
}
