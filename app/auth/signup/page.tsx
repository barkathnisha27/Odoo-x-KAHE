'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/lib/hooks/useAuth';
import { validateEmail, validatePassword } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const pwCheck = validatePassword(form.password);
  const strengthColors = ['#EF4444', '#EF4444', '#F59E0B', '#10B981', '#00D4FF', '#00D4FF'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email) newErrors.email = 'Email is required';
    else if (!validateEmail(form.email)) newErrors.email = 'Invalid email';
    if (!pwCheck.valid) newErrors.password = 'Password too weak';
    if (form.password !== form.confirm) newErrors.confirm = 'Passwords do not match';
    if (!agree) newErrors.agree = 'You must accept the terms';
    if (Object.keys(newErrors).length) { setErrors(newErrors); return; }

    setLoading(true);
    try {
      await signup(form.name, form.email, form.password);
      toast.success('Account created! 🚀');
      router.push('/dashboard');
    } catch {
      toast.error('Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const update = (key: string, val: string) => {
    setForm(prev => ({ ...prev, [key]: val }));
    setErrors({});
  };

  return (
    <div className="min-h-screen flex">
      {/* Left: Illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-[#0A1628] via-[#0F2847] to-[#1A0F28] items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-[25%] right-[20%] text-8xl opacity-20 animate-float">🌏</div>
          <div className="absolute bottom-[15%] left-[15%] text-7xl opacity-15 animate-float-slow">🧳</div>
          <div className="absolute top-[55%] right-[35%] text-5xl opacity-10 animate-float-reverse">📸</div>
        </div>
        <div className="relative z-10 text-center px-12">
          <h2 className="font-display text-4xl font-bold mb-4">Begin your<br /><span className="text-gradient">journey today.</span></h2>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>Join 12,000+ explorers using Traveloop.</p>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-md">
          <div className="mb-8">
            <Link href="/" className="flex items-center gap-2 mb-8">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00D4FF] to-[#0099FF] flex items-center justify-center text-lg font-bold text-[#0A1628]">T</div>
              <span className="text-xl font-bold font-display">Travel<span className="text-[#00D4FF]">oop</span></span>
            </Link>
            <h1 className="text-3xl font-bold font-display mb-2">Create account</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Start planning your dream trips.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Full Name" placeholder="John Doe" value={form.name} onChange={e => update('name', e.target.value)} error={errors.name} icon={<span>👤</span>} />
            <Input label="Email" type="email" placeholder="you@example.com" value={form.email} onChange={e => update('email', e.target.value)} error={errors.email} icon={<span>📧</span>} />
            <div className="relative">
              <Input label="Password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={form.password} onChange={e => update('password', e.target.value)} error={errors.password} icon={<span>🔒</span>} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-[38px] text-sm" style={{ color: 'var(--text-tertiary)' }}>
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {form.password && (
              <div className="space-y-1">
                <div className="flex gap-1">
                  {[0,1,2,3,4].map(i => (
                    <div key={i} className="flex-1 h-1 rounded-full transition-colors" style={{ background: i < pwCheck.strength ? strengthColors[pwCheck.strength] : 'rgba(255,255,255,0.06)' }} />
                  ))}
                </div>
                <p className="text-xs" style={{ color: strengthColors[pwCheck.strength] }}>{pwCheck.message}</p>
              </div>
            )}
            <Input label="Confirm Password" type="password" placeholder="••••••••" value={form.confirm} onChange={e => update('confirm', e.target.value)} error={errors.confirm} icon={<span>🔒</span>} />

            <label className="flex items-start gap-2 text-sm cursor-pointer" style={{ color: 'var(--text-secondary)' }}>
              <input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} className="w-4 h-4 mt-0.5 rounded accent-[#00D4FF]" />
              <span>I agree to the <Link href="/terms" className="text-[#00D4FF] hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-[#00D4FF] hover:underline">Privacy Policy</Link></span>
            </label>
            {errors.agree && <p className="text-xs text-[#EF4444]">{errors.agree}</p>}

            <Button type="submit" fullWidth size="lg" loading={loading}>Create Account</Button>
          </form>

          <p className="mt-8 text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
            Already have an account?{' '}
            <Link href="/auth/login" className="text-[#00D4FF] font-medium hover:underline">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
