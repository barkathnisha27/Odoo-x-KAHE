'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { motion } from 'framer-motion';

interface PageWrapperProps {
  children: React.ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  const pathname = usePathname();
  const isLanding = pathname === '/';
  const isAuth = pathname?.startsWith('/auth');
  const isShare = pathname?.startsWith('/share');
  const showSidebar = !isLanding && !isAuth && !isShare;

  return (
    <div className="min-h-screen" style={{ paddingTop: 'var(--navbar-height)' }}>
      {showSidebar && <Sidebar />}
      <main
        className="transition-[margin] duration-300 ease-in-out"
        style={showSidebar ? { marginLeft: 'var(--sidebar-width)' } : undefined}
      >
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      </main>
      {/* Responsive: on screens below lg, sidebar is hidden, so remove margin */}
      <style>{`
        @media (max-width: 1023px) {
          main { margin-left: 0 !important; }
        }
      `}</style>
    </div>
  );
}

