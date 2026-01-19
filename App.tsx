
import React from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, Navigate, Outlet } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext.tsx';
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import Home from './pages/Home.tsx';
import PostDetail from './pages/PostDetail.tsx';
import AdminDashboard from './pages/admin/AdminDashboard.tsx';
import AdminPosts from './pages/admin/AdminPosts.tsx';
import PostEditor from './pages/admin/PostEditor.tsx';
import Settings from './pages/admin/Settings.tsx';
import Newsletter from './pages/admin/Newsletter.tsx';
import Login from './pages/admin/Login.tsx';
import { LayoutDashboard, FileText, Settings as SettingsIcon, Mail, ExternalLink, LogOut } from 'lucide-react';

const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const AdminLayout: React.FC = () => {
  const { auth, logout } = useApp();
  const location = useLocation();

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const sidebarLinks = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Posts', path: '/admin/posts', icon: FileText },
    { name: 'Newsletter', path: '/admin/newsletter', icon: Mail },
    { name: 'Settings', path: '/admin/settings', icon: SettingsIcon },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col sticky top-0 h-screen hidden md:flex">
        <div className="p-6">
          <div className="flex items-center space-x-2 text-white mb-8">
            <span className="text-2xl">📰</span>
            <span className="text-lg font-bold">AGHC Admin</span>
          </div>
          
          <nav className="space-y-2">
            {sidebarLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  location.pathname === link.path ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <link.icon className="w-5 h-5 mr-3" /> {link.name}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="mt-auto p-6 space-y-4">
          <Link to="/" className="flex items-center text-xs font-bold text-slate-500 hover:text-white transition-colors">
            <ExternalLink className="w-4 h-4 mr-2" /> View Website
          </Link>
          <button 
            onClick={logout}
            className="w-full flex items-center px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-xl text-sm font-medium transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" /> Log Out
          </button>
        </div>
      </aside>

      {/* Main Admin Area */}
      <main className="flex-grow p-8 md:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/post/:slug" element={<PostDetail />} />
            <Route path="/about" element={<div className="max-w-3xl mx-auto py-24 text-center">
               <h1 className="text-4xl font-bold mb-6 serif">About the Newspaper Club</h1>
               <p className="text-lg text-slate-600 leading-relaxed font-light">We are a student-led organization at AGHC dedicated to reporting, storytelling, and academic discovery. Our platform serves as an open archive for club news and student insights.</p>
            </div>} />
            <Route path="/contact" element={<div className="max-w-3xl mx-auto py-24 text-center">
               <h1 className="text-4xl font-bold mb-6 serif">Get in Touch</h1>
               <p className="text-lg text-slate-600 leading-relaxed font-light">Interested in contributing? Reach out to our editorial team at newspaper-club@aghc.edu</p>
            </div>} />
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
};

export default App;
