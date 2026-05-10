'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/lib/hooks/useAuth';
import { validateEmail } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!validateEmail(email)) newErrors.email = 'Invalid email format';
    if (!password) newErrors.password = 'Password is required';
    if (Object.keys(newErrors).length) { setErrors(newErrors); return; }

    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back! 🎉');
      router.push('/dashboard');
    } catch {
      toast.error('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left: Illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-[#0A1628] via-[#0F2847] to-[#1A0F28] items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-[20%] left-[15%] text-8xl opacity-20 animate-float">✈️</div>
          <div className="absolute bottom-[20%] right-[15%] text-7xl opacity-15 animate-float-slow">🌍</div>
          <div className="absolute top-[60%] left-[40%] text-6xl opacity-10 animate-float-reverse">🗺️</div>
        </div>
        <div className="relative z-10 text-center px-12">
          <h2 className="font-display text-4xl font-bold mb-4">Welcome back,<br /><span className="text-gradient">Explorer.</span></h2>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>Your next adventure is waiting.</p>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <div className="mb-8">
            <Link href="/" className="flex items-center gap-2 mb-8">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00D4FF] to-[#0099FF] flex items-center justify-center text-lg font-bold text-[#0A1628]">T</div>
              <span className="text-xl font-bold font-display">Travel<span className="text-[#00D4FF]">oop</span></span>
            </Link>
            <h1 className="text-3xl font-bold font-display mb-2">Sign in</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Enter your credentials to continue.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email" type="email" placeholder="you@example.com"
              value={email} onChange={e => { setEmail(e.target.value); setErrors({}); }}
              error={errors.email}
              icon={<span>📧</span>}
            />
            <div className="relative">
              <Input
                label="Password" type={showPassword ? 'text' : 'password'} placeholder="••••••••"
                value={password} onChange={e => { setPassword(e.target.value); setErrors({}); }}
                error={errors.password}
                icon={<span>🔒</span>}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] text-sm"
                style={{ color: 'var(--text-tertiary)' }}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: 'var(--text-secondary)' }}>
                <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded border-white/20 bg-transparent accent-[#00D4FF]"
                />
                Remember me
              </label>
              <Link href="/auth/forgot-password" className="text-sm text-[#00D4FF] hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" fullWidth size="lg" loading={loading}>
              Sign In
            </Button>
          </form>

          {/* OAuth */}
          <div className="mt-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>or continue with</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="secondary" onClick={() => { toast.success('Demo mode — logged in!'); login('demo@traveloop.com', 'demo'); router.push('/dashboard'); }}>
                🌐 Google
              </Button>
              <Button variant="secondary" onClick={() => { toast.success('Demo mode — logged in!'); login('demo@traveloop.com', 'demo'); router.push('/dashboard'); }}>
                🍎 Apple
              </Button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="text-[#00D4FF] font-medium hover:underline">Sign up</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
