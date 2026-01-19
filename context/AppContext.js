
import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_POSTS, INITIAL_CATEGORIES, INITIAL_SETTINGS } from '../constants.js';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [posts, setPosts] = useState(() => JSON.parse(localStorage.getItem('ckc_posts')) || INITIAL_POSTS);
  const [categories, setCategories] = useState(() => JSON.parse(localStorage.getItem('ckc_categories')) || INITIAL_CATEGORIES);
  const [settings, setSettings] = useState(() => JSON.parse(localStorage.getItem('ckc_settings')) || INITIAL_SETTINGS);
  const [subscribers, setSubscribers] = useState(() => JSON.parse(localStorage.getItem('ckc_subscribers')) || []);
  const [auth, setAuth] = useState(() => JSON.parse(localStorage.getItem('ckc_auth')) || { isAuthenticated: false, user: null });

  useEffect(() => localStorage.setItem('ckc_posts', JSON.stringify(posts)), [posts]);
  useEffect(() => localStorage.setItem('ckc_categories', JSON.stringify(categories)), [categories]);
  useEffect(() => localStorage.setItem('ckc_settings', JSON.stringify(settings)), [settings]);
  useEffect(() => localStorage.setItem('ckc_auth', JSON.stringify(auth)), [auth]);
  useEffect(() => localStorage.setItem('ckc_subscribers', JSON.stringify(subscribers)), [subscribers]);

  const addPost = post => setPosts(prev => [post, ...prev]);
  const updatePost = (id, updated) => setPosts(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
  const deletePost = id => setPosts(prev => prev.filter(p => p.id !== id));
  const login = pass => {
    if (pass === 'admin123') { setAuth({ isAuthenticated: true, user: { name: 'Admin', role: 'admin' } }); return true; }
    return false;
  };
  const logout = () => setAuth({ isAuthenticated: false, user: null });
  const subscribe = email => !subscribers.find(s => s.email === email) && setSubscribers(prev => [...prev, { id: Date.now().toString(), email, date: new Date().toISOString() }]);

  return (
    <AppContext.Provider value={{ posts, categories, settings, auth, subscribers, addPost, updatePost, deletePost, login, logout, subscribe }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
