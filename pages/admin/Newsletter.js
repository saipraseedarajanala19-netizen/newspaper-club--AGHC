
import React from 'react';
import { Mail, Trash2 } from 'lucide-react';
import { useApp } from '../../context/AppContext.js';

const Newsletter = () => {
  const { subscribers } = useApp();
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Audience</h1>
      <div className="bg-white p-8 rounded-2xl border border-gray-100 flex items-center space-x-6">
        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center"><Mail /></div>
        <div>
          <p className="text-slate-500 text-sm font-medium">Active Subscribers</p>
          <p className="text-3xl font-bold">{subscribers.length}</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase px-6 py-4">
            <tr><th className="px-6 py-4">Email</th><th className="px-6 py-4 text-right">Delete</th></tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {subscribers.map(s => (
              <tr key={s.id}><td className="px-6 py-4 text-sm">{s.email}</td><td className="px-6 py-4 text-right"><button className="text-slate-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button></td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Newsletter;
