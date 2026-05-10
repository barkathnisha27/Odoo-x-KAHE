'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from './Sidebar';

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
    <div className="min-h-screen pt-16">
      {showSidebar && <Sidebar />}
      <main className={showSidebar ? 'lg:ml-60' : ''}>
        {children}
      </main>
    </div>
  );
}
