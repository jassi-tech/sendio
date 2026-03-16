"use client";

import React from 'react';
import { Lock, Server, Code2, Zap, Shield, Mail, BarChart3, Users } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const FEATURES = [
  {
    id: 'encryption',
    icon: <Lock className="w-s-24 h-s-24" />,
    title: 'AES-256 Encryption',
    description: 'Your SMTP credentials never leave our server unencrypted. We use industry-standard GCM encryption to keep your data secure.',
    details: ['End-to-end encryption', 'Zero-knowledge architecture', 'Compliance ready'],
    color: 'bg-accent/10 text-accent',
  },
  {
    id: 'senders',
    icon: <Server className="w-s-24 h-s-24" />,
    title: 'Bring Your Own Senders',
    description: 'Connect unlimited sender profiles. Routing is handled via clean API keys for different environments.',
    details: ['Unlimited profiles', 'Environment routing', 'Multi-tenant support'],
    color: 'bg-success/10 text-success',
  },
  {
    id: 'api',
    icon: <Code2 className="w-s-24 h-s-24" />,
    title: 'Developer First API',
    description: 'A robust REST API that fits into any stack. Simple POST requests to queue and send your emails.',
    details: ['RESTful endpoints', 'WebHook support', 'Rate limiting'],
    color: 'bg-info/10 text-info',
  },
  {
    id: 'performance',
    icon: <Zap className="w-s-24 h-s-24" />,
    title: 'High Performance',
    description: 'Send emails at scale with our optimized infrastructure built for reliability and speed.',
    details: ['Sub-second delivery', 'Global CDN', '99.9% uptime SLA'],
    color: 'bg-warning/10 text-warning',
  },
  {
    id: 'monitoring',
    icon: <BarChart3 className="w-s-24 h-s-24" />,
    title: 'Advanced Monitoring',
    description: 'Real-time analytics and detailed logs to track every email sent through your account.',
    details: ['Live dashboards', 'Delivery tracking', 'Event webhooks'],
    color: 'bg-accent/10 text-accent',
  },
  {
    id: 'templates',
    icon: <Mail className="w-s-24 h-s-24" />,
    title: 'Email Templates',
    description: 'Build beautiful, responsive email templates with our visual editor or use our API.',
    details: ['Visual builder', 'Template versioning', 'A/B testing'],
    color: 'bg-success/10 text-success',
  },
  {
    id: 'suppression',
    icon: <Shield className="w-s-24 h-s-24" />,
    title: 'Suppression Lists',
    description: 'Automatically manage unsubscribes, bounces, and complaints to maintain sender reputation.',
    details: ['Auto-management', 'Bulk imports', 'Compliance rules'],
    color: 'bg-info/10 text-info',
  },
  {
    id: 'team',
    icon: <Users className="w-s-24 h-s-24" />,
    title: 'Team Collaboration',
    description: 'Invite team members with granular permissions and manage your email infrastructure together.',
    details: ['Role-based access', 'Team billing', 'Activity logs'],
    color: 'bg-warning/10 text-warning',
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-bg-base text-text-primary">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-s-120 pb-s-80 px-s-40">
        <div className="max-w-s-1000 mx-auto text-center">
          <div className="inline-flex items-center gap-s-8 px-s-16 py-s-6 bg-accent/10 border border-accent/20 rounded-s-100 mb-s-24">
            <Zap className="w-s-14 h-s-14 text-accent" />
            <span className="text-s-12 font-bold text-accent uppercase tracking-wider">Powerful Features</span>
          </div>

          <h1 className="text-s-64 font-extrabold mb-s-32 leading-tight">
            Everything you need to <span className="gradient-text">send emails reliably</span>
          </h1>

          <p className="text-s-18 text-text-secondary max-w-s-700 mx-auto leading-relaxed">
            Built with developers in mind. From encryption to analytics, we've got all the tools you need to send transactional emails at scale.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-s-100 px-s-40">
        <div className="max-w-s-1400 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-s-24">
            {FEATURES.map((feature) => (
              <div key={feature.id} className="card group hover:border-text-muted/50 transition-all p-s-32">
                {/* Icon */}
                <div className={`${feature.color} w-s-56 h-s-56 rounded-s-12 flex items-center justify-center mb-s-24 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 className="text-s-18 font-bold text-text-primary mb-s-12">{feature.title}</h3>

                {/* Description */}
                <p className="text-s-14 text-text-secondary mb-s-24 leading-relaxed">{feature.description}</p>

                {/* Details List */}
                <ul className="space-y-s-8">
                  {feature.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-s-8">
                      <div className="w-s-4 h-s-4 rounded-full bg-accent mt-s-4 flex-shrink-0" />
                      <span className="text-s-12 text-text-secondary">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-s-100 px-s-40">
        <div className="max-w-s-900 mx-auto text-center">
          <div className="card glass p-s-64">
            <h2 className="text-s-48 font-extrabold mb-s-24">Ready to get started?</h2>
            <p className="text-s-18 text-text-secondary mb-s-48 leading-relaxed max-w-s-600 mx-auto">
              Join thousands of developers who trust MailFlow for their transactional emails.
            </p>
            <div className="flex items-center justify-center gap-s-16 flex-wrap">
              <button className="px-s-36 py-s-18 bg-accent text-white rounded-s-12 font-bold text-s-14 transition-all hover:scale-105 hover:shadow-accent-glow">
                START FREE TRIAL
              </button>
              <button className="px-s-36 py-s-18 border border-border text-text-muted rounded-s-12 font-bold text-s-14 transition-all hover:border-accent hover:text-accent">
                VIEW PRICING
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
