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
import { GoogleGenAI, Type } from '@google/genai';

// --- INITIAL DATA ---
const INITIAL_CATEGORIES = [
  { id: '1', name: 'Science', slug: 'science' },
  { id: '2', name: 'Humanities', slug: 'humanities' },
  { id: '3', name: 'Technology', slug: 'technology' },
  { id: '4', name: 'Arts', slug: 'arts' },
];

const INITIAL_POSTS = [
  {
    id: '1',
    title: 'The Quantum Shift in Collegiate Research',
    slug: 'quantum-shift',
    content: '<h2>A New Academic Dimension</h2><p>Quantum computing is transitioning from purely theoretical physics into an applied disciplinary force across global universities. We are seeing an unprecedented level of integration between traditional computer science and the quantum realm.</p><p>As laboratories scale their hardware capabilities, students are now tasked with rethinking algorithmic complexity from the ground up.</p>',
    summary: 'Exploring how quantum computing is redefining the landscape of collegiate research and technology departments.',
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
    content: '<h2>Truth in Education</h2><p>Student-led reporting is seeing a resurgence in the digital age, with blogs replacing traditional newsletters. The speed of information sharing on campus has transformed how institutional culture is recorded.</p>',
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

// --- APP CONTEXT ---
const AppContext = createContext<any>(null);

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

// --- SHARED COMPONENTS ---
const Navbar = () => {
  const { settings, auth } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-3">
            <span className="text-2xl">{settings.logo}</span>
            <span className="text-xl font-bold text-slate-900 serif tracking-tight">{settings.siteTitle}</span>
          </Link>
          <div className="hidden md:flex items-center space-x-10">
            <Link to="/" className={`text-sm font-semibold tracking-tight transition-colors ${location.pathname === '/' ? 'text-blue-600' : 'text-slate-500 hover:text-blue-600'}`}>Feed</Link>
            <Link to="/about" className={`text-sm font-semibold tracking-tight transition-colors ${location.pathname === '/about' ? 'text-blue-600' : 'text-slate-500 hover:text-blue-600'}`}>Archives</Link>
            <Link to={auth.isAuthenticated ? "/admin" : "/login"} className="flex items-center space-x-2 text-slate-500 hover:text-blue-600 transition-colors">
              <User className="w-5 h-5" />
              <span className="text-sm font-semibold">{auth.isAuthenticated ? 'Console' : 'Login'}</span>
            </Link>
          </div>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-slate-600 p-2"><Menu /></button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 p-6 space-y-4 shadow-xl animate-in slide-in-from-top-2">
          <Link to="/" onClick={() => setIsOpen(false)} className="block font-bold text-slate-800">Feed</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="block font-bold text-slate-800">Archives</Link>
          <Link to="/login" onClick={() => setIsOpen(false)} className="block font-bold text-slate-800">Admin Portal</Link>
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
    <footer className="bg-[#0a0f1c] text-slate-400 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 text-white mb-8">
              <span className="text-3xl">{settings.logo}</span>
              <span className="text-2xl font-bold serif tracking-tight">{settings.siteTitle}</span>
            </div>
            <p className="max-w-md text-slate-400 leading-relaxed text-lg font-light">{settings.description}</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Knowledge Base</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/" className="hover:text-white transition-colors">Latest Bulletins</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Club Constitution</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Admin Hub</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Club Circular</h4>
            <p className="text-xs mb-6 text-slate-500 font-medium">Weekly insights delivered to your inbox.</p>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                placeholder="university@email.edu" 
                className="bg-slate-900 border-none rounded-xl px-5 py-3 text-sm text-white flex-grow outline-none focus:ring-2 focus:ring-blue-600 transition-all" 
                required 
              />
              <button className="bg-blue-600 p-3 rounded-xl text-white hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/20"><Send className="w-4 h-4" /></button>
            </form>
            {done && <p className="text-emerald-400 text-xs mt-3 font-bold animate-pulse">Enrolled in Circular!</p>}
          </div>
        </div>
        <div className="border-t border-slate-800/50 pt-10 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600 flex flex-col md:flex-row justify-between items-center gap-4">
          <span>© 2024 AGHC Newspaper Club Archives</span>
          <div className="flex space-x-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Protocols</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Publication</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- PUBLIC PAGES ---
const Home = () => {
  const { posts } = useApp();
  const featured = posts.find((p: any) => p.featured && p.status === 'published') || posts[0];
  const others = posts.filter((p: any) => p.status === 'published' && p.id !== featured?.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {featured && (
        <Link to={`/post/${featured.slug}`} className="block relative h-[550px] rounded-[3rem] overflow-hidden mb-20 group shadow-2xl">
          <img src={featured.image} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-[3s] ease-out" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] via-[#0a0f1c]/20 to-transparent" />
          <div className="absolute bottom-16 left-16 right-16 max-w-3xl">
            <span className="bg-blue-600 text-white text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-[0.2em] mb-8 inline-block shadow-xl">Cover Story</span>
            <h1 className="text-5xl md:text-7xl text-white font-bold serif mb-8 leading-[1.1] tracking-tight group-hover:underline decoration-2 underline-offset-[12px]">{featured.title}</h1>
            <p className="text-slate-200 text-xl line-clamp-2 font-light opacity-90 leading-relaxed">{featured.summary}</p>
          </div>
        </Link>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
        {others.map((post: any) => (
          <Link key={post.id} to={`/post/${post.slug}`} className="group flex flex-col">
            <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden mb-8 shadow-md ring-1 ring-slate-100">
              <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
            </div>
            <div className="flex-grow">
              <span className="text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-4 block">{post.category}</span>
              <h3 className="text-3xl font-bold serif group-hover:text-blue-600 transition-colors mb-5 leading-tight tracking-tight">{post.title}</h3>
              <p className="text-slate-500 text-base font-light line-clamp-3 leading-relaxed mb-8">{post.summary}</p>
            </div>
            <div className="flex items-center text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] pt-6 border-t border-slate-50">
              {post.author} <span className="mx-3 opacity-30">•</span> {new Date(post.date).toLocaleDateString()}
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
    <div className="max-w-4xl mx-auto px-4 py-20">
      <Link to="/" className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-blue-600 mb-16 transition-all hover:-translate-x-2">
        <ChevronLeft className="w-4 h-4 mr-2" /> Back to Feed
      </Link>
      <header className="mb-20">
        <span className="text-blue-600 text-[10px] font-black uppercase tracking-[0.25em] mb-6 block">{post.category}</span>
        <h1 className="text-6xl md:text-7xl font-bold serif leading-[1.05] mb-12 tracking-tight text-slate-900">{post.title}</h1>
        <div className="flex items-center justify-between py-10 border-y border-slate-100">
          <div className="flex items-center space-x-5">
            <img src={`https://ui-avatars.com/api/?name=${post.author}&background=random&color=fff&size=128`} className="w-14 h-14 rounded-full ring-4 ring-slate-50" />
            <div>
              <p className="font-bold text-slate-900 text-lg tracking-tight">{post.author}</p>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{new Date(post.date).toLocaleDateString()} <span className="mx-2">•</span> 10 Min Read</p>
            </div>
          </div>
          <div className="flex space-x-4">
             <button className="p-3 bg-slate-50 text-slate-400 hover:bg-blue-50 hover:text-blue-600 rounded-2xl transition-all"><Twitter className="w-5 h-5" /></button>
             <button className="p-3 bg-slate-50 text-slate-400 hover:bg-slate-900 hover:text-white rounded-2xl transition-all"><Share2 className="w-5 h-5" /></button>
          </div>
        </div>
      </header>
      <img src={post.image} className="w-full rounded-[3.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] mb-20" />
      <article className="prose prose-slate prose-xl max-w-none mb-32" dangerouslySetInnerHTML={{ __html: post.content }} />
      
      <div className="bg-slate-900 rounded-[3rem] p-16 text-white flex flex-col md:flex-row items-center gap-10">
        <img src={`https://ui-avatars.com/api/?name=${post.author}&size=256`} className="w-32 h-32 rounded-[2rem] shadow-2xl" />
        <div className="text-center md:text-left">
          <span className="text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4 block">About the Contributor</span>
          <h3 className="text-3xl font-bold serif mb-4">{post.author}</h3>
          <p className="text-slate-400 text-lg leading-relaxed font-light max-w-xl">
            A lead contributor at the AGHC Newspaper Club. Specializing in advanced collegiate research and socio-technical implications of new media.
          </p>
        </div>
      </div>
    </div>
  );
};

// --- ADMIN PAGES ---
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
    if (!form.content || form.content.length < 50) return alert('Draft the core article first.');
    setIsAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const resp = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Review this manuscript and provide a concise abstract (1 sentence) and 3 research tags.
                  Title: ${form.title}
                  Content: ${form.content.substring(0, 2500)}`,
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
      const res = JSON.parse(resp.text);
      setForm(prev => ({ ...prev, summary: res.summary, tags: res.tags }));
    } catch (e) { 
      alert('AI Core busy.'); 
    } finally { 
      setIsAiLoading(false); 
    }
  };

  const save = () => {
    if (!form.title) return alert('Title required');
    const slug = form.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '');
    if (id) updatePost(id, { ...form, slug });
    else addPost({ ...form, id: Date.now().toString(), date: new Date().toISOString(), slug });
    navigate('/admin/posts');
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link to="/admin/posts" className="p-3 text-slate-400 hover:text-slate-900 bg-white rounded-2xl shadow-sm"><ChevronLeft /></Link>
          <h1 className="text-4xl font-bold serif tracking-tight">{id ? 'Edit Manuscript' : 'New Circular'}</h1>
        </div>
        <button onClick={save} className="bg-blue-600 text-white px-10 py-4 rounded-[1.5rem] font-bold flex items-center hover:bg-blue-700 transition-all shadow-xl shadow-blue-200">
          <Save className="w-5 h-5 mr-3" /> Save to Archives
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-10">
          <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm space-y-10">
            <input 
              className="w-full text-5xl font-bold serif outline-none border-none placeholder:text-slate-200 bg-transparent tracking-tight" 
              placeholder="Headline..." 
              value={form.title} 
              onChange={e => setForm({...form, title: e.target.value})} 
            />
            
            <div className="flex items-center justify-between border-b border-slate-50 pb-6">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Manuscript Body</span>
              <button 
                onClick={generateWithAi} 
                disabled={isAiLoading} 
                className="text-xs font-bold text-blue-600 bg-blue-50 px-5 py-2.5 rounded-full flex items-center hover:bg-blue-100 transition-all disabled:opacity-50"
              >
                {isAiLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />} 
                {isAiLoading ? 'Synthesizing...' : 'AI Metadata Hub'}
              </button>
            </div>

            <textarea 
              className="w-full min-h-[600px] outline-none border-none leading-relaxed font-light text-slate-700 text-xl resize-none bg-transparent" 
              placeholder="Record your findings... HTML supported." 
              value={form.content} 
              onChange={e => setForm({...form, content: e.target.value})} 
            />
          </div>

          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Executive Abstract</label>
            <textarea 
              className="w-full p-6 bg-slate-50 border-none rounded-2xl outline-none text-base text-slate-600 focus:ring-2 focus:ring-blue-100 min-h-[120px] font-light" 
              placeholder="A concise summary..." 
              value={form.summary} 
              onChange={e => setForm({...form, summary: e.target.value})} 
            />
          </div>
        </div>

        <div className="lg:col-span-4 space-y-10">
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-10">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 border-b border-slate-50 pb-6 flex items-center">
              <SettingsIcon className="w-5 h-5 mr-4 text-blue-600" /> Taxonomy
            </h3>
            
            <div className="space-y-8">
              <div>
                <label className="text-[10px] font-black block mb-3 uppercase text-slate-400 tracking-widest">Discipline</label>
                <select 
                  className="w-full p-5 bg-slate-50 rounded-2xl outline-none text-sm border-none ring-1 ring-slate-100 focus:ring-4 focus:ring-blue-50 transition-all font-bold" 
                  value={form.category} 
                  onChange={e => setForm({...form, category: e.target.value})}
                >
                  {categories.map((c: any) => <option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-black block mb-3 uppercase text-slate-400 tracking-widest">Visibility</label>
                <select 
                  className="w-full p-5 bg-slate-50 rounded-2xl outline-none text-sm border-none ring-1 ring-slate-100 focus:ring-4 focus:ring-blue-50 transition-all font-bold" 
                  value={form.status} 
                  onChange={e => setForm({...form, status: e.target.value})}
                >
                  <option value="draft">Internal Draft</option>
                  <option value="published">Public Bulletin</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Feature in Hero</span>
                <input 
                  type="checkbox" 
                  className="w-6 h-6 rounded-lg text-blue-600 border-slate-200 focus:ring-blue-600"
                  checked={form.featured} 
                  onChange={e => setForm({...form, featured: e.target.checked})} 
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 border-b border-slate-50 pb-6 flex items-center">
              <ImageIcon className="w-5 h-5 mr-4 text-emerald-600" /> Visual Proof
            </h3>
            <div className="aspect-video bg-slate-50 rounded-[2rem] overflow-hidden ring-1 ring-slate-100 flex items-center justify-center group relative shadow-inner">
              {form.image ? (
                <img src={form.image} className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="w-12 h-12 text-slate-200" />
              )}
            </div>
            <input 
              className="w-full p-5 bg-slate-50 rounded-2xl outline-none text-[10px] font-mono border-none ring-1 ring-slate-100 focus:ring-4 focus:ring-blue-50" 
              placeholder="URL..." 
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
    { label: 'Active Readers', val: subscribers.length, icon: User, bg: 'bg-emerald-50', text: 'text-emerald-600' },
    { label: 'Drafts in Review', val: posts.filter((p: any) => p.status === 'draft').length, icon: Edit2, bg: 'bg-amber-50', text: 'text-amber-600' }
  ], [posts, subscribers]);

  const chartData = [
    { n: 'Mon', v: 420 }, { n: 'Tue', v: 380 }, { n: 'Wed', v: 640 }, 
    { n: 'Thu', v: 820 }, { n: 'Fri', v: 510 }, { n: 'Sat', v: 930 }, { n: 'Sun', v: 750 }
  ];

  return (
    <div className="space-y-16 animate-in fade-in duration-1000">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-bold serif mb-3 tracking-tight">Editor's Console</h1>
          <p className="text-slate-400 text-base font-medium">System status for AGHC Knowledge Feed.</p>
        </div>
        <Link to="/admin/posts/new" className="bg-blue-600 text-white px-10 py-5 rounded-[1.75rem] font-bold flex items-center hover:bg-blue-700 transition-all shadow-xl shadow-blue-100">
          <Plus className="w-5 h-5 mr-3" /> New Circular
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {stats.map(s => (
          <div key={s.label} className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:translate-y-[-8px] transition-all duration-700">
            <div className={`${s.bg} ${s.text} w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-10 shadow-inner`}><s.icon className="w-8 h-8" /></div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.25em] mb-3">{s.label}</p>
            <p className="text-5xl font-bold text-slate-900 tracking-tighter">{s.val}</p>
          </div>
        ))}
      </div>

      <div className="bg-white p-16 rounded-[4rem] border border-slate-100 shadow-sm h-[500px]">
        <h3 className="text-[10px] font-black uppercase tracking-[0.25em] mb-12 text-slate-400 flex items-center">
          <TrendingUp className="w-4 h-4 mr-4" /> Weekly Engagement Cycle
        </h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
            <XAxis dataKey="n" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }} />
            <Tooltip 
              cursor={{ fill: '#f1f5f9', radius: 12 }}
              contentStyle={{ border: 'none', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)', fontWeight: 800, padding: '16px' }} 
            />
            <Bar dataKey="v" fill="#3b82f6" radius={[12, 12, 12, 12]} barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const AdminPosts = () => {
  const { posts, deletePost } = useApp();
  
  return (
    <div className="space-y-16">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-bold serif mb-3 tracking-tight">Archives</h1>
          <p className="text-slate-400 text-base font-medium">Curating institutional research.</p>
        </div>
        <Link to="/admin/posts/new" className="bg-blue-600 text-white px-10 py-5 rounded-[1.75rem] font-bold flex items-center hover:bg-blue-700 shadow-xl shadow-blue-100">
          <Plus className="w-5 h-5 mr-3" /> Compose
        </Link>
      </div>

      <div className="bg-white rounded-[4rem] border border-slate-100 overflow-hidden shadow-sm">
        <div className="p-10 border-b border-slate-50 flex items-center justify-between bg-slate-50/20">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
            <input className="w-full pl-16 pr-8 py-4 bg-white rounded-[1.75rem] border border-slate-100 outline-none text-sm font-medium placeholder:text-slate-300 focus:ring-4 focus:ring-blue-50 transition-all" placeholder="Search archive..." />
          </div>
          <button className="flex items-center text-[10px] font-black text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-[0.2em]">
            <Filter className="w-4 h-4 mr-3" /> Advanced Taxonomy
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 border-b border-slate-100">
              <tr>
                <th className="px-12 py-8">Manuscript Title</th>
                <th className="px-12 py-8">Discipline</th>
                <th className="px-12 py-8">Status</th>
                <th className="px-12 py-8 text-right">Tools</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {posts.map((p: any) => (
                <tr key={p.id} className="group hover:bg-slate-50/50 transition-all duration-500">
                  <td className="px-12 py-10">
                    <div className="flex items-center space-x-8">
                      <img src={p.image} className="w-20 h-14 rounded-2xl object-cover shadow-sm ring-1 ring-slate-100" />
                      <div>
                        <p className="font-bold text-slate-900 text-xl mb-1 tracking-tight">{p.title}</p>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{p.author}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-12 py-10">
                    <span className="px-5 py-2 bg-blue-50 text-blue-600 text-[10px] font-black rounded-full uppercase tracking-widest ring-1 ring-blue-100">{p.category}</span>
                  </td>
                  <td className="px-12 py-10">
                    <span className={`flex items-center space-x-3 text-[10px] font-black uppercase tracking-widest ${p.status === 'published' ? 'text-emerald-500' : 'text-amber-500'}`}>
                      <div className={`w-2.5 h-2.5 rounded-full ${p.status === 'published' ? 'bg-emerald-500' : 'bg-amber-500'} shadow-lg`} />
                      <span>{p.status}</span>
                    </span>
                  </td>
                  <td className="px-12 py-10 text-right space-x-6">
                    <Link to={`/admin/posts/edit/${p.id}`} className="inline-flex p-4 text-slate-400 hover:text-blue-600 hover:bg-white rounded-[1.25rem] transition-all shadow-sm shadow-transparent hover:shadow-slate-100"><Edit2 className="w-5 h-5" /></Link>
                    <button onClick={() => deletePost(p.id)} className="p-4 text-slate-400 hover:text-red-600 hover:bg-white rounded-[1.25rem] transition-all shadow-sm shadow-transparent hover:shadow-red-50"><Trash2 className="w-5 h-5" /></button>
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
    <div className="space-y-16">
      <h1 className="text-5xl font-bold serif tracking-tight">Audience Ledger</h1>
      <div className="bg-white p-16 rounded-[4rem] border border-slate-100 flex items-center space-x-10 shadow-sm">
        <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-[2.5rem] flex items-center justify-center shadow-inner"><Mail className="w-12 h-12" /></div>
        <div>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.25em] mb-3">Enrolled Constituents</p>
          <p className="text-6xl font-bold text-slate-900 tracking-tighter">{subscribers.length}</p>
        </div>
      </div>
      <div className="bg-white rounded-[4rem] border border-slate-100 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 border-b border-slate-100">
            <tr><th className="px-12 py-8">User Email</th><th className="px-12 py-8">Enrollment Date</th><th className="px-12 py-8 text-right">Revoke</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {subscribers.map((s: any) => (
              <tr key={s.id} className="hover:bg-slate-50/50 transition-colors duration-500">
                <td className="px-12 py-10 text-lg font-bold text-slate-800">{s.email}</td>
                <td className="px-12 py-10 text-xs font-bold text-slate-400 uppercase tracking-widest">{new Date(s.date).toLocaleDateString()}</td>
                <td className="px-12 py-10 text-right"><button className="text-slate-300 hover:text-red-600 p-4 rounded-2xl hover:bg-white transition-all"><Trash2 className="w-5 h-5" /></button></td>
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
    <div className="max-w-4xl space-y-16">
      <h1 className="text-5xl font-bold serif tracking-tight">Platform Config</h1>
      <div className="bg-white p-16 rounded-[4rem] border border-slate-100 space-y-16 shadow-sm">
        <h3 className="text-2xl font-bold serif flex items-center border-b border-slate-50 pb-10"><Palette className="w-8 h-8 mr-6 text-blue-600" /> Visual Identity</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Heraldic Title</label>
            <input type="text" value={form.siteTitle} onChange={e => setForm({...form, siteTitle: e.target.value})} className="w-full p-6 bg-slate-50 rounded-3xl outline-none ring-1 ring-slate-100 focus:ring-4 focus:ring-blue-50 transition-all font-bold text-lg" />
          </div>
          <div className="space-y-6">
            <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Shield Icon</label>
            <input type="text" value={form.logo} onChange={e => setForm({...form, logo: e.target.value})} className="w-full p-6 bg-slate-50 rounded-3xl outline-none ring-1 ring-slate-100 focus:ring-4 focus:ring-blue-50 transition-all text-center text-4xl" />
          </div>
          <div className="md:col-span-2 space-y-6">
            <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Institutional Mission</label>
            <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full p-6 bg-slate-50 rounded-3xl outline-none ring-1 ring-slate-100 focus:ring-4 focus:ring-blue-50 transition-all text-lg leading-relaxed font-light" rows={4} />
          </div>
        </div>
        <div className="flex items-center space-x-10 pt-10 border-t border-slate-50">
          <button onClick={handleUpdate} className="bg-blue-600 text-white px-12 py-5 rounded-[2rem] font-bold shadow-2xl shadow-blue-200 hover:bg-blue-700 transition-all hover:scale-105">Propagate System Update</button>
          {saved && <span className="text-emerald-600 text-sm font-black uppercase tracking-widest animate-in fade-in zoom-in duration-500">Archives Synchronized</span>}
        </div>
      </div>
    </div>
  );
};

const Login = () => {
  const [pass, setPass] = useState('');
  const { login, settings } = useApp();
  const navigate = useNavigate();
  const handle = (e: React.FormEvent) => { e.preventDefault(); if (login(pass)) navigate('/admin'); else alert('Access Denied: Invalid Authentication Protocol'); };
  
  return (
    <div className="min-h-[85vh] flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white p-16 rounded-[4.5rem] shadow-2xl space-y-16 text-center border border-slate-50 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 animate-pulse" />
        <div className="text-[7rem] mb-6 drop-shadow-2xl group-hover:scale-110 transition-transform duration-1000">{settings.logo}</div>
        <div>
          <h1 className="text-4xl font-bold serif mb-4 tracking-tight">Editor Access</h1>
          <p className="text-slate-400 text-base font-medium">Verify credentials for administrative control.</p>
        </div>
        <form onSubmit={handle} className="space-y-10">
          <div className="relative">
            <Lock className="absolute left-8 top-8 text-slate-300 w-6 h-6" />
            <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="Entry Code (admin123)" className="w-full pl-20 pr-8 py-8 bg-slate-50 rounded-[2.5rem] outline-none ring-1 ring-slate-100 focus:ring-8 focus:ring-blue-50 transition-all font-mono text-xl tracking-tighter" required />
          </div>
          <button className="w-full bg-slate-900 text-white py-8 rounded-[2.5rem] font-black uppercase tracking-[0.2em] shadow-2xl flex items-center justify-center hover:bg-blue-600 transition-all hover:scale-[1.03] active:scale-[0.98]">
            Authorize Hub Access <ArrowRight className="ml-5 w-6 h-6" />
          </button>
        </form>
        <div className="flex items-center justify-center space-x-3 text-slate-300">
           <ShieldCheck className="w-5 h-5" />
           <span className="text-[10px] font-black uppercase tracking-[0.3em]">Encrypted Session Protocol</span>
        </div>
      </div>
    </div>
  );
};

// --- LAYOUTS ---
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
  
  const menu = [
    { n: 'Intelligence', p: '/admin', i: LayoutDashboard },
    { n: 'Manuscripts', p: '/admin/posts', i: FileText },
    { n: 'Constituents', p: '/admin/newsletter', i: Mail },
    { n: 'Protocols', p: '/admin/settings', i: SettingsIcon }
  ];

  return (
    <div className="min-h-screen flex bg-[#f8fafc]">
      <aside className="w-96 bg-slate-900 text-slate-400 flex flex-col sticky top-0 h-screen hidden md:flex p-12 border-r border-slate-800">
        <div className="text-white text-3xl font-bold serif mb-20 flex items-center tracking-tight">
           <span className="mr-5 text-4xl">📰</span> AGHC Hub
        </div>
        <nav className="space-y-6 flex-grow">
          {menu.map(m => (
            <Link key={m.p} to={m.p} className={`flex items-center px-8 py-6 rounded-[2.25rem] text-sm font-black uppercase tracking-[0.2em] transition-all duration-500 ${location.pathname === m.p ? 'bg-blue-600 text-white shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)]' : 'hover:bg-slate-800/50 hover:text-white'}`}>
              <m.i className="w-6 h-6 mr-5" /> {m.n}
            </Link>
          ))}
        </nav>
        <div className="mt-auto pt-12 border-t border-slate-800 flex flex-col gap-10">
          <Link to="/" className="text-xs font-black uppercase tracking-[0.3em] hover:text-white flex items-center transition-colors">
            <ExternalLink className="w-5 h-5 mr-4" /> Live Site
          </Link>
          <button onClick={logout} className="text-left text-xs font-black uppercase tracking-[0.3em] text-red-400 hover:text-red-300 flex items-center transition-colors">
            <LogOut className="w-5 h-5 mr-4" /> Sever Session
          </button>
        </div>
      </aside>
      <main className="flex-grow p-16 overflow-y-auto"><div className="max-w-6xl mx-auto"><Outlet /></div></main>
    </div>
  );
};

// --- APP ROOT ---
const App = () => (
  <AppProvider>
    <Router>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/post/:slug" element={<PostDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={
            <div className="max-w-4xl mx-auto py-40 px-8 text-center animate-in fade-in duration-1000">
              <span className="bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.3em] px-6 py-3 rounded-full mb-12 inline-block">Since 2012</span>
              <h1 className="text-6xl md:text-8xl font-bold serif mb-16 leading-tight tracking-tighter">Recording the Pulse of AGHC.</h1>
              <div className="w-32 h-1.5 bg-blue-600 mx-auto mb-16 rounded-full" />
              <p className="text-2xl text-slate-500 leading-relaxed font-light mb-20 max-w-2xl mx-auto">
                The AGHC Newspaper Club is a student-led collective dedicated to multidisciplinary exploration and journalistic integrity. We curate institutional memory through rigorous inquiry.
              </p>
              <div className="grid grid-cols-3 gap-16 max-w-3xl mx-auto py-20 border-t border-slate-100">
                <div><p className="text-5xl font-bold text-slate-900 serif">14</p><p className="text-[10px] font-black uppercase text-slate-400 mt-4 tracking-widest">Volumes</p></div>
                <div><p className="text-5xl font-bold text-slate-900 serif">650+</p><p className="text-[10px] font-black uppercase text-slate-400 mt-4 tracking-widest">Bulletins</p></div>
                <div><p className="text-5xl font-bold text-slate-900 serif">14k</p><p className="text-[10px] font-black uppercase text-slate-400 mt-4 tracking-widest">Readers</p></div>
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
