
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  HashRouter as Router, 
  Routes, 
  Route, 
  Link, 
  useLocation, 
  Navigate, 
  Outlet, 
  useParams, 
  useNavigate 
} from 'react-router-dom';
import { 
  LayoutDashboard, FileText, Settings as SettingsIcon, Mail, ExternalLink, LogOut, 
  Search, Menu, X, User, Twitter, Linkedin, Facebook, Send, Calendar, ArrowRight, 
  BookOpen, ChevronLeft, Tag, Share2, Sparkles, Loader2, Save, Eye, Image as ImageIcon, 
  Plus, Trash2, Edit2, ShieldCheck, Palette, Lock, TrendingUp, Filter 
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
// Always use import {GoogleGenAI} from "@google/genai";
import { GoogleGenAI, Type } from '@google/genai';

// --- Constants & Types ---
const INITIAL_CATEGORIES = [
  { id: '1', name: 'Science', slug: 'science' },
  { id: '2', name: 'Humanities', slug: 'humanities' },
  { id: '3', name: 'Technology', slug: 'technology' },
  { id: '4', name: 'Arts', slug: 'arts' },
];

const INITIAL_POSTS = [
  {
    id: '1',
    title: 'Quantum Frontiers in Higher Education',
    slug: 'quantum-frontiers',
    content: '<h2>A New Academic Dimension</h2><p>Quantum computing is transitioning from purely theoretical physics into an applied disciplinary force across global universities.</p><p>We are seeing an unprecedented level of integration between traditional computer science and the quantum realm.</p>',
    summary: 'Exploring how quantum shifts are redefining the landscape of collegiate research and technology departments.',
    author: 'Dr. Sarah Mitchell',
    category: 'Technology',
    tags: ['Quantum', 'Future', 'Academia'],
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1200',
    status: 'published',
    date: '2024-05-15',
    featured: true,
  },
  {
    id: '2',
    title: 'The Renaissance of Campus Journalism',
    slug: 'campus-journalism',
    content: '<h2>Truth in Education</h2><p>Student-led reporting is seeing a resurgence in the digital age, with blogs replacing traditional newsletters.</p>',
    summary: 'How modern platforms are empowering students to become the primary voices of their institutional culture.',
    author: 'James Wilson',
    category: 'Humanities',
    tags: ['Media', 'Culture', 'Students'],
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200',
    status: 'published',
    date: '2024-05-16',
    featured: false,
  }
];

const INITIAL_SETTINGS = {
  siteTitle: 'NEWSPAPER CLUB - AGHC',
  description: 'The definitive platform for knowledge sharing and academic journalism at AGHC.',
  primaryColor: '#0f172a',
  logo: '📰',
};

// --- Context ---
const AppContext = createContext<any>(null);

// Fix for children missing error by explicitly using React.FC which often resolves subtle TS errors with children in certain environments
const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('ckc_posts');
    return saved ? JSON.parse(saved) : INITIAL_POSTS;
  });
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('ckc_categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('ckc_settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });
  const [subscribers, setSubscribers] = useState(() => {
    const saved = localStorage.getItem('ckc_subscribers');
    return saved ? JSON.parse(saved) : [];
  });
  const [auth, setAuth] = useState(() => {
    const saved = localStorage.getItem('ckc_auth');
    return saved ? JSON.parse(saved) : { isAuthenticated: false, user: null };
  });

  useEffect(() => localStorage.setItem('ckc_posts', JSON.stringify(posts)), [posts]);
  useEffect(() => localStorage.setItem('ckc_categories', JSON.stringify(categories)), [categories]);
  useEffect(() => localStorage.setItem('ckc_settings', JSON.stringify(settings)), [settings]);
  useEffect(() => localStorage.setItem('ckc_auth', JSON.stringify(auth)), [auth]);
  useEffect(() => localStorage.setItem('ckc_subscribers', JSON.stringify(subscribers)), [subscribers]);

  const addPost = (post: any) => setPosts((prev: any) => [post, ...prev]);
  const updatePost = (id: string, updated: any) => setPosts((prev: any) => prev.map((p: any) => p.id === id ? { ...p, ...updated } : p));
  const deletePost = (id: string) => setPosts((prev: any) => prev.filter((p: any) => p.id !== id));
  const updateSettings = (newSettings: any) => setSettings(newSettings);
  const login = (pass: string) => {
    if (pass === 'admin123') { 
      setAuth({ isAuthenticated: true, user: { name: 'Admin', role: 'admin' } }); 
      return true; 
    }
    return false;
  };
  const logout = () => setAuth({ isAuthenticated: false, user: null });
  const subscribe = (email: string) => {
    if (!subscribers.find((s: any) => s.email === email)) {
      setSubscribers((prev: any) => [...prev, { id: Date.now().toString(), email, date: new Date().toISOString() }]);
    }
  };

  return (
    <AppContext.Provider value={{ 
      posts, categories, settings, auth, subscribers, 
      addPost, updatePost, deletePost, updateSettings, 
      login, logout, subscribe 
    }}>
      {children}
    </AppContext.Provider>
  );
};

const useApp = () => useContext(AppContext);

// --- Shared Components ---
const Navbar = () => {
  const { settings, auth } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl">{settings.logo}</span>
            <span className="text-xl font-bold text-slate-900 serif">{settings.siteTitle}</span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`text-sm font-medium ${location.pathname === '/' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}>Feed</Link>
            <Link to="/about" className="text-sm font-medium text-slate-600 hover:text-blue-600">Archives</Link>
            <Link to={auth.isAuthenticated ? "/admin" : "/login"} className="p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"><User className="w-5 h-5" /></Link>
          </div>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-slate-600"><Menu /></button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-4 shadow-lg animate-in fade-in slide-in-from-top-4">
          <Link to="/" onClick={() => setIsOpen(false)} className="block font-medium">Feed</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="block font-medium">Archives</Link>
          <Link to="/login" onClick={() => setIsOpen(false)} className="block font-medium">Login</Link>
        </div>
      )}
    </nav>
  );
};

const Footer = () => {
  const { settings, subscribe } = useApp();
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { subscribe(email); setDone(true); setEmail(''); setTimeout(() => setDone(false), 3000); }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2">
            <div className="flex items-center space-x-2 text-white mb-6">
              <span className="text-2xl">{settings.logo}</span>
              <span className="text-xl font-bold serif">{settings.siteTitle}</span>
            </div>
            <p className="max-w-sm text-slate-400 leading-relaxed">{settings.description}</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Explore</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Latest Feed</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About the Club</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Admin Portal</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Newsletter</h4>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                placeholder="Email address" 
                className="bg-slate-800 border-none rounded-lg px-4 py-2 text-sm text-white flex-grow outline-none focus:ring-2 focus:ring-blue-500" 
                required 
              />
              <button className="bg-blue-600 p-2 rounded-lg text-white hover:bg-blue-700 transition-colors"><Send className="w-4 h-4" /></button>
            </form>
            {done && <p className="text-emerald-400 text-xs mt-2 animate-pulse">Successfully subscribed!</p>}
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 text-xs text-slate-500 flex justify-between">
          <span>© 2024 AGHC Newspaper Club. All rights reserved.</span>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white"><Twitter className="w-4 h-4" /></a>
            <a href="#" className="hover:text-white"><Linkedin className="w-4 h-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Pages ---
const Home = () => {
  const { posts } = useApp();
  const featured = posts.find((p: any) => p.featured && p.status === 'published') || posts[0];
  const others = posts.filter((p: any) => p.status === 'published' && p.id !== featured?.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {featured && (
        <Link to={`/post/${featured.slug}`} className="block relative h-[500px] rounded-[2.5rem] overflow-hidden mb-16 group shadow-2xl">
          <img src={featured.image} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-[2s] ease-out" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
          <div className="absolute bottom-12 left-12 right-12 max-w-3xl">
            <span className="bg-blue-600 text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6 inline-block shadow-lg">Featured Research</span>
            <h1 className="text-4xl md:text-6xl text-white font-bold serif mb-6 leading-tight group-hover:underline underline-offset-8 decoration-2">{featured.title}</h1>
            <p className="text-slate-200 text-lg line-clamp-2 font-light opacity-90">{featured.summary}</p>
          </div>
        </Link>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {others.map((post: any) => (
          <Link key={post.id} to={`/post/${post.slug}`} className="group flex flex-col h-full">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-6 shadow-sm border border-gray-100">
              <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="flex-grow">
              <span className="text-blue-600 text-[10px] font-bold uppercase tracking-widest mb-3 block">{post.category}</span>
              <h3 className="text-2xl font-bold serif group-hover:text-blue-600 transition-colors mb-4 leading-snug">{post.title}</h3>
              <p className="text-slate-500 text-sm font-light line-clamp-2 leading-relaxed mb-6">{post.summary}</p>
            </div>
            <div className="flex items-center text-[10px] font-bold text-slate-400 uppercase tracking-wider pb-2 border-b border-transparent group-hover:border-blue-100">
              {post.author} • {new Date(post.date).toLocaleDateString()}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const PostDetail = () => {
  const { slug } = useParams();
  const { posts } = useApp();
  const post = posts.find((p: any) => p.slug === slug);

  if (!post) return <Navigate to="/" />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <Link to="/" className="inline-flex items-center text-sm text-slate-400 hover:text-blue-600 mb-12 transition-all hover:-translate-x-1">
        <ChevronLeft className="w-4 h-4 mr-1" /> Return to feed
      </Link>
      <header className="mb-16">
        <span className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-6 block">{post.category}</span>
        <h1 className="text-5xl md:text-6xl font-bold serif leading-tight mb-10 tracking-tight">{post.title}</h1>
        <div className="flex items-center justify-between py-8 border-y border-gray-100">
          <div className="flex items-center space-x-4">
            <img src={`https://ui-avatars.com/api/?name=${post.author}&background=random&color=fff`} className="w-12 h-12 rounded-full ring-2 ring-slate-100" />
            <div>
              <p className="font-bold text-slate-900">{post.author}</p>
              <p className="text-xs text-slate-400 font-medium">{new Date(post.date).toLocaleDateString()} • 8 min read</p>
            </div>
          </div>
          <div className="flex space-x-3">
             <button className="p-2.5 bg-slate-50 text-slate-400 hover:bg-blue-50 hover:text-blue-600 rounded-full transition-all"><Twitter className="w-5 h-5" /></button>
             <button className="p-2.5 bg-slate-50 text-slate-400 hover:bg-slate-900 hover:text-white rounded-full transition-all"><Share2 className="w-5 h-5" /></button>
          </div>
        </div>
      </header>
      <img src={post.image} className="w-full rounded-[3rem] shadow-2xl mb-16 ring-1 ring-slate-200" />
      <article className="prose prose-slate prose-lg max-w-none text-slate-700 font-light leading-relaxed mb-20" dangerouslySetInnerHTML={{ __html: post.content }} />
      
      <div className="bg-slate-50 rounded-[2.5rem] p-12 border border-slate-100 flex flex-col md:flex-row items-center gap-8">
        <img src={`https://ui-avatars.com/api/?name=${post.author}&size=128`} className="w-24 h-24 rounded-full" />
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold mb-2">About {post.author}</h3>
          <p className="text-slate-500 text-sm leading-relaxed max-w-xl">
            Frequent contributor to the AGHC Newspaper Club. Specializing in multidisciplinary academic studies and institutional research.
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Admin Pages ---
const PostEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, categories, addPost, updatePost } = useApp();
  const [isAiLoading, setIsAiLoading] = useState(false);
  
  const [form, setForm] = useState({
    title: '', slug: '', content: '', summary: '', author: 'Editorial Board',
    category: 'Science', tags: [], image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1200',
    status: 'draft', featured: false
  });

  useEffect(() => {
    if (id) { 
      const p = posts.find((item: any) => item.id === id); 
      if (p) setForm(p); 
    }
  }, [id, posts]);

  const generateWithAi = async () => {
    if (!form.content || form.content.length < 50) return alert('Draft at least 50 characters of content first!');
    setIsAiLoading(true);
    try {
      // Create new GoogleGenAI instance with named parameters and direct process.env.API_KEY
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const resp = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze this article and provide a 1-sentence academic summary and 3 relevant tags.
                  Title: ${form.title}
                  Article Body: ${form.content.substring(0, 2000)}`,
        config: { 
          responseMimeType: "application/json",
          responseSchema: { 
            type: Type.OBJECT, 
            properties: { 
              summary: { type: Type.STRING }, 
              tags: { type: Type.ARRAY, items: { type: Type.STRING } } 
            },
            required: ["summary", "tags"]
          }
        }
      });
      // Extract response text property directly
      const res = JSON.parse(resp.text);
      setForm(prev => ({ ...prev, summary: res.summary, tags: res.tags }));
    } catch (e) { 
      console.error(e);
      alert('AI Assistant is currently unavailable.'); 
    } finally { 
      setIsAiLoading(false); 
    }
  };

  const save = () => {
    if (!form.title) return alert('Title is required');
    const slug = form.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '');
    if (id) updatePost(id, { ...form, slug });
    else addPost({ ...form, id: Date.now().toString(), date: new Date().toISOString(), slug });
    navigate('/admin/posts');
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/admin/posts" className="p-2 text-slate-400 hover:text-slate-900 hover:bg-white rounded-xl transition-all"><ChevronLeft /></Link>
          <h1 className="text-3xl font-bold serif">{id ? 'Refine Thesis' : 'Draft New Insight'}</h1>
        </div>
        <button onClick={save} className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold flex items-center hover:bg-blue-700 transition-all shadow-xl shadow-blue-200">
          <Save className="w-4 h-4 mr-2" /> Commit to Archive
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
            <input 
              className="w-full text-4xl font-bold serif outline-none border-none placeholder:text-slate-200 bg-transparent" 
              placeholder="Article Heading..." 
              value={form.title} 
              onChange={e => setForm({...form, title: e.target.value})} 
            />
            
            <div className="flex items-center justify-between border-b border-slate-50 pb-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Primary Manuscript</span>
              <button 
                onClick={generateWithAi} 
                disabled={isAiLoading} 
                className="text-xs font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-full flex items-center hover:bg-blue-100 transition-all disabled:opacity-50"
              >
                {isAiLoading ? <Loader2 className="w-3 h-3 mr-2 animate-spin" /> : <Sparkles className="w-3 h-3 mr-2" />} 
                {isAiLoading ? 'Synthesizing...' : 'AI Metadata Assistant'}
              </button>
            </div>

            <textarea 
              className="w-full min-h-[500px] outline-none border-none leading-relaxed font-light text-slate-700 text-xl resize-none bg-transparent" 
              placeholder="Begin your academic narrative here. HTML tags supported for styling..." 
              value={form.content} 
              onChange={e => setForm({...form, content: e.target.value})} 
            />
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Abstract (Summary)</label>
            <textarea 
              className="w-full p-6 bg-slate-50 border-none rounded-2xl outline-none text-sm text-slate-600 focus:ring-2 focus:ring-blue-100 min-h-[100px]" 
              placeholder="A concise summary for the homepage feed..." 
              value={form.summary} 
              onChange={e => setForm({...form, summary: e.target.value})} 
            />
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-900 border-b border-slate-50 pb-4 flex items-center">
              <SettingsIcon className="w-4 h-4 mr-3" /> Taxonomy
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-bold block mb-2 uppercase text-slate-400">Category</label>
                <select 
                  className="w-full p-4 bg-slate-50 rounded-2xl outline-none text-sm border-none ring-1 ring-slate-100 focus:ring-2 focus:ring-blue-100 transition-all" 
                  value={form.category} 
                  onChange={e => setForm({...form, category: e.target.value})}
                >
                  {categories.map((c: any) => <option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold block mb-2 uppercase text-slate-400">Publication Status</label>
                <select 
                  className="w-full p-4 bg-slate-50 rounded-2xl outline-none text-sm border-none ring-1 ring-slate-100 focus:ring-2 focus:ring-blue-100" 
                  value={form.status} 
                  onChange={e => setForm({...form, status: e.target.value})}
                >
                  <option value="draft">Draft (Internal Only)</option>
                  <option value="published">Published (Public View)</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-xs font-bold text-slate-600">Pin to Hero</span>
                <input 
                  type="checkbox" 
                  className="w-5 h-5 rounded-lg text-blue-600 border-slate-200 focus:ring-blue-100"
                  checked={form.featured} 
                  onChange={e => setForm({...form, featured: e.target.checked})} 
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-900 border-b border-slate-50 pb-4 flex items-center">
              <ImageIcon className="w-4 h-4 mr-3" /> Cover Image
            </h3>
            <div className="aspect-video bg-slate-50 rounded-3xl overflow-hidden border-2 border-dashed border-slate-200 flex items-center justify-center group relative">
              {form.image ? (
                <img src={form.image} className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="w-8 h-8 text-slate-200" />
              )}
            </div>
            <input 
              className="w-full p-4 bg-slate-50 rounded-2xl outline-none text-[10px] font-mono border-none ring-1 ring-slate-100 focus:ring-2 focus:ring-blue-100" 
              placeholder="Image URL..." 
              value={form.image} 
              onChange={e => setForm({...form, image: e.target.value})} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const { posts, subscribers } = useApp();
  
  const stats = useMemo(() => [
    { label: 'Published Works', val: posts.filter((p: any) => p.status === 'published').length, icon: FileText, bg: 'bg-blue-50', text: 'text-blue-600' },
    { label: 'Growth/Readers', val: subscribers.length, icon: User, bg: 'bg-emerald-50', text: 'text-emerald-600' },
    { label: 'Drafts in Review', val: posts.filter((p: any) => p.status === 'draft').length, icon: Edit2, bg: 'bg-amber-50', text: 'text-amber-600' }
  ], [posts, subscribers]);

  const chartData = [
    { n: 'Mon', v: 420 }, { n: 'Tue', v: 380 }, { n: 'Wed', v: 640 }, 
    { n: 'Thu', v: 820 }, { n: 'Fri', v: 510 }, { n: 'Sat', v: 930 }, { n: 'Sun', v: 750 }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold serif mb-2">Editor's Console</h1>
          <p className="text-slate-400 text-sm font-medium">Monitoring the AGHC Knowledge Feed.</p>
        </div>
        <Link to="/admin/posts/new" className="bg-blue-600 text-white px-8 py-4 rounded-[1.25rem] font-bold flex items-center hover:bg-blue-700 transition-all shadow-xl shadow-blue-100">
          <Plus className="w-5 h-5 mr-2" /> New Entry
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map(s => (
          <div key={s.label} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:translate-y-[-4px] transition-all duration-500">
            <div className={`${s.bg} ${s.text} w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-inner`}><s.icon className="w-7 h-7" /></div>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">{s.label}</p>
            <p className="text-4xl font-bold text-slate-900">{s.val}</p>
          </div>
        ))}
      </div>

      <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm h-[450px]">
        <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-10 text-slate-400 flex items-center">
          <TrendingUp className="w-4 h-4 mr-3" /> Reader Engagement (Last 7 Days)
        </h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
            <XAxis dataKey="n" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} />
            <Tooltip 
              cursor={{ fill: '#f1f5f9', radius: 8 }}
              contentStyle={{ border: 'none', borderRadius: '16px', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 700 }} 
            />
            <Bar dataKey="v" fill="#3b82f6" radius={[8, 8, 8, 8]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const AdminPosts = () => {
  const { posts, deletePost } = useApp();
  
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold serif mb-2">Manuscript Archive</h1>
          <p className="text-slate-400 text-sm font-medium">Curating institutional knowledge.</p>
        </div>
        <Link to="/admin/posts/new" className="bg-blue-600 text-white px-8 py-4 rounded-[1.25rem] font-bold flex items-center hover:bg-blue-700 shadow-xl shadow-blue-100">
          <Plus className="w-5 h-5 mr-2" /> Compose
        </Link>
      </div>

      <div className="bg-white rounded-[3rem] border border-slate-100 overflow-hidden shadow-sm">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
            <input className="w-full pl-12 pr-6 py-3 bg-white rounded-2xl border border-slate-100 outline-none text-sm placeholder:text-slate-300 focus:ring-2 focus:ring-blue-100 transition-all" placeholder="Search archives..." />
          </div>
          <button className="flex items-center text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest">
            <Filter className="w-4 h-4 mr-2" /> Advanced Filter
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              <tr>
                <th className="px-10 py-6">Publication Title</th>
                <th className="px-10 py-6">Discipline</th>
                <th className="px-10 py-6">Visibility</th>
                <th className="px-10 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {posts.map((p: any) => (
                <tr key={p.id} className="group hover:bg-slate-50/50 transition-all duration-300">
                  <td className="px-10 py-8">
                    <div className="flex items-center space-x-6">
                      <img src={p.image} className="w-16 h-12 rounded-xl object-cover shadow-sm ring-1 ring-slate-100" />
                      <div>
                        <p className="font-bold text-slate-900 text-lg mb-1 leading-tight">{p.title}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{p.author}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <span className="px-4 py-1.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full uppercase tracking-widest">{p.category}</span>
                  </td>
                  <td className="px-10 py-8">
                    <span className={`flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest ${p.status === 'published' ? 'text-emerald-500' : 'text-amber-500'}`}>
                      <div className={`w-2 h-2 rounded-full ${p.status === 'published' ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`} />
                      <span>{p.status}</span>
                    </span>
                  </td>
                  <td className="px-10 py-8 text-right space-x-4">
                    <Link to={`/admin/posts/edit/${p.id}`} className="inline-flex p-3 text-slate-400 hover:text-blue-600 hover:bg-white rounded-2xl transition-all shadow-sm shadow-transparent hover:shadow-slate-100"><Edit2 className="w-5 h-5" /></Link>
                    <button onClick={() => deletePost(p.id)} className="p-3 text-slate-400 hover:text-red-600 hover:bg-white rounded-2xl transition-all shadow-sm shadow-transparent hover:shadow-red-50"><Trash2 className="w-5 h-5" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const Newsletter = () => {
  const { subscribers } = useApp();
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-left-4 duration-500">
      <h1 className="text-4xl font-bold serif mb-2">Audience Ledger</h1>
      <div className="bg-white p-12 rounded-[3rem] border border-slate-100 flex items-center space-x-8 shadow-sm">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-[2rem] flex items-center justify-center shadow-inner"><Mail className="w-10 h-10" /></div>
        <div>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Active Subscribers</p>
          <p className="text-5xl font-bold text-slate-900 tracking-tighter">{subscribers.length}</p>
        </div>
      </div>
      <div className="bg-white rounded-[3rem] border border-slate-100 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
            <tr><th className="px-10 py-6">User Email</th><th className="px-10 py-6">Enrollment Date</th><th className="px-10 py-6 text-right">Revoke</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {subscribers.map((s: any) => (
              <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-10 py-8 text-sm font-bold text-slate-800">{s.email}</td>
                <td className="px-10 py-8 text-xs font-medium text-slate-400">{new Date(s.date).toLocaleDateString()}</td>
                <td className="px-10 py-8 text-right"><button className="text-slate-300 hover:text-red-600 p-2"><Trash2 className="w-5 h-5" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Settings = () => {
  const { settings, updateSettings } = useApp();
  const [form, setForm] = useState(settings);
  const [saved, setSaved] = useState(false);

  const handleUpdate = () => {
    updateSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl space-y-12">
      <h1 className="text-4xl font-bold serif mb-2">Platform Config</h1>
      <div className="bg-white p-12 rounded-[3rem] border border-slate-100 space-y-12 shadow-sm">
        <h3 className="text-xl font-bold flex items-center border-b border-slate-50 pb-6"><Palette className="w-6 h-6 mr-4 text-blue-600" /> Branding & Identity</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Institutional Title</label>
            <input type="text" value={form.siteTitle} onChange={e => setForm({...form, siteTitle: e.target.value})} className="w-full p-5 bg-slate-50 rounded-2xl outline-none ring-1 ring-slate-100 focus:ring-2 focus:ring-blue-100 transition-all font-bold" />
          </div>
          <div className="space-y-4">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Heraldic Emoji</label>
            <input type="text" value={form.logo} onChange={e => setForm({...form, logo: e.target.value})} className="w-full p-5 bg-slate-50 rounded-2xl outline-none ring-1 ring-slate-100 focus:ring-2 focus:ring-blue-100 transition-all text-center text-3xl" />
          </div>
          <div className="md:col-span-2 space-y-4">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Mission Statement</label>
            <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full p-5 bg-slate-50 rounded-2xl outline-none ring-1 ring-slate-100 focus:ring-2 focus:ring-blue-100 transition-all text-sm leading-relaxed" rows={3} />
          </div>
        </div>
        <div className="flex items-center space-x-6 pt-6 border-t border-slate-50">
          <button onClick={handleUpdate} className="bg-blue-600 text-white px-10 py-4 rounded-[1.25rem] font-bold shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all">Propagate Changes</button>
          {saved && <span className="text-emerald-600 text-sm font-bold animate-in fade-in zoom-in duration-300">Archive Updated Successfully</span>}
        </div>
      </div>
    </div>
  );
};

const Login = () => {
  const [pass, setPass] = useState('');
  const { login, settings } = useApp();
  const navigate = useNavigate();
  const handle = (e: React.FormEvent) => { e.preventDefault(); if (login(pass)) navigate('/admin'); else alert('Authentication Failed: Invalid Key'); };
  
  return (
    <div className="min-h-[85vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white p-12 rounded-[4rem] shadow-2xl space-y-12 text-center border border-slate-50 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-indigo-600" />
        <div className="text-[6rem] mb-4 drop-shadow-sm group-hover:scale-110 transition-transform duration-700">{settings.logo}</div>
        <div>
          <h1 className="text-3xl font-bold serif mb-3">Institutional Access</h1>
          <p className="text-slate-400 text-sm font-medium">Verify credentials for administrative control.</p>
        </div>
        <form onSubmit={handle} className="space-y-8">
          <div className="relative">
            <Lock className="absolute left-6 top-6 text-slate-300 w-5 h-5" />
            <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="Access Code (admin123)" className="w-full pl-16 pr-6 py-6 bg-slate-50 rounded-[2rem] outline-none ring-1 ring-slate-100 focus:ring-4 focus:ring-blue-100 transition-all font-mono" required />
          </div>
          <button className="w-full bg-slate-900 text-white py-6 rounded-[2rem] font-bold shadow-2xl flex items-center justify-center hover:bg-blue-600 transition-all hover:scale-[1.02] active:scale-[0.98]">
            Authorize Session <ArrowRight className="ml-3 w-5 h-5" />
          </button>
        </form>
        <div className="flex items-center justify-center space-x-2 text-slate-300">
           <ShieldCheck className="w-4 h-4" />
           <span className="text-[10px] font-bold uppercase tracking-widest">End-to-End Encrypted Access</span>
        </div>
      </div>
    </div>
  );
};

// --- Layouts ---
const PublicLayout = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-grow bg-[#fcfcfd]"><Outlet /></main>
    <Footer />
  </div>
);

const AdminLayout = () => {
  const { auth, logout } = useApp();
  const location = useLocation();
  if (!auth.isAuthenticated) return <Navigate to="/login" replace />;
  
  const menu = [
    { n: 'Intelligence', p: '/admin', i: LayoutDashboard },
    { n: 'Manuscripts', p: '/admin/posts', i: FileText },
    { n: 'Constituents', p: '/admin/newsletter', i: Mail },
    { n: 'Protocols', p: '/admin/settings', i: SettingsIcon }
  ];

  return (
    <div className="min-h-screen flex bg-slate-50">
      <aside className="w-80 bg-slate-900 text-slate-400 flex flex-col sticky top-0 h-screen hidden md:flex p-10 border-r border-slate-800">
        <div className="text-white text-2xl font-bold serif mb-16 flex items-center tracking-tight">
           <span className="mr-3 text-3xl">📰</span> AGHC Hub
        </div>
        <nav className="space-y-4 flex-grow">
          {menu.map(m => (
            <Link key={m.p} to={m.p} className={`flex items-center px-6 py-5 rounded-[1.5rem] text-sm font-bold tracking-tight transition-all duration-300 ${location.pathname === m.p ? 'bg-blue-600 text-white shadow-[0_15px_30px_-5px_rgba(37,99,235,0.4)]' : 'hover:bg-slate-800/50 hover:text-white'}`}>
              <m.i className="w-5 h-5 mr-4" /> {m.n}
            </Link>
          ))}
        </nav>
        <div className="mt-auto pt-10 border-t border-slate-800 flex flex-col gap-6">
          <Link to="/" className="text-xs font-bold uppercase tracking-widest hover:text-white flex items-center transition-colors">
            <ExternalLink className="w-4 h-4 mr-3" /> Public Interface
          </Link>
          <button onClick={logout} className="text-left text-xs font-bold uppercase tracking-widest text-red-400 hover:text-red-300 flex items-center transition-colors">
            <LogOut className="w-4 h-4 mr-3" /> Sever Session
          </button>
        </div>
      </aside>
      <main className="flex-grow p-12 overflow-y-auto bg-[#f8fafc]"><div className="max-w-7xl mx-auto"><Outlet /></div></main>
    </div>
  );
};

// --- App Root ---
const App = () => (
  <AppProvider>
    <Router>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/post/:slug" element={<PostDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={
            <div className="max-w-3xl mx-auto py-32 px-6 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <span className="bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-8 inline-block">Since 2012</span>
              <h1 className="text-5xl md:text-6xl font-bold serif mb-10 leading-tight">Documenting the Pulse of AGHC</h1>
              <div className="w-24 h-1 bg-blue-600 mx-auto mb-10 rounded-full" />
              <p className="text-xl text-slate-500 leading-relaxed font-light mb-12">
                The AGHC Newspaper Club is more than a reporting body; we are curators of institutional memory. Our mission is to bridge the gap between rigorous academic inquiry and student perspective, creating a definitive record of our college's evolution.
              </p>
              <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto py-12 border-t border-slate-100">
                <div><p className="text-3xl font-bold text-slate-900 serif">14</p><p className="text-[10px] font-bold uppercase text-slate-400 mt-2">Annual Volumes</p></div>
                <div><p className="text-3xl font-bold text-slate-900 serif">500+</p><p className="text-[10px] font-bold uppercase text-slate-400 mt-2">Articles</p></div>
                <div><p className="text-3xl font-bold text-slate-900 serif">12k</p><p className="text-[10px] font-bold uppercase text-slate-400 mt-2">Monthly Readers</p></div>
              </div>
            </div>
          } />
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

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
