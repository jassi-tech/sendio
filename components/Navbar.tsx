'use client';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { useAuth } from '@/lib/auth';

export function Navbar() {
  const { user, loading } = useAuth();

  return (
    <div className="z-50 px-s-40 pt-s-24">
      <nav className="max-w-s-1200 mx-auto glass rounded-s-16 py-s-12 px-s-32 flex items-center justify-between shadow-2xl border-white/10">
        {/* Logo/Brand */}
        <Link href="/" className="flex items-center gap-s-10 no-underline group">
          <div className="w-s-32 h-s-32 bg-gradient-to-br from-[#6c63ff] to-[#a855f7] rounded-s-8 flex items-center justify-center shadow-accent-glow transition-transform group-hover:scale-105">
            <Mail className="w-s-16 h-s-16 text-white" />
          </div>
          <span className="text-s-18 font-bold text-text-primary tracking-tight transition-colors group-hover:text-accent">
            MailFlow
          </span>
        </Link>

        {/* Middle Nav - Desktop only */}
        <div className="hidden md:flex items-center gap-s-32">
          {['Features', 'Pricing', 'Resources', 'Enterprise', 'Support'].map((item) => (
            <Link 
              key={item} 
              href={item === 'Pricing' ? '/pricing' : `/${item.toLowerCase()}`} 
              className="text-s-13 font-medium text-text-secondary hover:text-text-primary transition-colors no-underline"
            >
              {item}
            </Link>
          ))}
        </div>
        
        {/* Auth Actions */}
        <div className="flex items-center gap-s-24">
          {loading ? (
            <div className="animate-spin w-s-18 h-s-18 border-2 border-border border-t-accent rounded-full" />
          ) : user ? (
            <Link 
              href="/dashboard" 
              className="px-s-20 py-s-10 bg-accent text-white rounded-s-10 font-bold text-s-13 transition-all hover:opacity-90 hover:translate-y-[-1] shadow-accent-glow no-underline"
            >
              Dashboard
            </Link>
          ) : (
            <div className="flex items-center gap-s-20">
              <Link 
                href="/auth" 
                className="text-s-13 font-medium text-text-secondary hover:text-text-primary transition-all no-underline"
              >
                Sign In
              </Link>
              <Link 
                href="/auth" 
                className="px-s-20 py-s-10 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white rounded-s-10 font-bold text-s-13 transition-all hover:opacity-90 hover:translate-y-[-1] shadow-accent-glow no-underline whitespace-nowrap"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
