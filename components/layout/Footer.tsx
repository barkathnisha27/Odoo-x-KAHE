import React from 'react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '/#features' },
        { label: 'Cities', href: '/cities' },
        { label: 'Pricing', href: '/#pricing' },
        { label: 'Route Optimizer', href: '/#optimizer' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Blog', href: '/blog' },
        { label: 'Careers', href: '/careers' },
        { label: 'Press', href: '/press' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', href: '/help' },
        { label: 'Contact', href: '/contact' },
        { label: 'Privacy', href: '/privacy' },
        { label: 'Terms', href: '/terms' },
      ],
    },
  ];

  return (
    <footer className="border-t border-white/5 bg-[var(--color-primary)]">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00D4FF] to-[#0099FF] flex items-center justify-center text-lg font-bold text-[#0A1628]">
                T
              </div>
              <span className="text-xl font-bold font-display">
                Travel<span className="text-[#00D4FF]">oop</span>
              </span>
            </Link>
            <p className="text-sm max-w-xs mb-6" style={{ color: 'var(--text-secondary)' }}>
              Plan smarter. Travel deeper. The modern travel planning platform for conscious explorers.
            </p>
            <div className="flex gap-3">
              {['𝕏', 'in', 'ig', 'yt'].map((social) => (
                <button
                  key={social}
                  className="w-9 h-9 rounded-lg bg-[rgba(255,255,255,0.06)] flex items-center justify-center text-xs font-bold text-[var(--text-secondary)] hover:text-[#00D4FF] hover:bg-[rgba(0,212,255,0.1)] transition-all"
                  aria-label={`Follow on ${social}`}
                >
                  {social}
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-bold mb-4 uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors hover:text-[#00D4FF]"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
            © {currentYear} Traveloop. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
            Made with 💙 for travelers worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
