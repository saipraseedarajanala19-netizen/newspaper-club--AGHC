
export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  summary: string;
  author: string;
  category: string;
  tags: string[];
  image: string;
  status: 'published' | 'draft';
  date: string;
  metaTitle?: string;
  metaDescription?: string;
  featured: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Subscriber {
  id: string;
  email: string;
  date: string;
}

export interface SiteSettings {
  siteTitle: string;
  description: string;
  primaryColor: string;
  accentColor: string;
  fontFamily: 'Inter' | 'Serif';
  logo: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: {
    name: string;
    role: 'admin' | 'editor';
  } | null;
}
