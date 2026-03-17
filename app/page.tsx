'use client';
import Link from 'next/link';
import { Mail, Shield, Zap, Send, Server, ArrowRight, Code2, Lock } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function Home() {
  const { user, loading } = useAuth();

  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-bg-base relative overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-s-600 h-s-600 bg-[radial-gradient(circle,_rgba(108,99,255,0.08)_0%,_transparent_70%)] blur-s-60 pointer-events-none" />
      <div className="absolute bottom-[5%] right-[-5%] w-s-500 h-s-500 bg-[radial-gradient(circle,_rgba(167,139,250,0.06)_0%,_transparent_70%)] blur-s-60 pointer-events-none" />

      <Navbar />

      {/* Hero Section */}
      <section className="pt-s-160 pb-s-100 px-s-40 relative">
        <div className="max-w-s-900 mx-auto text-center">
          <div className="inline-flex items-center gap-s-8 px-s-16 py-s-6 bg-accent/10 border border-accent/20 rounded-s-100 mb-s-24 animate-fade-in">
            <Zap className="w-s-14 h-s-14 text-accent" />
            <span className="text-s-12 font-bold text-accent uppercase tracking-wider">Now in Beta</span>
          </div>
          
          <h1 className="text-s-72 font-extrabold leading-tight tracking-tight mb-s-24 animate-fade-in">
            Your SMTP. <span className="gradient-text">Absolute Control.</span>
          </h1>
          
          <p className="text-s-20 text-text-secondary max-w-s-640 mx-auto mb-s-48 leading-relaxed animate-fade-in delay-100">
            Send high-performance transactional emails through your own AWS SES, Postmark, or custom SMTP servers. Complete privacy, zero markup.
          </p>

          <div className="flex items-center justify-center gap-s-16 animate-fade-in delay-200">
            {loading ? (
              <div className="w-s-160 h-s-56 bg-bg-elevated rounded-s-12 animate-pulse flex items-center justify-center">
                <div className="animate-spin w-s-24 h-s-24 border-2 border-border border-t-accent rounded-full" />
              </div>
            ) : user ? (
              <Link href="/dashboard" className="px-s-36 py-s-18 bg-accent text-white rounded-s-12 font-bold text-s-16 transition-all hover:translate-y-[-2] shadow-accent-glow flex items-center gap-s-10 no-underline">
                Return to Dashboard <ArrowRight className="w-s-18 h-s-18" />
              </Link>
            ) : (
              <Link href="/auth" className="px-s-36 py-s-18 bg-accent text-white rounded-s-12 font-bold text-s-16 transition-all hover:translate-y-[-2] shadow-accent-glow flex items-center gap-s-10 no-underline">
                Start Sending Free <ArrowRight className="w-s-18 h-s-18" />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-s-80 px-s-40 max-w-s-1200 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-s-24">
          {[
            { 
              icon: <Lock className="w-s-20 h-s-20" />, 
              title: 'AES-256 Encryption', 
              desc: 'Your SMTP credentials never leave our server unencrypted. We use industry-standard GCM encryption.' 
            },
            { 
              icon: <Server className="w-s-20 h-s-20" />, 
              title: 'Bring Your Own Senders', 
              desc: 'Connect unlimited sender profiles. Routing is handle via clean API keys for different environments.' 
            },
            { 
              icon: <Code2 className="w-s-20 h-s-20" />, 
              title: 'Developer First', 
              desc: 'A robust REST API that fits into any stack. Simple POST requests to queue and send your emails.' 
            },
          ].map((feat, i) => (
            <div key={i} className="card p-s-32 transition-all hover:border-accent/40 group">
              <div className="w-s-48 h-s-48 bg-bg-elevated rounded-s-12 flex items-center justify-center mb-s-24 group-hover:bg-accent/10 transition-colors">
                <div className="text-accent">{feat.icon}</div>
              </div>
              <h3 className="text-s-20 font-bold mb-s-12 text-text-primary">{feat.title}</h3>
              <p className="text-s-15 text-text-secondary leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

