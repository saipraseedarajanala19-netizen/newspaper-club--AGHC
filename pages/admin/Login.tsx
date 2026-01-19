
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Lock, ShieldCheck, ArrowRight } from 'lucide-react';

const Login: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const { login, settings } = useApp();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      navigate('/admin');
    } else {
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-10 rounded-3xl border border-gray-100 shadow-xl space-y-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 text-4xl">
            {settings.logo}
          </div>
          <h1 className="text-2xl font-bold text-slate-900 serif">Admin Access</h1>
          <p className="text-slate-500 text-sm mt-2">Enter credentials to manage the knowledge club.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-300" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Hint: admin123"
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            {error && <p className="text-xs text-red-500 mt-2 font-bold animate-bounce">Access denied. Please try again.</p>}
          </div>

          <button 
            type="submit" 
            className="w-full flex items-center justify-center px-6 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
          >
            Authenticate <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </form>

        <div className="pt-6 border-t border-gray-50 text-center">
          <p className="text-xs text-slate-400 flex items-center justify-center">
            <ShieldCheck className="w-3 h-3 mr-1" /> Secure End-to-End Encryption
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
