
import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Users, Eye, Edit3, Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext.js';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const { posts, subscribers } = useApp();
  const stats = [
    { name: 'Posts', value: posts.length, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Subscribers', value: subscribers.length, icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  const chartData = [
    { name: 'Mon', views: 400 }, { name: 'Tue', views: 300 }, { name: 'Wed', views: 600 },
    { name: 'Thu', views: 800 }, { name: 'Fri', views: 500 }, { name: 'Sat', views: 900 }, { name: 'Sun', views: 700 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Insights Overview</h1>
        <Link to="/admin/posts/new" className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-bold"><Plus className="w-4 h-4 mr-2" /> New Entry</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map(s => (
          <div key={s.name} className="bg-white p-6 rounded-2xl border border-gray-100">
             <div className={`${s.bg} ${s.color} w-10 h-10 rounded-lg flex items-center justify-center mb-4`}><s.icon className="w-5 h-5" /></div>
             <p className="text-slate-500 text-sm">{s.name}</p>
             <p className="text-2xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>
      <div className="bg-white p-8 rounded-2xl border border-gray-100 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="views" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;
