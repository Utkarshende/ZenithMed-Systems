import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, ShieldCheck, ArrowRight, Pill } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // PROFESSIONAL NOTE: In a real app, you would send this to your 
    // Backend API. For now, we use a secure hardcoded check.
    setTimeout(() => {
      if (email === 'admin@nexuspharma.com' && password === 'Nexus@2026') {
        localStorage.setItem('isAdmin', 'true');
        navigate('/admin');
      } else {
        alert('Invalid Credentials. Please use the authorized admin email.');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl shadow-blue-100 overflow-hidden border border-slate-100">
        
        {/* Top Branding Section */}
        <div className="bg-slate-900 p-8 text-center text-white">
          <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-2xl font-black tracking-tight">ADMIN PORTAL</h2>
          <p className="text-slate-400 text-sm mt-1">Authorized Nexus Pharma Access Only</p>
        </div>

        {/* Login Form */}
        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Work Email</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="email" 
                  required 
                  placeholder="admin@nexuspharma.com"
                  className="w-full bg-slate-50 border border-slate-200 py-4 pl-12 pr-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Master Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="password" 
                  required 
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 py-4 pl-12 pr-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-blue-200 active:scale-[0.98] disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Authenticate <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-slate-400 text-xs font-medium">
            <span className="flex items-center gap-1"><Pill size={12}/> Nexus Pharma 2026</span>
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;