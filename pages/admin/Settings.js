
import React, { useState } from 'react';
import { Save, Palette } from 'lucide-react';
import { useApp } from '../../context/AppContext.js';

const Settings = () => {
  const { settings, updateSettings } = useApp();
  const [form, setForm] = useState(settings);

  return (
    <div className="max-w-4xl space-y-8">
      <h1 className="text-2xl font-bold">Site Settings</h1>
      <div className="bg-white p-8 rounded-2xl border border-gray-100 space-y-6">
        <h3 className="text-lg font-bold flex items-center"><Palette className="w-5 h-5 mr-3" /> Brand Identity</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase">Site Name</label>
            <input type="text" value={form.siteTitle} onChange={e => setForm({...form, siteTitle: e.target.value})} className="w-full p-2 bg-slate-50 rounded-lg outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase">Logo Emoji</label>
            <input type="text" value={form.logo} onChange={e => setForm({...form, logo: e.target.value})} className="w-full p-2 bg-slate-50 rounded-lg outline-none" />
          </div>
        </div>
        <button onClick={() => updateSettings(form)} className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg font-bold"><Save className="w-4 h-4 mr-2" /> Save All</button>
      </div>
    </div>
  );
};

export default Settings;
