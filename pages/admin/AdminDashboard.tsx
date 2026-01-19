
import React from 'react';
import { useApp } from '../../context/AppContext';
import { FileText, Users, Eye, Edit3, Plus, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AdminDashboard: React.FC = () => {
  const { posts, subscribers } = useApp();

  const stats = [
    { name: 'Total Posts', value: posts.length, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Drafts', value: posts.filter(p => p.status === 'draft').length, icon: Edit3, color: 'text-amber-600', bg: 'bg-amber-50' },
    { name: 'Subscribers', value: subscribers.length, icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { name: 'Views (est)', value: '1,240', icon: Eye, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  ];

  const chartData = [
    { name: 'Mon', views: 400 },
    { name: 'Tue', views: 300 },
    { name: 'Wed', views: 600 },
    { name: 'Thu', views: 800 },
    { name: 'Fri', views: 500 },
    { name: 'Sat', views: 900 },
    { name: 'Sun', views: 700 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 text-sm">Welcome back to the command center.</p>
        </div>
        <Link 
          to="/admin/posts/new" 
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4 mr-2" /> New Article
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-emerald-500 text-xs font-bold flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" /> +12%
              </span>
            </div>
            <h3 className="text-slate-500 text-sm font-medium">{stat.name}</h3>
            <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Engagement Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Traffic Overview</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} 
                />
                <Bar dataKey="views" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Drafts */}
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Recent Drafts</h3>
          <div className="space-y-6">
            {posts.filter(p => p.status === 'draft').slice(0, 4).map(post => (
              <div key={post.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 mr-4">
                    <Edit3 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{post.title}</h4>
                    <p className="text-xs text-slate-500">Last updated yesterday</p>
                  </div>
                </div>
                <Link to={`/admin/posts/edit/${post.id}`} className="text-blue-600 text-xs font-bold hover:underline">Edit</Link>
              </div>
            ))}
            {posts.filter(p => p.status === 'draft').length === 0 && (
              <p className="text-slate-400 text-sm italic py-4">No drafts found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
