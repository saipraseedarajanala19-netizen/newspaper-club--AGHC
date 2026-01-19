
import React from 'react';
import { useApp } from '../../context/AppContext';
import { Mail, Download, Search, Trash2, Calendar } from 'lucide-react';

const Newsletter: React.FC = () => {
  const { subscribers } = useApp();

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Newsletter</h1>
          <p className="text-slate-500 text-sm">Manage your community of subscribers.</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-sm">
          <Download className="w-4 h-4 mr-2" /> Export CSV
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm col-span-1">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-4">
            <Mail className="w-6 h-6" />
          </div>
          <h3 className="text-slate-500 text-sm font-medium">Total Subscribers</h3>
          <p className="text-3xl font-bold text-slate-900 mt-1">{subscribers.length}</p>
          <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between text-xs font-medium">
            <span className="text-emerald-600">+4 this week</span>
            <span className="text-slate-400">Target: 500</span>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm md:col-span-2">
           <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Broadcast</h3>
           <p className="text-slate-500 text-sm mb-6 font-light">Draft an email to all your subscribers at once.</p>
           <div className="flex space-x-4">
              <button className="flex-1 py-3 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-colors">Open Email Builder</button>
              <button className="px-6 py-3 border border-gray-200 text-slate-600 text-sm font-bold rounded-xl hover:bg-slate-50 transition-colors">Settings</button>
           </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Filter by email..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Email Address</th>
              <th className="px-6 py-4">Joined Date</th>
              <th className="px-6 py-4">Source</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {subscribers.map((sub) => (
              <tr key={sub.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 text-sm font-bold text-slate-900">{sub.email}</td>
                <td className="px-6 py-4 text-sm text-slate-500 flex items-center">
                  <Calendar className="w-3 h-3 mr-2" /> {new Date(sub.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-xs font-medium text-slate-400">Footer Widget</td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-slate-400 hover:text-red-600 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {subscribers.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-400 italic">No subscribers yet. Start growing your community!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Newsletter;
