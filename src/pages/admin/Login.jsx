import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ArrowLeft, Lock, Mail, Eye, EyeOff } from 'lucide-react';

const AUTH_ERROR_MESSAGES = {
  'auth/invalid-credential': 'Invalid email or password. Please try again.',
  'auth/user-not-found': 'No admin account found with that email.',
  'auth/wrong-password': 'Incorrect password. Please try again.',
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/too-many-requests': 'Too many failed attempts. Please wait a moment and try again.',
  'auth/network-request-failed': 'Network error. Check your internet connection.',
  'auth/invalid-api-key': 'Firebase is misconfigured (invalid API key). Contact your developer.',
};

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail]             = useState('');
  const [password, setPassword]       = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError]             = useState('');
  const [loading, setLoading]         = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email.trim(), password);
      navigate('/admin');
    } catch (err) {
      setError(AUTH_ERROR_MESSAGES[err.code] || `Login failed: ${err.code || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-navy flex-col justify-between p-12 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-white/5" />
        <div className="absolute -bottom-16 -right-16 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full bg-gold/10" />

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold flex items-center justify-center">
              <span className="text-white font-black text-xs tracking-wider">LGU</span>
            </div>
            <div>
              <p className="text-white font-bold text-sm tracking-tight">Municipality of Cuenca</p>
              <p className="text-gold/70 text-[11px] font-medium">Province of Batangas</p>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <h2 className="text-4xl font-extrabold text-white leading-tight tracking-tight mb-4">
            Municipal Calendar<br />Admin Portal
          </h2>
          <p className="text-white/50 text-sm font-medium leading-relaxed max-w-sm">
            Manage events, announcements, and activities for all offices of the Municipality of Cuenca.
          </p>
        </div>

        <div className="relative z-10">
          <p className="text-white/25 text-xs font-medium">
            © {new Date().getFullYear()} Municipality of Cuenca. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col bg-stone-50">
        {/* Back button */}
        <div className="p-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-navy text-sm font-semibold transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Calendar
          </Link>
        </div>

        {/* Form */}
        <div className="flex-1 flex items-center justify-center px-6 pb-12">
          <div className="w-full max-w-sm">
            {/* Mobile logo */}
            <div className="lg:hidden flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-navy flex items-center justify-center">
                <span className="text-gold font-black text-xs tracking-wider">LGU</span>
              </div>
              <div>
                <p className="text-navy font-bold text-sm tracking-tight">Municipality of Cuenca</p>
                <p className="text-slate-400 text-[11px] font-medium">Province of Batangas</p>
              </div>
            </div>

            <h1 className="text-2xl font-extrabold text-navy tracking-tight mb-1">Welcome back</h1>
            <p className="text-slate-400 text-sm font-medium mb-8">Sign in to your admin account</p>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(''); }}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 bg-white text-sm focus:ring-2 focus:ring-navy/20 focus:border-navy/40 outline-none font-medium transition-all"
                    placeholder="office@cuenca.gov.ph"
                    autoFocus
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(''); }}
                    className="w-full pl-10 pr-11 py-3 rounded-xl border border-stone-200 bg-white text-sm focus:ring-2 focus:ring-navy/20 focus:border-navy/40 outline-none font-medium transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-navy transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                  <p className="text-xs text-red-600 font-semibold">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-navy text-white rounded-xl py-3 text-sm font-bold hover:bg-navy/90 disabled:opacity-60 transition-all mt-2 shadow-sm"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <p className="text-center text-xs text-slate-400 font-medium mt-8">
              For access, contact your system administrator.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
