
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Save, Palette, Type, Shield, Layout, RefreshCw } from 'lucide-react';

const Settings: React.FC = () => {
  const { settings, updateSettings } = useApp();
  const [formData, setFormData] = useState(settings);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">System Settings</h1>
        <p className="text-slate-500 text-sm">Customize the look and feel of the platform.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Appearance */}
        <section className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-slate-900 flex items-center"><Palette className="w-5 h-5 mr-3 text-blue-600" /> Identity & Appearance</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Site Name</label>
              <input 
                type="text" 
                value={formData.siteTitle} 
                onChange={(e) => setFormData(p => ({...p, siteTitle: e.target.value}))}
                className="w-full px-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Logo Emoji</label>
              <input 
                type="text" 
                value={formData.logo} 
                onChange={(e) => setFormData(p => ({...p, logo: e.target.value}))}
                className="w-full px-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Footer Description</label>
              <textarea 
                value={formData.description} 
                onChange={(e) => setFormData(p => ({...p, description: e.target.value}))}
                rows={2}
                className="w-full px-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Primary Color</label>
              <div className="flex items-center space-x-3">
                <input 
                  type="color" 
                  value={formData.primaryColor} 
                  onChange={(e) => setFormData(p => ({...p, primaryColor: e.target.value}))}
                  className="w-12 h-10 p-1 bg-white border border-gray-200 rounded-lg cursor-pointer"
                />
                <code className="text-xs bg-slate-100 px-3 py-2 rounded-lg text-slate-600 uppercase font-bold">{formData.primaryColor}</code>
              </div>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-slate-900 flex items-center"><Type className="w-5 h-5 mr-3 text-blue-600" /> Typography</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
              onClick={() => setFormData(p => ({...p, fontFamily: 'Inter'}))}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.fontFamily === 'Inter' ? 'border-blue-600 bg-blue-50/50' : 'border-gray-100 hover:border-gray-200'}`}
            >
              <h4 className="font-sans font-bold text-slate-900">Modern Sans (Inter)</h4>
              <p className="text-slate-500 text-xs mt-1">Clean, professional, high readability.</p>
            </div>
            <div 
              onClick={() => setFormData(p => ({...p, fontFamily: 'Serif'}))}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.fontFamily === 'Serif' ? 'border-blue-600 bg-blue-50/50' : 'border-gray-100 hover:border-gray-200'}`}
            >
              <h4 className="font-serif font-bold text-slate-900">Classic Academic (Serif)</h4>
              <p className="text-slate-500 text-xs mt-1">Traditional, sophisticated, academic feel.</p>
            </div>
          </div>
        </section>

        <div className="flex items-center justify-between pt-4">
          <p className="text-xs text-slate-400 italic">Last saved: Just now</p>
          <div className="flex items-center space-x-3">
             {success && <span className="text-emerald-600 text-sm font-bold flex items-center animate-pulse"><RefreshCw className="w-4 h-4 mr-2" /> Settings Updated!</span>}
             <button type="submit" className="flex items-center px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
               <Save className="w-4 h-4 mr-2" /> Save All Changes
             </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Settings;
