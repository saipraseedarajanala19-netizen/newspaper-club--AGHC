
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Post, Category, SiteSettings, AuthState, Subscriber } from '../types';
import { INITIAL_POSTS, INITIAL_CATEGORIES, INITIAL_SETTINGS } from '../constants';

interface AppContextType {
  posts: Post[];
  categories: Category[];
  settings: SiteSettings;
  auth: AuthState;
  subscribers: Subscriber[];
  addPost: (post: Post) => void;
  updatePost: (id: string, post: Partial<Post>) => void;
  deletePost: (id: string) => void;
  addCategory: (category: Category) => void;
  updateSettings: (settings: SiteSettings) => void;
  login: (password: string) => boolean;
  logout: () => void;
  subscribe: (email: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem('ckc_posts');
    return saved ? JSON.parse(saved) : INITIAL_POSTS;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('ckc_categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('ckc_settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  const [subscribers, setSubscribers] = useState<Subscriber[]>(() => {
    const saved = localStorage.getItem('ckc_subscribers');
    return saved ? JSON.parse(saved) : [];
  });

  const [auth, setAuth] = useState<AuthState>(() => {
    const saved = localStorage.getItem('ckc_auth');
    return saved ? JSON.parse(saved) : { isAuthenticated: false, user: null };
  });

  useEffect(() => {
    localStorage.setItem('ckc_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('ckc_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('ckc_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('ckc_auth', JSON.stringify(auth));
  }, [auth]);

  useEffect(() => {
    localStorage.setItem('ckc_subscribers', JSON.stringify(subscribers));
  }, [subscribers]);

  const addPost = (post: Post) => setPosts(prev => [post, ...prev]);
  const updatePost = (id: string, updated: Partial<Post>) => 
    setPosts(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
  const deletePost = (id: string) => setPosts(prev => prev.filter(p => p.id !== id));
  
  const addCategory = (category: Category) => setCategories(prev => [...prev, category]);
  const updateSettings = (newSettings: SiteSettings) => setSettings(newSettings);

  const login = (password: string) => {
    if (password === 'admin123') { // Simple simulation
      setAuth({ isAuthenticated: true, user: { name: 'Admin User', role: 'admin' } });
      return true;
    }
    return false;
  };

  const logout = () => setAuth({ isAuthenticated: false, user: null });

  const subscribe = (email: string) => {
    if (!subscribers.find(s => s.email === email)) {
      setSubscribers(prev => [...prev, { id: Date.now().toString(), email, date: new Date().toISOString() }]);
    }
  };

  return (
    <AppContext.Provider value={{ 
      posts, categories, settings, auth, subscribers,
      addPost, updatePost, deletePost, addCategory, 
      updateSettings, login, logout, subscribe 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
