'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Footer } from '@/components/layout/Footer';
import { getTrendingCities } from '@/data/cities';

const taglines = ['Plan smarter.', 'Travel deeper.'];

function TypewriterText() {
  const [displayText, setDisplayText] = useState('');
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const fullText = taglines.join(' ');
    if (charIndex < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayText(fullText.slice(0, charIndex + 1));
        setCharIndex(c => c + 1);
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [charIndex]);

  return (
    <span>
      {displayText}
      <span className="animate-pulse text-[#00D4FF]">|</span>
    </span>
  );
}

const features = [
  { icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>, title: 'Itinerary Builder', desc: 'Drag-and-drop your perfect route with our visual day-by-day planner.' },
  { icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>, title: 'Route Optimizer', desc: 'AI-powered suggestions to cut costs and travel time between cities.' },
  { icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" /></svg>, title: 'Smart Budget', desc: 'Track spending by category with real-time alerts and savings tips.' },
  { icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" /></svg>, title: 'City Explorer', desc: 'Browse 200+ cities with curated activities, costs, and insider tips.' },
  { icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>, title: 'Packing Lists', desc: 'Smart checklists by trip type — never forget your charger again.' },
  { icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>, title: 'Share & Collab', desc: 'Share your itinerary with a link. Let others clone and remix it.' },
];

export default function LandingPage() {
  const trending = getTrendingCities();

  return (
    <div className="bg-animated-mesh">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Gradient mesh overlays */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[rgba(0,212,255,0.02)] via-transparent to-transparent" />
        </div>

        <div className="container-custom relative z-10 text-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(0,212,255,0.1)] border border-[rgba(0,212,255,0.2)] text-sm text-[#00D4FF] font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse" />
              Now in Public Beta — Free to use
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight"
          >
            <TypewriterText />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10"
            style={{ color: 'var(--text-secondary)' }}
          >
            Build beautiful itineraries, optimize your route, track your budget, and share your adventures — all in one platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center justify-center gap-4 flex-wrap"
          >
            <Link href="/auth/signup">
              <Button size="lg" variant="primary">
                Start Planning Free →
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="secondary">
                View Demo
              </Button>
            </Link>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-16 flex items-center justify-center gap-8 md:gap-16 flex-wrap"
          >
            {[
              { value: '12,800+', label: 'Travelers' },
              { value: '34,200+', label: 'Trips Created' },
              { value: '220+', label: 'Cities Covered' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="stat-number text-2xl md:text-3xl font-bold text-gradient">{stat.value}</p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-32 relative" id="features">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Everything you need to
              <span className="text-gradient"> plan perfectly</span>
            </h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Six powerful tools, one beautiful platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full" padding="lg">
                  <div className="w-10 h-10 rounded-lg bg-[rgba(255,255,255,0.05)] border border-white/10 flex items-center justify-center text-white mb-6 flex-shrink-0">{feature.icon}</div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{feature.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TRENDING DESTINATIONS */}
      <section className="py-32 relative bg-[rgba(255,255,255,0.01)] border-y border-white/5">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Trending <span className="text-gradient">destinations</span>
            </h2>
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              Where the world is heading next.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trending.map((city, i) => (
              <motion.div
                key={city.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href="/cities" className="block">
                  <div className="relative rounded-2xl overflow-hidden aspect-[3/4] group">
                    <img
                      src={city.image_url}
                      alt={city.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-xs sm:text-sm font-bold">{city.flag_emoji} {city.name}</p>
                      <p className="text-xs opacity-70">{city.country}</p>
                      <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-sm text-[10px] font-mono">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                        ${city.avg_daily_cost}/day
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROUTE OPTIMIZER TEASER */}
      <section className="py-32 relative overflow-hidden" id="optimizer">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(255,123,53,0.1)] border border-[rgba(255,123,53,0.2)] text-xs text-[#FF7B35] font-semibold mb-4">
                ✨ WOW Feature
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Smart Route<br />
                <span className="text-gradient">Optimizer</span>
              </h2>
              <p className="text-lg mb-8" style={{ color: 'var(--text-secondary)' }}>
                Our algorithm analyzes your destinations and suggests the most efficient route — saving you time, money, and carbon.
              </p>
              <Link href="/auth/signup">
                <Button variant="warm" size="lg">
                  Try It Free →
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="space-y-4">
                {/* Current Route */}
                <div className="glass-card p-5">
                  <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>Current Route</p>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <span>🇮🇳 Delhi</span>
                    <span className="text-[var(--text-tertiary)]">→</span>
                    <span>🇫🇷 Paris</span>
                    <span className="text-[var(--text-tertiary)]">→</span>
                    <span>🇦🇪 Dubai</span>
                  </div>
                  <p className="mt-2 stat-number text-xl" style={{ color: 'var(--text-secondary)' }}>$2,400 est.</p>
                </div>

                {/* Optimized Route */}
                <div className="glass-card p-5 border-[rgba(16,185,129,0.3)]!" style={{ borderColor: 'rgba(16,185,129,0.3)' }}>
                  <p className="text-xs font-bold uppercase tracking-wider mb-3 text-[#10B981]">✨ Optimized Route</p>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <span>🇮🇳 Delhi</span>
                    <span className="text-[#10B981]">→</span>
                    <span>🇦🇪 Dubai</span>
                    <span className="text-[#10B981]">→</span>
                    <span>🇫🇷 Paris</span>
                  </div>
                  <p className="mt-2 stat-number text-xl text-[#10B981]">$1,850 est.</p>
                </div>

                {/* Savings */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-center py-4"
                >
                  <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[rgba(16,185,129,0.15)] text-[#10B981] font-bold text-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    Save $550!
                  </span>
                  <p className="text-xs mt-2" style={{ color: 'var(--text-tertiary)' }}>
                    Dubai is a natural stopover hub — reduces total flight distance by 1,200km
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 relative bg-[rgba(255,255,255,0.01)] border-t border-white/5">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Ready to plan your
              <br />
              <span className="text-gradient">next adventure?</span>
            </h2>
            <p className="text-lg max-w-xl mx-auto mb-10" style={{ color: 'var(--text-secondary)' }}>
              Join thousands of travelers building smarter itineraries with Traveloop.
            </p>
            <Link href="/auth/signup">
              <Button size="lg" variant="primary">
                Start Planning Free →
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
