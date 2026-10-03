'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-white">SmartBookkeeper</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/#features" className="text-sm text-zinc-400 hover:text-white transition-colors">Features</Link>
            <Link href="/#pricing" className="text-sm text-zinc-400 hover:text-white transition-colors">Pricing</Link>
            <Link href="/#testimonials" className="text-sm text-zinc-400 hover:text-white transition-colors">Testimonials</Link>
            {!loading && (
              <>
                {user ? (
                  <>
                    <Link href="/dashboard" className="text-sm text-zinc-400 hover:text-white transition-colors">Dashboard</Link>
                    <button onClick={handleLogout} className="btn-secondary text-sm">Log out</button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="text-sm text-zinc-400 hover:text-white transition-colors">Log in</Link>
                    <Link href="/signup" className="btn-primary text-sm">Get Started</Link>
                  </>
                )}
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-zinc-400 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-zinc-900 border-b border-zinc-800">
          <div className="px-4 py-4 space-y-3">
            <Link href="/#features" className="block text-sm text-zinc-400 hover:text-white" onClick={() => setMobileOpen(false)}>Features</Link>
            <Link href="/#pricing" className="block text-sm text-zinc-400 hover:text-white" onClick={() => setMobileOpen(false)}>Pricing</Link>
            <Link href="/#testimonials" className="block text-sm text-zinc-400 hover:text-white" onClick={() => setMobileOpen(false)}>Testimonials</Link>
            <hr className="border-zinc-800" />
            {!loading && (
              <>
                {user ? (
                  <>
                    <Link href="/dashboard" className="block text-sm text-zinc-400 hover:text-white" onClick={() => setMobileOpen(false)}>Dashboard</Link>
                    <button onClick={handleLogout} className="block text-sm text-zinc-400 hover:text-white">Log out</button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="block text-sm text-zinc-400 hover:text-white" onClick={() => setMobileOpen(false)}>Log in</Link>
                    <Link href="/signup" className="block btn-primary text-sm text-center" onClick={() => setMobileOpen(false)}>Get Started</Link>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
