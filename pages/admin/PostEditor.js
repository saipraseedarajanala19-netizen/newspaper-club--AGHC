
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Save, Eye, ChevronLeft, Image as ImageIcon, Send, Sparkles, Loader2, Settings as SettingsIcon } from 'lucide-react';
import { useApp } from '../../context/AppContext.js';
import { GoogleGenAI } from '@google/genai';

const PostEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, categories, addPost, updatePost } = useApp();
  const [isAiLoading, setIsAiLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '', slug: '', content: '', summary: '', author: 'Editorial Board',
    category: 'Science', tags: [], image: 'https://picsum.photos/seed/edu/1200/600',
    status: 'draft', featured: false, metaTitle: '', metaDescription: '',
  });

  useEffect(() => {
    if (id) {
      const post = posts.find(p => p.id === id);
      if (post) setFormData(post);
    }
  }, [id, posts]);

  const generateWithAi = async () => {
    if (!formData.content || formData.content.length < 50) return alert('Write some content first so the AI has context!');
    setIsAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze this article and provide a 1-sentence summary and 3 relevant tags. 
                  Title: ${formData.title}
                  Content: ${formData.content.substring(0, 2000)}`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              summary: { type: "STRING" },
              tags: { type: "ARRAY", items: { type: "STRING" } }
            },
            required: ["summary", "tags"]
          }
        }
      });
      const result = JSON.parse(response.text);
      setFormData(prev => ({ ...prev, summary: result.summary, tags: result.tags }));
    } catch (err) {
      console.error(err);
      alert('AI Assistant currently busy. Please try again later.');
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSave = () => {
    if (!formData.title) return alert('Please enter a title');
    const slug = formData.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '');
    if (id) {
      updatePost(id, { ...formData, slug });
    } else {
      addPost({ ...formData, id: Date.now().toString(), date: new Date().toISOString(), slug });
    }
    navigate('/admin/posts');
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/admin/posts" className="p-2 text-slate-400 hover:text-slate-900 mr-2"><ChevronLeft /></Link>
          <h1 className="text-2xl font-bold">{id ? 'Refine Article' : 'Draft New Insight'}</h1>
        </div>
        <div className="flex space-x-3">
          <button onClick={handleSave} className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md">
            <Send className="w-4 h-4 mr-2" /> {formData.status === 'published' ? 'Sync Changes' : 'Publish to Feed'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <input 
              className="w-full text-3xl font-bold border-none outline-none serif placeholder:text-slate-200"
              placeholder="Article Title..."
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
            />
            
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Main Content</span>
              <button 
                onClick={generateWithAi}
                disabled={isAiLoading}
                className="flex items-center text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors disabled:opacity-50"
              >
                {isAiLoading ? <Loader2 className="w-3 h-3 mr-2 animate-spin" /> : <Sparkles className="w-3 h-3 mr-2" />}
                Smart Summary Assistant
              </button>
            </div>

            <textarea 
              className="w-full min-h-[400px] border-none outline-none text-lg leading-relaxed font-light text-slate-700 resize-none"
              placeholder="Begin your academic discourse..."
              value={formData.content}
              onChange={e => setFormData({...formData, content: e.target.value})}
            />
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <label className="block text-xs font-bold text-slate-400 uppercase mb-4 tracking-widest">Article Summary</label>
            <textarea 
              className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none text-sm text-slate-600"
              rows={3}
              value={formData.summary}
              onChange={e => setFormData({...formData, summary: e.target.value})}
              placeholder="A concise overview for the homepage..."
            />
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
             <h3 className="text-sm font-bold flex items-center"><SettingsIcon className="w-4 h-4 mr-2" /> Metadata</h3>
             <div>
               <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Category</label>
               <select className="w-full p-2 bg-slate-50 rounded-lg text-sm border-none outline-none" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                 {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
               </select>
             </div>
             <div>
               <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Status</label>
               <select className="w-full p-2 bg-slate-50 rounded-lg text-sm border-none outline-none" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                 <option value="draft">Draft</option>
                 <option value="published">Published</option>
               </select>
             </div>
             <div className="flex items-center space-x-2">
               <input type="checkbox" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} className="rounded text-blue-600" />
               <span className="text-sm text-slate-600">Mark as Featured</span>
             </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-sm font-bold mb-4">Article Tags</h3>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full">{tag}</span>
              ))}
              {formData.tags.length === 0 && <span className="text-xs text-slate-400 italic">No tags suggested yet.</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostEditor;
