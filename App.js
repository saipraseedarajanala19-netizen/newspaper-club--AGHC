
import React from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, Navigate, Outlet } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext.js';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import Home from './pages/Home.js';
import PostDetail from './pages/PostDetail.js';
import AdminDashboard from './pages/admin/AdminDashboard.js';
import AdminPosts from './pages/admin/AdminPosts.js';
import PostEditor from './pages/admin/PostEditor.js';
import Settings from './pages/admin/Settings.js';
import Newsletter from './pages/admin/Newsletter.js';
import Login from './pages/admin/Login.js';
import { LayoutDashboard, FileText, Settings as SettingsIcon, Mail, ExternalLink, LogOut } from 'lucide-react';

const PublicLayout = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-grow"><Outlet /></main>
    <Footer />
  </div>
);

const AdminLayout = () => {
  const { auth, logout } = useApp();
  const location = useLocation();
  if (!auth.isAuthenticated) return <Navigate to="/login" replace />;

  const links = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Posts', path: '/admin/posts', icon: FileText },
    { name: 'Newsletter', path: '/admin/newsletter', icon: Mail },
    { name: 'Settings', path: '/admin/settings', icon: SettingsIcon },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50">
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col sticky top-0 h-screen hidden md:flex">
        <div className="p-8">
          <div className="flex items-center space-x-3 text-white mb-10">
            <span className="text-3xl">📰</span>
            <span className="text-xl font-bold serif tracking-tight">Editor Hub</span>
          </div>
          <nav className="space-y-1">
            {links.map(link => (
              <Link key={link.path} to={link.path} className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all ${location.pathname === link.path ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-800 hover:text-white'}`}>
                <link.icon className="w-4 h-4 mr-3" /> {link.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-8 border-t border-slate-800">
          <Link to="/" className="flex items-center text-xs text-slate-500 hover:text-white mb-4 transition-colors">
            <ExternalLink className="w-3 h-3 mr-2" /> View Public Site
          </Link>
          <button onClick={logout} className="w-full flex items-center px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-xl text-sm font-medium transition-colors">
            <LogOut className="w-4 h-4 mr-3" /> Sign Out
          </button>
        </div>
      </aside>
      <main className="flex-grow p-8 md:p-12 overflow-y-auto"><div className="max-w-6xl mx-auto"><Outlet /></div></main>
    </div>
  );
};

const App = () => (
  <AppProvider>
    <Router>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/post/:slug" element={<PostDetail />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="posts" element={<AdminPosts />} />
          <Route path="posts/new" element={<PostEditor />} />
          <Route path="posts/edit/:id" element={<PostEditor />} />
          <Route path="newsletter" element={<Newsletter />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  </AppProvider>
);

export default App;
