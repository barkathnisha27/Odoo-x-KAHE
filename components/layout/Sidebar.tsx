'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sidebarLinks = [
  { section: 'Main', items: [
    { href: '/dashboard', label: 'Dashboard', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" /></svg> },
    { href: '/trips', label: 'My Trips', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg> },
    { href: '/trips/create', label: 'New Trip', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg> },
  ]},
  { section: 'Explore', items: [
    { href: '/cities', label: 'Cities', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
    { href: '/activities', label: 'Activities', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
  ]},
  { section: 'Admin', items: [
    { href: '/admin', label: 'Analytics', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> },
  ]},
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="hidden lg:flex flex-col glass-sidebar fixed bottom-0 left-0 overflow-y-auto overflow-x-hidden no-scrollbar"
      style={{
        top: 'var(--navbar-height)',
        width: 'var(--sidebar-width)',
        zIndex: 'var(--z-sidebar)',
      }}
    >
      <div className="flex flex-col flex-1 pt-8 pb-6 px-4">
        {sidebarLinks.map((section) => (
          <div key={section.section} className="mb-6">
            <p className="px-6 mb-2 text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: 'var(--text-tertiary)' }}>
              {section.section}
            </p>
            {section.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  pathname === item.href
                    ? 'bg-[rgba(255,255,255,0.1)] text-white shadow-sm shadow-black/20'
                    : 'text-[var(--text-secondary)] hover:text-white hover:bg-[rgba(255,255,255,0.06)]'
                }`}
              >
                <div className="w-6 h-5 flex items-center justify-center flex-shrink-0">{item.icon}</div>
                <span className="truncate">{item.label}</span>
              </Link>
            ))}
          </div>
        ))}
      </div>

      {/* Bottom user card */}
      <div className="mx-4 mb-6 p-4 rounded-xl bg-[rgba(255,255,255,0.03)] border border-white/5 hover:bg-[rgba(255,255,255,0.06)] transition-all cursor-pointer flex-shrink-0">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.1)] border border-white/10 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
            AT
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">Alex Traveler</p>
            <p className="text-[11px] font-medium tracking-wide uppercase truncate" style={{ color: 'var(--text-tertiary)' }}>Pro Plan</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
