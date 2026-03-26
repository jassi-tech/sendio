'use client';
import { useState } from 'react';
import { Mail, Zap, Shield, Send, ArrowLeft } from 'lucide-react';
import { useRequestMagicLink } from '@/hooks/useAuth';
import { authApi } from '@/lib/api';
import { useToast } from '@/context/ToastContext';
import Link from 'next/link';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const { showToast } = useToast();
  const requestMutation = useRequestMagicLink();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await requestMutation.mutateAsync(email);
      setSent(true);
      showToast('Sent successfully!', 'success');
    } catch (err: any) {
      const msg = err.message || 'Failed to send';
      setError(msg);
      showToast(msg, 'error');
    }
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-bg-base flex items-center justify-center p-s-24 relative overflow-hidden">
      {/* Back to Home Link */}
      <Link 
        href="/" 
        className="absolute top-s-24 left-s-24 flex items-center gap-s-8 text-text-secondary hover:text-text-primary transition-colors text-s-14 font-medium no-underline z-10 p-s-8"
      >
        <ArrowLeft className="w-s-16 h-s-16" />
        Back to home
      </Link>

      {/* Background glow orbs */}
      <div className="absolute top-[20%] left-[30%] w-s-400 h-s-400 bg-[radial-gradient(circle,_rgba(108,99,255,0.12)_0%,_transparent_70%)] blur-s-40 pointer-events-none" />
      <div className="absolute bottom-[10%] right-[20%] w-s-300 h-s-300 bg-[radial-gradient(circle,_rgba(167,139,250,0.08)_0%,_transparent_70%)] blur-s-40 pointer-events-none" />

      <div className="w-full max-w-md animate-fade-in">
        {/* Logo */}
        <div className="text-center mb-s-40">
          <div className="inline-flex items-center gap-s-10 mb-s-16">
            <div className="w-s-44 h-s-44 bg-gradient-to-br from-accent to-accent-dim rounded-s-12 flex items-center justify-center shadow-accent-glow">
              <Mail className="w-s-22 h-s-22 text-white" />
            </div>
            <span className="text-s-28 font-extrabold tracking-tight bg-gradient-to-br from-text-primary to-text-secondary bg-clip-text text-transparent">MailFlow</span>
          </div>
          <p className="text-s-15 text-text-secondary">
            Your SMTP. Your emails. Your control.
          </p>
        </div>

        {/* Card */}
        <div className="card p-s-36">
          {!sent ? (
            <>
              <h1 className="text-s-22 font-bold mb-s-8 text-text-primary">
                Sign in to MailFlow
              </h1>
              <p className="text-s-14 text-text-secondary mb-s-28">
                Enter your email and we&apos;ll send you a link.
              </p>

              <form onSubmit={handleSubmit}>
                <label className="block text-s-13 font-medium text-text-secondary mb-s-8">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className={`w-full p-s-12 px-s-16 bg-bg-elevated border border-border rounded-s-8 text-text-primary text-s-15 outline-none transition-all focus:border-accent ${error ? 'mb-s-8' : 'mb-s-20'}`}
                />
                <button
                  type="submit"
                  disabled={requestMutation.isPending}
                  className={`w-full py-s-13 px-s-20 rounded-s-8 text-white text-s-15 font-semibold flex items-center justify-center gap-s-8 transition-all shadow-accent-glow ${requestMutation.isPending ? 'bg-bg-hover cursor-not-allowed shadow-none' : 'bg-gradient-to-r from-accent to-accent-dim hover:opacity-90'}`}
                >
                  {requestMutation.isPending ? (
                    <div className="animate-spin w-s-18 h-s-18 border-2 border-white/30 border-t-white rounded-full" />
                  ) : (
                    <><Send className="w-s-16 h-s-16" /> Send Magic Link</>
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-s-16">
              <div className="w-s-64 h-s-64 bg-success/15 border border-success/30 rounded-full flex items-center justify-center mx-auto mb-s-20">
                <Mail className="w-s-28 h-s-28 text-success" />
              </div>
              <h2 className="text-s-20 font-bold mb-s-10 text-text-primary">
                Check your inbox!
              </h2>
              <p className="text-s-14 text-text-secondary leading-s-24">
                We sent a link to <strong className="text-text-primary">{email}</strong>.<br />
                The link expires in 15 minutes.
              </p>
              <button
                onClick={() => { setSent(false); setEmail(''); }}
                className="mt-s-24 text-s-14 text-accent bg-transparent border-none cursor-pointer underline hover:text-accent-dim"
              >
                Use a different email
              </button>
            </div>
          )}
        </div>

        {/* Features strip */}
        <div className="flex justify-center gap-s-28 mt-s-32 flex-wrap">
          {[
            { icon: <Zap className="w-s-14 h-s-14" />, text: 'Your SMTP credentials' },
            { icon: <Shield className="w-s-14 h-s-14" />, text: 'AES-256 encrypted' },
            { icon: <Send className="w-s-14 h-s-14" />, text: 'Queue-powered sending' },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-s-6 text-text-muted text-s-13">
              {icon} {text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
