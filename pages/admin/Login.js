
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext.js';

const Login = () => {
  const [pass, setPass] = useState('');
  const { login, settings } = useApp();
  const navigate = useNavigate();

  const handle = (e) => {
    e.preventDefault();
    if (login(pass)) navigate('/admin');
    else alert('Wrong password');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-10 rounded-3xl border border-gray-100 shadow-xl space-y-8 text-center">
        <div className="text-5xl mb-4">{settings.logo}</div>
        <h1 className="text-2xl font-bold serif">Editor Access</h1>
        <form onSubmit={handle} className="space-y-6">
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-300" />
            <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="Password (admin123)" className="w-full pl-11 pr-4 py-3 bg-slate-50 rounded-xl outline-none" />
          </div>
          <button type="submit" className="w-full flex items-center justify-center py-4 bg-blue-600 text-white rounded-xl font-bold">Enter Hub <ArrowRight className="ml-2 w-4 h-4" /></button>
        </form>
      </div>
    </div>
  );
};

export default Login;
