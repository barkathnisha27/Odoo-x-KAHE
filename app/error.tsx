'use client';
import Link from 'next/link';
import { EmptyState } from '@/components/ui/EmptyState';

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-[#0A1628] via-[#101F3D] to-[#0A1628]">
      <EmptyState
        icon={<svg className="w-12 h-12 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>}
        title="Something went wrong"
        description="We hit an unexpected issue while loading this page. Please try again or return to the dashboard."
        primaryAction={
          <button onClick={reset} className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#0099FF] text-[#0A1628] font-semibold">
            Retry
          </button>
        }
        secondaryAction={
          <Link href="/dashboard">
            <button className="px-5 py-3 rounded-xl border border-white/10 text-sm text-white/80 hover:text-white">
              Go to Dashboard
            </button>
          </Link>
        }
      />
    </div>
  );
}
