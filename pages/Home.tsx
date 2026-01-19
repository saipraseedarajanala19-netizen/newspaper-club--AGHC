
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Home: React.FC = () => {
  const { posts, categories } = useApp();
  
  const featuredPost = posts.find(p => p.featured && p.status === 'published') || posts[0];
  const recentPosts = posts.filter(p => p.status === 'published' && p.id !== featuredPost?.id).slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      {featuredPost && (
        <section className="mb-20">
          <div className="relative rounded-3xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent z-10"></div>
            <img 
              src={featuredPost.image} 
              alt={featuredPost.title} 
              className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            <div className="absolute bottom-0 left-0 p-8 md:p-12 z-20 max-w-3xl">
              <Link 
                to={`/category/${featuredPost.category.toLowerCase()}`}
                className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-bold uppercase tracking-widest rounded-full mb-4"
              >
                {featuredPost.category}
              </Link>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight serif">
                <Link to={`/post/${featuredPost.slug}`} className="hover:underline">
                  {featuredPost.title}
                </Link>
              </h1>
              <p className="text-slate-200 text-lg mb-8 line-clamp-2 font-light">
                {featuredPost.summary}
              </p>
              <div className="flex items-center space-x-6 text-slate-300 text-sm">
                <div className="flex items-center"><User className="w-4 h-4 mr-2" /> {featuredPost.author}</div>
                <div className="flex items-center"><Calendar className="w-4 h-4 mr-2" /> {new Date(featuredPost.date).toLocaleDateString()}</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Latest Articles */}
        <div className="lg:col-span-8">
          <div className="flex justify-between items-center mb-10 pb-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-slate-900 serif">Latest Knowledge Drops</h2>
            <Link to="/archive" className="text-blue-600 text-sm font-semibold flex items-center hover:underline">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {recentPosts.map(post => (
              <article key={post.id} className="group">
                <Link to={`/post/${post.slug}`}>
                  <div className="aspect-[16/9] overflow-hidden rounded-2xl mb-5">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                  </div>
                  <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">
                    {post.category}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors serif">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2 leading-relaxed font-light">
                    {post.summary}
                  </p>
                  <div className="flex items-center text-slate-400 text-xs">
                    <span>{post.author}</span>
                    <span className="mx-2">•</span>
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-12">
          {/* Categories */}
          <section className="bg-slate-50 p-8 rounded-3xl border border-gray-100">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center serif">
              <BookOpen className="w-5 h-5 mr-2 text-blue-600" /> Browse by Discipline
            </h3>
            <div className="flex flex-wrap gap-3">
              {categories.map(cat => (
                <Link 
                  key={cat.id} 
                  to={`/category/${cat.slug}`}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-slate-600 hover:border-blue-400 hover:text-blue-600 transition-all shadow-sm"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </section>

          {/* About Club */}
          <section className="bg-blue-600 p-8 rounded-3xl text-white">
            <h3 className="text-lg font-bold mb-4 serif">Join the Club</h3>
            <p className="text-blue-50 text-sm mb-6 font-light leading-relaxed">
              We are a community of lifelong learners and curious minds. Submit your research or join our weekly discussion boards.
            </p>
            <Link 
              to="/about"
              className="inline-flex items-center text-sm font-bold bg-white text-blue-600 px-6 py-2 rounded-full hover:bg-blue-50 transition-colors"
            >
              Learn More
            </Link>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default Home;
