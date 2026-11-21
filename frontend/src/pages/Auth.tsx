import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Card } from '../components/ui/Card';
import Button from '../components/ui/Button';

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'forgot') {
      setSubmitted(true);
      return;
    }
    // Architecture ready: simulated login into session
    localStorage.setItem('talentlens_user', JSON.stringify({ email, name: name || 'Alex Candidate' }));
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: '#F8F8F4' }}>
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white" style={{ background: '#174C3C' }}>
              TL
            </div>
            <span className="text-lg font-bold" style={{ color: '#202723', letterSpacing: '-0.02em', fontFamily: 'Manrope, sans-serif' }}>
              TalentLens
            </span>
          </Link>
          <h1 className="text-xl font-bold mb-1" style={{ color: '#202723', letterSpacing: '-0.02em', fontFamily: 'Manrope, sans-serif' }}>
            {mode === 'login' && 'Welcome back to TalentLens'}
            {mode === 'signup' && 'Create your account'}
            {mode === 'forgot' && 'Reset your password'}
          </h1>
          <p className="text-xs" style={{ color: '#727A75' }}>
            {mode === 'login' && 'Sign in to access your resumes and compatibility reports.'}
            {mode === 'signup' && 'Start discovering your career compatibility with real NLP models.'}
            {mode === 'forgot' && 'Enter your verified email to receive a recovery link.'}
          </p>
        </div>

        <Card className="p-7">
          {submitted && mode === 'forgot' ? (
            <div className="text-center py-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: '#DCE9DF' }}>
                <CheckCircle2 size={20} style={{ color: '#174C3C' }} />
              </div>
              <h2 className="text-sm font-bold mb-1" style={{ color: '#202723' }}>Password reset sent</h2>
              <p className="text-xs mb-5" style={{ color: '#727A75' }}>
                If an account exists for {email}, a secure password reset link has been dispatched.
              </p>
              <Button onClick={() => { setSubmitted(false); setMode('login'); }} fullWidth>
                Return to Sign In
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="text-xs font-semibold block mb-1.5" style={{ color: '#3A4440' }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Alex Candidate"
                    className="w-full text-xs rounded-lg px-3 py-2.5 outline-none"
                    style={{ border: '1px solid #E5E8E6', background: '#FAFAF8', color: '#202723' }}
                  />
                </div>
              )}

              <div>
                <label className="text-xs font-semibold block mb-1.5" style={{ color: '#3A4440' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full text-xs rounded-lg px-3 py-2.5 outline-none"
                  style={{ border: '1px solid #E5E8E6', background: '#FAFAF8', color: '#202723' }}
                />
              </div>

              {mode !== 'forgot' && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold" style={{ color: '#3A4440' }}>
                      Password
                    </label>
                    {mode === 'login' && (
                      <button
                        type="button"
                        onClick={() => setMode('forgot')}
                        className="text-xs font-medium"
                        style={{ color: '#174C3C' }}
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full text-xs rounded-lg px-3 py-2.5 outline-none"
                    style={{ border: '1px solid #E5E8E6', background: '#FAFAF8', color: '#202723' }}
                  />
                </div>
              )}

              <Button type="submit" fullWidth className="mt-2">
                {mode === 'login' && 'Sign In'}
                {mode === 'signup' && 'Create Account'}
                {mode === 'forgot' && 'Send Reset Link'}
                <ArrowRight size={13} />
              </Button>
            </form>
          )}

          {/* Mode switch */}
          <div className="mt-6 pt-5 border-t text-center text-xs" style={{ borderColor: '#F0F5F1', color: '#727A75' }}>
            {mode === 'login' && (
              <p>
                Don't have an account?{' '}
                <button
                  onClick={() => setMode('signup')}
                  className="font-semibold underline"
                  style={{ color: '#174C3C' }}
                >
                  Sign up for free
                </button>
              </p>
            )}
            {mode === 'signup' && (
              <p>
                Already have an account?{' '}
                <button
                  onClick={() => setMode('login')}
                  className="font-semibold underline"
                  style={{ color: '#174C3C' }}
                >
                  Sign in
                </button>
              </p>
            )}
            {mode === 'forgot' && !submitted && (
              <p>
                Remembered your credentials?{' '}
                <button
                  onClick={() => setMode('login')}
                  className="font-semibold underline"
                  style={{ color: '#174C3C' }}
                >
                  Return to sign in
                </button>
              </p>
            )}
          </div>
        </Card>

        {/* Academic Note */}
        <p className="text-center text-xs mt-6" style={{ color: '#9BA5A0' }}>
          TalentLens Academic Prototype · Google Antigravity & ML Capstone
        </p>
      </div>
    </div>
  );
}
