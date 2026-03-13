'use client';
import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, XCircle, Mail } from 'lucide-react';
import { authApi } from '@/lib/api';
import { useAuth } from '@/lib/auth';

function VerifyContent() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setStatus('error');
      setMessage('No token provided.');
      return;
    }

    authApi.verify(token)
      .then(async ({ token: jwt }) => {
        await login(jwt);
        setStatus('success');
        setTimeout(() => router.replace('/dashboard'), 1500);
      })
      .catch((err: unknown) => {
        setStatus('error');
        setMessage((err as Error).message || 'Token invalid or expired');
      });
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center p-s-24">
      <div className="card p-s-48 text-center max-w-sm w-full animate-fade-in">
        {status === 'loading' && (
          <>
            <div className="w-s-56 h-s-56 border-s-3 border-border border-t-accent rounded-full animate-spin mx-auto mb-s-20" />
            <p className="text-text-secondary text-s-15">
              Verifying your magic link…
            </p>
          </>
        )}
        {status === 'success' && (
          <>
            <div className="w-s-64 h-s-64 bg-success/15 border border-success/30 rounded-full flex items-center justify-center mx-auto mb-s-20">
              <CheckCircle className="w-s-32 h-s-32 text-success" />
            </div>
            <h2 className="text-s-20 font-bold text-text-primary mb-s-8">
              Authenticated!
            </h2>
            <p className="text-text-secondary text-s-14">
              Redirecting to your dashboard…
            </p>
          </>
        )}
        {status === 'error' && (
          <>
            <div className="w-s-64 h-s-64 bg-error/10 border border-error/30 rounded-full flex items-center justify-center mx-auto mb-s-20">
              <XCircle className="w-s-32 h-s-32 text-error" />
            </div>
            <h2 className="text-s-20 font-bold text-text-primary mb-s-8">
              Link expired
            </h2>
            <p className="text-text-secondary text-s-14 mb-s-24">
              {message}
            </p>
            <button
              onClick={() => router.push('/auth')}
              className="px-s-20 py-s-10 bg-accent text-white text-s-14 font-semibold rounded-s-8 flex items-center justify-center gap-s-6 mx-auto hover:bg-accent-dim transition-all"
            >
              <Mail className="w-s-14 h-s-14" /> Request new link
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense>
      <VerifyContent />
    </Suspense>
  );
}
