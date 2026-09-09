import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/common';
import { useToast } from '@/components/common/Toast';
import { ROUTES } from '@/routes/routes';
import { Mail, Lock, AlertCircle } from 'lucide-react';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const from = location.state?.from?.pathname || ROUTES.HOME;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setError('Password is required.');
      return;
    }

    setIsSubmitting(true);
    try {
      await login(email, password);
      showToast("Welcome back to the nightmare.", "success");
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Failed to login');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOAuth = (provider) => {
    showToast(`${provider} login coming soon`, "default");
  };

  return (
    <div className="w-full max-w-md p-8 bg-surface/50 backdrop-blur-md rounded-2xl border border-surface shadow-glow relative z-10">
      <h1 className="font-display text-4xl font-bold text-text-bright mb-2 text-center">Enter the Void</h1>
      <p className="text-text-muted text-center mb-8">Sign in to continue your descent.</p>

      {error && (
        <div className="mb-6 p-3 bg-crimson/10 border border-crimson text-crimson rounded flex items-start gap-2" role="alert">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-bold text-text-muted mb-1">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-text-muted" />
            <input 
              id="email"
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-background border border-surface rounded-lg py-3 pl-10 pr-4 text-text-bright focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-colors"
              placeholder="you@example.com"
              aria-describedby={error && error.includes('email') ? 'email-error' : undefined}
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-bold text-text-muted mb-1">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-text-muted" />
            <input 
              id="password"
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-background border border-surface rounded-lg py-3 pl-10 pr-4 text-text-bright focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-colors"
              placeholder="••••••••"
            />
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full mt-6" 
          size="lg"
          loading={isSubmitting}
        >
          Sign In
        </Button>
      </form>

      <div className="mt-6 flex items-center gap-4">
        <div className="h-px bg-surface flex-1"></div>
        <span className="text-xs text-text-muted font-bold uppercase tracking-wider">Or</span>
        <div className="h-px bg-surface flex-1"></div>
      </div>

      <div className="mt-6 space-y-3">
        <Button variant="secondary" className="w-full bg-background border-surface text-text-bright hover:border-text-muted" onClick={() => handleOAuth('Google')}>
          Continue with Google
        </Button>
        <Button variant="secondary" className="w-full bg-background border-surface text-text-bright hover:border-text-muted" onClick={() => handleOAuth('Apple')}>
          Continue with Apple
        </Button>
      </div>

      <p className="mt-8 text-center text-sm text-text-muted">
        Don't have an account? <Link to={ROUTES.REGISTER} className="text-crimson font-bold hover:text-crimson-bright transition-colors">Sign up</Link>
      </p>
    </div>
  );
}
