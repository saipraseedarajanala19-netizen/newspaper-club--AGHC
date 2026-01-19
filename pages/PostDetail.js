
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Calendar, ChevronLeft, Tag } from 'lucide-react';
import { useApp } from '../context/AppContext.js';

const PostDetail = () => {
  const { slug } = useParams();
  const { posts } = useApp();
  const post = posts.find(p => p.slug === slug);

  if (!post) return <Navigate to="/" />;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600 mb-8 transition-colors">
        <ChevronLeft className="w-4 h-4 mr-1" /> Back to feed
      </Link>
      <header className="mb-12">
        <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">{post.category}</div>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 serif leading-tight">{post.title}</h1>
        <div className="flex items-center space-x-4 py-6 border-y border-gray-100">
           <img src={`https://ui-avatars.com/api/?name=${post.author}`} className="w-10 h-10 rounded-full" />
           <div>
             <p className="text-sm font-bold">{post.author}</p>
             <p className="text-xs text-slate-500">{new Date(post.date).toLocaleDateString()}</p>
           </div>
        </div>
      </header>
      <img src={post.image} className="w-full rounded-3xl mb-12" />
      <div className="prose prose-lg prose-slate" dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
};

export default PostDetail;
