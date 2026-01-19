
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Save, Eye, ChevronLeft, Image as ImageIcon, Send, Search, Settings as SettingsIcon } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Post } from '../../types';

const PostEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { posts, categories, addPost, updatePost } = useApp();
  
  const [formData, setFormData] = useState<Partial<Post>>({
    title: '',
    slug: '',
    content: '',
    summary: '',
    author: 'Admin User',
    category: 'Technology',
    tags: [],
    image: 'https://picsum.photos/seed/new/1200/600',
    status: 'draft',
    featured: false,
    metaTitle: '',
    metaDescription: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'seo'>('content');

  useEffect(() => {
    if (id) {
      const post = posts.find(p => p.id === id);
      if (post) {
        setFormData(post);
        setIsEditing(true);
      }
    }
  }, [id, posts]);

  const handleSlug = (title: string) => {
    return title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      slug: name === 'title' ? handleSlug(value) : prev.slug
    }));
  };

  const handleSave = () => {
    if (!formData.title) return alert('Title is required');

    if (isEditing && id) {
      updatePost(id, formData);
    } else {
      addPost({
        ...formData as Post,
        id: Date.now().toString(),
        date: new Date().toISOString(),
      });
    }
    navigate('/admin/posts');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center">
          <Link to="/admin/posts" className="p-2 text-slate-400 hover:text-slate-900 mr-2">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{isEditing ? 'Edit Article' : 'Compose New Article'}</h1>
            <p className="text-slate-500 text-sm">Crafting knowledge for the community.</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <button 
            onClick={() => setFormData(prev => ({ ...prev, status: 'draft' }))}
            className={`px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium transition-colors ${formData.status === 'draft' ? 'bg-slate-100 text-slate-900' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
          >
            Save Draft
          </button>
          <button 
            onClick={handleSave}
            className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Send className="w-4 h-4 mr-2" /> {formData.status === 'published' ? 'Update' : 'Publish'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Editor Main Area */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <div className="flex space-x-6 border-b border-gray-100 mb-8">
              <button 
                onClick={() => setActiveTab('content')}
                className={`pb-4 text-sm font-bold transition-colors border-b-2 ${activeTab === 'content' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
              >
                Content
              </button>
              <button 
                onClick={() => setActiveTab('seo')}
                className={`pb-4 text-sm font-bold transition-colors border-b-2 ${activeTab === 'seo' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
              >
                SEO & Metadata
              </button>
            </div>

            {activeTab === 'content' ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Title</label>
                  <input 
                    type="text" 
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="E.g., The Impact of AI on Modern Engineering"
                    className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-xl font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none placeholder:text-slate-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Summary</label>
                  <textarea 
                    name="summary"
                    value={formData.summary}
                    onChange={handleChange}
                    rows={2}
                    placeholder="A short hook for the feed..."
                    className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm text-slate-600 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Article Body (HTML Supported)</label>
                  <div className="border border-gray-100 rounded-xl overflow-hidden">
                    <div className="bg-slate-50 p-2 border-b border-gray-100 flex space-x-2">
                       {['Bold', 'Italic', 'H2', 'H3', 'Link'].map(tool => (
                         <button key={tool} className="p-1 px-2 text-xs font-bold text-slate-500 hover:bg-white hover:text-blue-600 rounded transition-colors uppercase tracking-tighter">{tool}</button>
                       ))}
                    </div>
                    <textarea 
                      name="content"
                      value={formData.content}
                      onChange={handleChange}
                      rows={15}
                      placeholder="Start writing your masterpiece here..."
                      className="w-full px-6 py-4 bg-white border-none text-slate-800 leading-relaxed focus:ring-0 outline-none font-mono text-sm"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Meta Title</label>
                  <input 
                    type="text" 
                    name="metaTitle"
                    value={formData.metaTitle}
                    onChange={handleChange}
                    placeholder="SEO Title (Google will see this)"
                    className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Meta Description</label>
                  <textarea 
                    name="metaDescription"
                    value={formData.metaDescription}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Summarize the page for search engines..."
                    className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  />
                </div>
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
                  <h4 className="text-sm font-bold text-blue-900 mb-2 flex items-center"><Search className="w-4 h-4 mr-2" /> Google Preview</h4>
                  <div className="space-y-1">
                    <p className="text-blue-700 text-lg hover:underline cursor-pointer">{formData.metaTitle || formData.title || 'Untitled Article'}</p>
                    <p className="text-emerald-700 text-sm">https://ckcblog.edu/post/{formData.slug}</p>
                    <p className="text-slate-500 text-sm line-clamp-2">{formData.metaDescription || formData.summary || 'No description provided.'}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="lg:col-span-4 space-y-6">
          {/* Settings Panel */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-sm font-bold text-slate-900 flex items-center uppercase tracking-wider"><SettingsIcon className="w-4 h-4 mr-2" /> Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Category</label>
                <select 
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-slate-50 border-none rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Status</label>
                <select 
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-slate-50 border-none rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  checked={formData.featured}
                  onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <label className="text-sm text-slate-600">Featured Article</label>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center uppercase tracking-wider"><ImageIcon className="w-4 h-4 mr-2" /> Cover Image</h3>
            <div className="aspect-video bg-slate-100 rounded-xl overflow-hidden border-2 border-dashed border-slate-200 flex items-center justify-center relative group">
              {formData.image ? (
                <>
                  <img src={formData.image} className="w-full h-full object-cover" alt="Preview" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                     <button className="px-4 py-2 bg-white text-slate-900 text-xs font-bold rounded-lg shadow-lg">Change Image</button>
                  </div>
                </>
              ) : (
                <div className="text-center text-slate-400">
                  <ImageIcon className="w-10 h-10 mx-auto mb-2 opacity-20" />
                  <p className="text-xs">No image uploaded</p>
                </div>
              )}
            </div>
            <input 
              type="text" 
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Paste image URL here..."
              className="w-full px-3 py-2 bg-slate-50 border-none rounded-lg text-[10px] font-mono text-slate-500 focus:ring-1 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostEditor;
