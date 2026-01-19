
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Facebook, Send } from 'lucide-react';
import { useApp } from '../context/AppContext.js';

const Footer = () => {
  const { settings, subscribe } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      subscribe(email);
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <Link to="/" className="flex items-center space-x-2 text-white mb-6">
              <span className="text-2xl">{settings.logo}</span>
              <span className="text-xl font-bold serif">{settings.siteTitle}</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">{settings.description}</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Explore</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/" className="hover:text-white">Feed</Link></li>
              <li><Link to="/about" className="hover:text-white">Archives</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Newsletter</h4>
            <form onSubmit={handleSubmit} className="relative">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 pl-4 pr-10 text-white text-sm outline-none" />
              <button type="submit" className="absolute right-2 top-2 text-slate-400 hover:text-white"><Send className="w-5 h-5" /></button>
            </form>
            {subscribed && <p className="text-xs text-green-400 mt-2">Success!</p>}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
