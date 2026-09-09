import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/common';
import { useToast } from '@/components/common/Toast';
import { ROUTES } from '@/routes/routes';
import { Mail, Lock, User, AlertCircle } from 'lucide-react';
import clsx from 'clsx';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required.';
    if (!email || !email.includes('@')) newErrors.email = 'Please enter a valid email address.';
    if (!password || password.length < 6) newErrors.password = 'Password must be at least 6 characters.';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await register(email, password, name);
      showToast("Account created successfully.", "success");
      navigate(ROUTES.HOME, { replace: true });
    } catch (err) {
      setErrors({ form: err.message || 'Failed to register' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-surface/50 backdrop-blur-md rounded-2xl border border-surface shadow-glow relative z-10">
      <h1 className="font-display text-4xl font-bold text-text-bright mb-2 text-center">Join the Cult</h1>
      <p className="text-text-muted text-center mb-8">Create an account to track your nightmares.</p>

      {errors.form && (
        <div className="mb-6 p-3 bg-crimson/10 border border-crimson text-crimson rounded flex items-start gap-2" role="alert">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span className="text-sm">{errors.form}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-bold text-text-muted mb-1">Name</label>
          <div className="relative">
            <User className="absolute left-3 top-3 w-5 h-5 text-text-muted" />
            <input 
              id="name"
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={clsx(
                "w-full bg-background border rounded-lg py-3 pl-10 pr-4 text-text-bright focus:outline-none transition-colors",
                errors.name ? "border-crimson focus:border-crimson focus:ring-1 focus:ring-crimson" : "border-surface focus:border-text-muted"
              )}
              placeholder="Your Name"
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
          </div>
          {errors.name && <p id="name-error" className="text-xs text-crimson mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-bold text-text-muted mb-1">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-text-muted" />
            <input 
              id="email"
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={clsx(
                "w-full bg-background border rounded-lg py-3 pl-10 pr-4 text-text-bright focus:outline-none transition-colors",
                errors.email ? "border-crimson focus:border-crimson focus:ring-1 focus:ring-crimson" : "border-surface focus:border-text-muted"
              )}
              placeholder="you@example.com"
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
          </div>
          {errors.email && <p id="email-error" className="text-xs text-crimson mt-1">{errors.email}</p>}
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
              className={clsx(
                "w-full bg-background border rounded-lg py-3 pl-10 pr-4 text-text-bright focus:outline-none transition-colors",
                errors.password ? "border-crimson focus:border-crimson focus:ring-1 focus:ring-crimson" : "border-surface focus:border-text-muted"
              )}
              placeholder="••••••••"
              aria-describedby={errors.password ? 'password-error' : undefined}
            />
          </div>
          {errors.password ? (
            <p id="password-error" className="text-xs text-crimson mt-1">{errors.password}</p>
          ) : (
            <p className="text-xs text-text-muted/50 mt-1">Must be at least 6 characters.</p>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-bold text-text-muted mb-1">Confirm Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-text-muted" />
            <input 
              id="confirmPassword"
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={clsx(
                "w-full bg-background border rounded-lg py-3 pl-10 pr-4 text-text-bright focus:outline-none transition-colors",
                errors.confirmPassword ? "border-crimson focus:border-crimson focus:ring-1 focus:ring-crimson" : "border-surface focus:border-text-muted"
              )}
              placeholder="••••••••"
              aria-describedby={errors.confirmPassword ? 'confirm-error' : undefined}
            />
          </div>
          {errors.confirmPassword && <p id="confirm-error" className="text-xs text-crimson mt-1">{errors.confirmPassword}</p>}
        </div>

        <Button 
          type="submit" 
          className="w-full mt-6" 
          size="lg"
          loading={isSubmitting}
        >
          Create Account
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-text-muted">
        Already trapped here? <Link to={ROUTES.LOGIN} className="text-crimson font-bold hover:text-crimson-bright transition-colors">Sign in</Link>
      </p>
    </div>
  );
}
