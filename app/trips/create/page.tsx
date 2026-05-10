'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Input, TextArea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';

export default function CreateTripWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<{name: string, description: string, start_date: string, end_date: string, traveler_count: number, trip_type: import('@/types/trips').TripType}>({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    traveler_count: 1,
    trip_type: 'solo',
  });

  const nextStep = () => {
    if (step === 1 && !form.name) return toast.error('Please enter a trip name');
    if (step === 2 && (!form.start_date || !form.end_date)) return toast.error('Please select dates');
    if (step === 2 && new Date(form.start_date) > new Date(form.end_date)) return toast.error('End date must be after start date');
    setStep(s => s + 1);
  };

  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const trip = await api.trips.create(form);
      toast.success('Trip created successfully! 🎉');
      router.push(`/itinerary/${trip.id}`);
    } catch {
      toast.error('Failed to create trip');
    } finally {
      setLoading(false);
    }
  };

  const update = (key: string, val: any) => setForm(prev => ({ ...prev, [key]: val }));

  const stepLabels = ['Basics', 'Dates & Type', 'Preview'];

  return (
    <div className="container-custom page-content max-w-3xl">
      {/* Progress Bar */}
      <div className="mb-10 md:mb-12">
        <div className="flex justify-between mb-2 gap-2">
          {stepLabels.map((label, i) => (
            <span key={label} className={`text-[10px] sm:text-xs font-medium uppercase tracking-wider truncate ${step >= i + 1 ? 'text-[#00D4FF]' : 'text-[var(--text-tertiary)]'}`}>
              <span className="hidden sm:inline">Step {i + 1}: </span>{label}
            </span>
          ))}
        </div>
        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#00D4FF] to-[#0099FF]"
            initial={{ width: '33%' }}
            animate={{ width: `${(step / 3) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <Card padding="lg" glow>
              <h2 className="text-2xl sm:text-3xl font-display font-bold mb-6">Let&apos;s start with the basics</h2>
              <div className="space-y-6">
                <Input
                  label="Trip Name"
                  placeholder="e.g. Euro Trip 2026, Summer in Bali"
                  value={form.name}
                  onChange={e => update('name', e.target.value)}
                  autoFocus
                />
                <TextArea
                  label="Description (Optional)"
                  placeholder="What's the vibe of this trip?"
                  value={form.description}
                  onChange={e => update('description', e.target.value)}
                />
                
                {/* Cover Image Upload Placeholder */}
                <div>
                  <label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>Cover Image</label>
                  <div className="border-2 border-dashed border-white/20 rounded-xl p-6 sm:p-8 text-center hover:bg-white/5 hover:border-[#00D4FF]/50 transition-colors cursor-pointer group">
                    <svg className="mx-auto mb-3 w-10 h-10 text-[var(--text-secondary)] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M16 12l-4 4m0 0l-4-4m4 4V3" /></svg>
                    <p className="text-sm font-medium">Click to upload or drag and drop</p>
                    <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>JPG, PNG, WebP up to 5MB</p>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={nextStep} variant="primary">Next Step →</Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <Card padding="lg" glow>
              <h2 className="text-2xl sm:text-3xl font-display font-bold mb-6">When and who?</h2>
              <div className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    type="date"
                    label="Start Date"
                    value={form.start_date}
                    onChange={e => update('start_date', e.target.value)}
                  />
                  <Input
                    type="date"
                    label="End Date"
                    value={form.end_date}
                    onChange={e => update('end_date', e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-3 block" style={{ color: 'var(--text-secondary)' }}>Trip Type</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: 'solo', icon: '🚶', label: 'Solo' },
                      { id: 'couple', icon: '👫', label: 'Couple' },
                      { id: 'family', icon: '👨‍👩‍👧‍👦', label: 'Family' },
                      { id: 'group', icon: '🎉', label: 'Group' }
                    ].map(type => (
                      <div
                        key={type.id}
                        onClick={() => update('trip_type', type.id)}
                        className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl cursor-pointer border-2 transition-all ${
                          form.trip_type === type.id
                            ? 'border-[#00D4FF] bg-[rgba(0,212,255,0.1)]'
                            : 'border-white/10 hover:bg-white/5'
                        }`}
                      >
                        <span className="text-2xl sm:text-3xl mb-1 sm:mb-2">{type.icon}</span>
                        <span className="text-xs sm:text-sm font-medium">{type.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>Number of Travelers</label>
                  <div className="flex items-center gap-4">
                    <button onClick={() => update('traveler_count', Math.max(1, form.traveler_count - 1))} className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">-</button>
                    <span className="text-xl font-bold font-mono w-8 text-center">{form.traveler_count}</span>
                    <button onClick={() => update('traveler_count', form.traveler_count + 1)} className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">+</button>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button onClick={prevStep} variant="ghost">← Back</Button>
                  <Button onClick={nextStep} variant="primary">Review Trip →</Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <Card padding="lg" className="border border-[#00D4FF]/30 relative overflow-hidden">
              {/* Decorative background */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[rgba(0,212,255,0.1)] rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
              
              <div className="text-center mb-8 relative z-10">
                <span className="text-4xl sm:text-5xl block mb-4">✨</span>
                <h2 className="text-2xl sm:text-3xl font-display font-bold mb-2">Looks amazing!</h2>
                <p style={{ color: 'var(--text-secondary)' }}>Review your trip details before we set things up.</p>
              </div>

              <div className="bg-black/30 rounded-2xl p-4 sm:p-6 border border-white/5 mb-8 relative z-10">
                <h3 className="text-xl sm:text-2xl font-bold font-display mb-1">{form.name}</h3>
                <p className="text-sm mb-6" style={{ color: 'var(--text-tertiary)' }}>{form.description || 'No description provided.'}</p>
                
                <div className="grid grid-cols-2 gap-y-4 text-sm">
                  <div>
                    <p className="text-[var(--text-tertiary)] mb-1 uppercase tracking-wider text-xs font-bold">Dates</p>
                    <p className="font-medium">{new Date(form.start_date).toLocaleDateString()} – {new Date(form.end_date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-[var(--text-tertiary)] mb-1 uppercase tracking-wider text-xs font-bold">Duration</p>
                    <p className="font-medium">{Math.ceil((new Date(form.end_date).getTime() - new Date(form.start_date).getTime()) / (1000 * 3600 * 24))} days</p>
                  </div>
                  <div>
                    <p className="text-[var(--text-tertiary)] mb-1 uppercase tracking-wider text-xs font-bold">Type</p>
                    <p className="font-medium capitalize flex items-center gap-1">
                      {form.trip_type === 'solo' ? '🚶' : form.trip_type === 'couple' ? '👫' : form.trip_type === 'family' ? '👨‍👩‍👧‍👦' : '🎉'} {form.trip_type}
                    </p>
                  </div>
                  <div>
                    <p className="text-[var(--text-tertiary)] mb-1 uppercase tracking-wider text-xs font-bold">Travelers</p>
                    <p className="font-medium">{form.traveler_count} person{form.traveler_count > 1 ? 's' : ''}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between relative z-10">
                <Button onClick={prevStep} variant="ghost">← Back</Button>
                <Button onClick={handleSubmit} variant="primary" loading={loading} icon={<span className="text-lg">🚀</span>}>
                  Create Trip
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
