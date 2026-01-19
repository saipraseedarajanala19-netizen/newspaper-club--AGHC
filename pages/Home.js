
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react';
import { useApp } from '../context/AppContext.js';

const Home = () => {
  const { posts, categories } = useApp();
  const featuredPost = posts.find(p => p.featured && p.status === 'published') || posts[0];
  const recentPosts = posts.filter(p => p.status === 'published' && p.id !== featuredPost?.id).slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {featuredPost && (
        <section className="mb-20">
          <div className="relative rounded-3xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent z-10"></div>
            <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-[500px] object-cover" />
            <div className="absolute bottom-0 left-0 p-8 md:p-12 z-20 max-w-3xl">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight serif">
                <Link to={`/post/${featuredPost.slug}`} className="hover:underline">{featuredPost.title}</Link>
              </h1>
              <div className="flex items-center space-x-6 text-slate-300 text-sm">
                <span>{featuredPost.author}</span>
                <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
          <h2 className="text-2xl font-bold text-slate-900 serif mb-10 pb-4 border-b border-gray-200">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {recentPosts.map(post => (
              <article key={post.id} className="group">
                <Link to={`/post/${post.slug}`}>
                  <div className="aspect-[16/9] overflow-hidden rounded-2xl mb-5">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 serif">{post.title}</h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">{post.summary}</p>
                </Link>
              </article>
            ))}
          </div>
        </div>
        <aside className="lg:col-span-4">
          <section className="bg-slate-50 p-8 rounded-3xl border border-gray-100">
            <h3 className="text-lg font-bold mb-6 flex items-center serif"><BookOpen className="w-5 h-5 mr-2" /> Categories</h3>
            <div className="flex flex-wrap gap-3">
              {categories.map(cat => (
                <Link key={cat.id} to={`/category/${cat.slug}`} className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm hover:border-blue-400">
                  {cat.name}
                </Link>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default Home;
