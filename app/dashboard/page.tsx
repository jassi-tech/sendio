'use client';
import { useEffect, useState } from 'react';
import { Send, CheckCircle, XCircle, Clock, Server, Key, ArrowRight, Activity } from 'lucide-react';
import { logsApi, smtpApi, keysApi } from '@/lib/api';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface Stat {
  label: string;
  value: number;
  icon: React.ElementType;
  variant: 'success' | 'error' | 'warning' | 'accent' | 'info';
}

export default function OverviewPage() {
  const [stats, setStats] = useState({ sent: 0, failed: 0, queued: 0, senders: 0, keys: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([
      logsApi.list({ limit: 1, status: 'sent' }),
      logsApi.list({ limit: 1, status: 'failed' }),
      logsApi.list({ limit: 1, status: 'queued' }),
      smtpApi.list() as Promise<unknown[]>,
      keysApi.list() as Promise<unknown[]>,
    ]).then(([s, f, q, sn, k]) => {
      setStats({
        sent:    s.status === 'fulfilled' ? (s.value as any).pagination?.total ?? 0 : 0,
        failed:  f.status === 'fulfilled' ? (f.value as any).pagination?.total ?? 0 : 0,
        queued:  q.status === 'fulfilled' ? (q.value as any).pagination?.total ?? 0 : 0,
        senders: sn.status === 'fulfilled' ? (sn.value as unknown[]).length : 0,
        keys:    k.status === 'fulfilled'  ? (k.value as unknown[]).length : 0,
      });
    }).finally(() => setLoading(false));
  }, []);

  const statsConfig: Stat[] = [
    { label: 'Emails Sent',   value: stats.sent,    icon: CheckCircle, variant: 'success' },
    { label: 'Failed',        value: stats.failed,  icon: XCircle,     variant: 'error' },
    { label: 'In Queue',      value: stats.queued,  icon: Clock,       variant: 'warning' },
    { label: 'Sender Profiles', value: stats.senders, icon: Server,      variant: 'accent' },
    { label: 'API Keys',      value: stats.keys,    icon: Key,         variant: 'info' },
  ];

  return (
    <div className="animate-fade-in space-y-s-40">
      {/* Header */}
      <div>
        <h1 className="text-s-32 font-black text-text-primary tracking-tight mb-s-8">
          Overview
        </h1>
        <p className="text-text-secondary text-s-16 max-w-s-600">
          Monitor your email infrastructure performance and delivery stats in real-time.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-s-20">
        {statsConfig.map(({ label, value, icon: Icon, variant }) => (
          <Card key={label} hoverable padded={false} className="p-s-24 flex flex-col justify-between group overflow-hidden relative">
            <div className={`absolute top-0 right-0 w-s-64 h-s-64 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity -mr-s-16 -mt-s-16`}>
              <Icon className="w-full h-full" />
            </div>
            
            <div className="flex items-center gap-s-10 mb-s-20">
              <Badge variant={variant} icon={<Icon size={14} />} className="rounded-s-8">
                {variant.toUpperCase()}
              </Badge>
              <span className="text-s-12 font-bold text-text-muted uppercase tracking-widest">{label}</span>
            </div>

            
            <div className="flex items-baseline gap-s-8">
              <div className={`text-s-32 font-black ${loading ? 'text-text-muted' : 'text-text-primary'}`}>
                {loading ? '...' : value.toLocaleString()}
              </div>
              {!loading && value > 0 && (
                 <div className="text-s-11 font-bold text-success flex items-center gap-s-2 mb-s-4">
                    <Activity size={10} /> Live
                 </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Action Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-s-24">
        {/* Quick Start */}
        <Card variant="glass" className="relative overflow-hidden group">
          <div className="absolute top-[-20%] right-[-10%] w-s-300 h-s-300 bg-accent/5 blur-s-60 rounded-full pointer-events-none" />
          
          <div className="flex items-start gap-s-24 mb-s-32">
            <div className="w-s-56 h-s-56 bg-accent rounded-s-16 flex items-center justify-center shadow-accent-glow shrink-0">
               <Send className="w-s-28 h-s-28 text-white" />
            </div>
            <div>
              <h2 className="text-s-24 font-black text-text-primary mb-s-8">Welcome to MailFlow</h2>
              <p className="text-text-secondary text-s-15 leading-relaxed">
                Connect your SMTP credentials and start sending transactional emails through our robust API.
              </p>
            </div>
          </div>

          <div className="space-y-s-12">
            {[
              { text: 'Configure Sender Profile', href: '/dashboard/senders', step: '1' },
              { text: 'Create New API Key', href: '/dashboard/apikeys', step: '2' },
              { text: 'Review Documentation', href: '/dashboard/logs', step: '3' },
            ].map((item) => (
              <Button 
                key={item.text} 
                variant="secondary" 
                className="w-full justify-between group/btn text-s-14 font-bold"
                onClick={() => window.location.href = item.text}
              >
                <div className="flex items-center gap-s-12">
                  <span className="w-s-24 h-s-24 rounded-full bg-bg-base border border-border flex items-center justify-center text-s-11 text-accent">
                    {item.step}
                  </span>
                  {item.text}
                </div>
                <ArrowRight className="w-s-16 h-s-16 opacity-0 -translate-x-s-4 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all" />
              </Button>
            ))}
          </div>
        </Card>

        {/* Placeholder for real-time chart or recent activity */}
        <Card className="flex flex-col items-center justify-center text-center">
            <div className="w-s-64 h-s-64 rounded-full bg-bg-elevated flex items-center justify-center mb-s-20 border border-border text-text-muted">
               <Activity size={32} />
            </div>
            <h3 className="text-s-18 font-bold text-text-primary mb-s-8">Ready to Scale</h3>
            <p className="text-text-secondary text-s-14 max-w-s-300">
               Once you start sending, delivery performance charts will appear here.
            </p>
            <Button variant="primary" size="sm" className="mt-s-24" icon={<Key size={14} />}>
               Get Your API Keys
            </Button>

        </Card>
      </section>
    </div>
  );
}

