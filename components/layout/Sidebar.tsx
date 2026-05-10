'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sidebarLinks = [
  { section: 'Main', items: [
    { href: '/dashboard', label: 'Dashboard', icon: '🏠' },
    { href: '/trips', label: 'My Trips', icon: '✈️' },
    { href: '/trips/create', label: 'New Trip', icon: '➕' },
  ]},
  { section: 'Explore', items: [
    { href: '/cities', label: 'Cities', icon: '🌍' },
    { href: '/activities', label: 'Activities', icon: '🎯' },
  ]},
  { section: 'Admin', items: [
    { href: '/admin', label: 'Analytics', icon: '📊' },
  ]},
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-60 glass-sidebar fixed top-16 bottom-0 left-0 pt-6 pb-4 overflow-y-auto">
      {sidebarLinks.map((section) => (
        <div key={section.section} className="mb-6">
          <p className="px-5 mb-2 text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: 'var(--text-tertiary)' }}>
            {section.section}
          </p>
          {section.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 mx-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                pathname === item.href
                  ? 'bg-gradient-to-r from-[rgba(0,212,255,0.15)] to-[rgba(0,212,255,0.05)] text-[#00D4FF] border-l-2 border-[#00D4FF]'
                  : 'text-[var(--text-secondary)] hover:text-white hover:bg-[rgba(255,255,255,0.04)]'
              }`}
            >
              <span className="text-lg w-6 text-center">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>
      ))}

      {/* Bottom user card */}
      <div className="mt-auto mx-3 p-3 rounded-xl bg-[rgba(255,255,255,0.04)] border border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#FF7B35] flex items-center justify-center text-xs font-bold text-white">
            AT
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Alex Traveler</p>
            <p className="text-xs truncate" style={{ color: 'var(--text-tertiary)' }}>Pro Plan</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
