
import React from 'react';
import { useApp } from '../../context/AppContext';
import { Edit2, Trash2, Eye, MoreVertical, Plus, Filter, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminPosts: React.FC = () => {
  const { posts, deletePost } = useApp();

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manage Posts</h1>
          <p className="text-slate-500 text-sm">Publish, edit, or remove content.</p>
        </div>
        <Link 
          to="/admin/posts/new" 
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4 mr-2" /> New Article
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search articles..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <button className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50">
              <Filter className="w-4 h-4 mr-2" /> Filter
            </button>
            <select className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-slate-600 outline-none">
              <option>All Status</option>
              <option>Published</option>
              <option>Draft</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Author</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img src={post.image} className="w-10 h-10 rounded-lg object-cover mr-4" alt={post.title} />
                      <div className="font-bold text-slate-900 line-clamp-1 max-w-xs">{post.title}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{post.author}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase rounded">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {new Date(post.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded ${
                      post.status === 'published' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Link to={`/post/${post.slug}`} className="p-2 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-white transition-all">
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link to={`/admin/posts/edit/${post.id}`} className="p-2 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-white transition-all">
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <button 
                        onClick={() => deletePost(post.id)}
                        className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-white transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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

export default AdminPosts;
