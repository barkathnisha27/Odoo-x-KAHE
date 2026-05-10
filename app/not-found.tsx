'use client';
import Link from 'next/link';
import { EmptyState } from '@/components/ui/EmptyState';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-[#0A1628] via-[#101F3D] to-[#0A1628]">
      <EmptyState
        icon="🧭"
        title="Page not found"
        description="The page you are looking for may have moved or not exist yet. Return to the dashboard and continue planning."
        primaryAction={
          <Link href="/dashboard">
            <button className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#0099FF] text-[#0A1628] font-semibold">
              Back to Dashboard
            </button>
          </Link>
        }
      />
    </div>
  );
}
