
import React from 'react';
import { Link } from 'react-router-dom';
import { Edit2, Trash2, Eye, Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext.js';

const AdminPosts = () => {
  const { posts, deletePost } = useApp();
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Article Management</h1>
        <Link to="/admin/posts/new" className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-bold"><Plus className="w-4 h-4 mr-2" /> Create</Link>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Article</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Tools</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {posts.map(post => (
              <tr key={post.id}>
                <td className="px-6 py-4 font-bold">{post.title}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-[10px] font-bold rounded uppercase ${post.status === 'published' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>{post.status}</span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <Link to={`/admin/posts/edit/${post.id}`} className="inline-block p-2 text-slate-400 hover:text-blue-600"><Edit2 className="w-4 h-4" /></Link>
                  <button onClick={() => deletePost(post.id)} className="p-2 text-slate-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPosts;
