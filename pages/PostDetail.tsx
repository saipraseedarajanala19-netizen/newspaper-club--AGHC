
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Calendar, User, Share2, Tag, ChevronLeft, Facebook, Twitter, Linkedin } from 'lucide-react';
import { useApp } from '../context/AppContext';

const PostDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { posts } = useApp();
  
  const post = posts.find(p => p.slug === slug);

  if (!post) {
    return <Navigate to="/" />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600 mb-8 transition-colors">
        <ChevronLeft className="w-4 h-4 mr-1" /> Back to feed
      </Link>

      <header className="mb-12">
        <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">
          {post.category}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 serif leading-tight">
          {post.title}
        </h1>
        
        <div className="flex flex-wrap items-center justify-between gap-6 py-6 border-y border-gray-100">
          <div className="flex items-center space-x-4">
            <img src={`https://ui-avatars.com/api/?name=${post.author}&background=random`} className="w-12 h-12 rounded-full" alt={post.author} />
            <div>
              <div className="text-sm font-bold text-slate-900">{post.author}</div>
              <div className="text-xs text-slate-500 font-light flex items-center">
                <Calendar className="w-3 h-3 mr-1" /> {new Date(post.date).toLocaleDateString()} • 5 min read
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all">
              <Facebook className="w-5 h-5" />
            </button>
            <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-50 rounded-full transition-all">
              <Twitter className="w-5 h-5" />
            </button>
            <button className="p-2 text-slate-400 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-all">
              <Linkedin className="w-5 h-5" />
            </button>
            <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-full transition-all">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <figure className="mb-12">
        <img src={post.image} alt={post.title} className="w-full h-auto rounded-3xl object-cover shadow-xl shadow-slate-200" />
        {/* Placeholder caption */}
        <figcaption className="mt-4 text-center text-xs text-slate-400 italic">Image credit: CKC Archives</figcaption>
      </figure>

      <div className="prose prose-slate prose-lg max-w-none">
        {/* Simple rendering of HTML string */}
        <div dangerouslySetInnerHTML={{ __html: post.content }} className="text-slate-800 leading-relaxed space-y-6 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:serif [&>h3]:text-xl [&>h3]:font-semibold [&>p]:font-light [&>p]:text-lg"></div>
      </div>

      <footer className="mt-16 pt-12 border-t border-gray-100">
        <div className="flex items-center flex-wrap gap-3 mb-12">
          <Tag className="w-4 h-4 text-slate-400 mr-2" />
          {post.tags.map(tag => (
            <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors">
              #{tag}
            </span>
          ))}
        </div>

        {/* Author Bio Box */}
        <div className="bg-slate-50 p-8 rounded-3xl border border-gray-100 flex flex-col md:flex-row items-center gap-6">
          <img src={`https://ui-avatars.com/api/?name=${post.author}&background=random`} className="w-24 h-24 rounded-full" alt={post.author} />
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Written by {post.author}</h3>
            <p className="text-slate-600 text-sm font-light leading-relaxed">
              Academic researcher and frequent contributor to the Knowledge Club. Specializing in the intersection of {post.category.toLowerCase()} and modern educational frameworks.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PostDetail;
