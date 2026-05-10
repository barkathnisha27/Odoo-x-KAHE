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
      toast.success('Account created!');
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
          <div className="absolute top-[25%] right-[20%] w-20 h-20 border border-white/10 rounded-full opacity-20 animate-float"></div>
          <div className="absolute bottom-[15%] left-[15%] w-16 h-16 border border-white/10 rounded-lg opacity-15 animate-float-slow"></div>
          <div className="absolute top-[55%] right-[35%] w-12 h-12 border border-white/10 rounded-full opacity-10 animate-float-reverse"></div>
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
            <Input label="Full Name" placeholder="John Doe" value={form.name} onChange={e => update('name', e.target.value)} error={errors.name} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>} />
            <Input label="Email" type="email" placeholder="you@example.com" value={form.email} onChange={e => update('email', e.target.value)} error={errors.email} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m0 0v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8m18 0L12 13 3 8" /></svg>} />
            <div className="relative">
              <Input label="Password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={form.password} onChange={e => update('password', e.target.value)} error={errors.password} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.657 0 3-1.343 3-3V7a3 3 0 10-6 0v1c0 1.657 1.343 3 3 3zm-7 9a2 2 0 002 2h10a2 2 0 002-2v-7H5v7z" /></svg>} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-[38px] text-sm" style={{ color: 'var(--text-tertiary)' }}>
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.274.718-.653 1.393-1.118 2.02m-1.816 1.816A9.953 9.953 0 0112 19c-4.477 0-8.268-2.943-9.542-7 1.451-3.803 5.145-6.5 9.542-6.5" /></svg>
                )}
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
            <Input label="Confirm Password" type="password" placeholder="••••••••" value={form.confirm} onChange={e => update('confirm', e.target.value)} error={errors.confirm} icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.657 0 3-1.343 3-3V7a3 3 0 10-6 0v1c0 1.657 1.343 3 3 3zm-7 9a2 2 0 002 2h10a2 2 0 002-2v-7H5v7z" /></svg>} />

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
