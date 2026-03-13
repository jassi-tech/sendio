"use client";

import React from 'react';
import { Check, Shield, Zap, Users, BarChart3, Lock, Globe, Headphones } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const ENTERPRISE_FEATURES = [
  { icon: <Shield className="w-s-20 h-s-20" />, title: 'Enterprise Security', desc: 'SOC 2 Type II compliant with dedicated security reviews' },
  { icon: <Zap className="w-s-20 h-s-20" />, title: 'Unlimited Volume', desc: 'Send millions of emails with guaranteed infrastructure' },
  { icon: <Users className="w-s-20 h-s-20" />, title: 'Dedicated Support', desc: '24/7 priority support with dedicated account manager' },
  { icon: <Globe className="w-s-20 h-s-20" />, title: 'Global Infrastructure', desc: 'Multi-region deployment with automatic failover' },
  { icon: <BarChart3 className="w-s-20 h-s-20" />, title: 'Advanced Analytics', desc: 'Custom dashboards and reports for your team' },
  { icon: <Lock className="w-s-20 h-s-20" />, title: 'Custom SLA', desc: '99.99% uptime SLA with dedicated monitoring' },
];

const BENEFITS = [
  'Custom pricing and billing arrangements',
  'Dedicated infrastructure and IP addresses',
  'White-label solution available',
  'Custom integrations and API modifications',
  'Priority feature development',
  'Compliance assistance (GDPR, HIPAA, etc.)',
  'On-premises deployment options',
  'Advanced security and audit logs',
];

export default function EnterprisePage() {
  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-s-120 pb-s-80 px-s-40">
        <div className="max-w-s-1000 mx-auto text-center">
          <div className="inline-flex items-center gap-s-8 px-s-16 py-s-6 bg-accent/10 border border-accent/20 rounded-s-100 mb-s-24">
            <Zap className="w-s-14 h-s-14 text-accent" />
            <span className="text-s-12 font-bold text-accent uppercase tracking-wider">Enterprise Solutions</span>
          </div>

          <h1 className="text-s-64 font-extrabold mb-s-32 leading-tight">
            Scale with <span className="gradient-text">enterprise-grade infrastructure</span>
          </h1>

          <p className="text-s-18 text-text-secondary max-w-s-700 mx-auto mb-s-48 leading-relaxed">
            Trusted by Fortune 500 companies. Get dedicated support, custom SLAs, and infrastructure built for scale.
          </p>

          <button className="px-s-40 py-s-20 bg-accent text-white rounded-s-12 font-bold text-s-16 transition-all hover:scale-105 hover:shadow-accent-glow">
            Contact Sales
          </button>
        </div>
      </section>

      {/* Enterprise Features */}
      <section className="py-s-100 px-s-40">
        <div className="max-w-s-1400 mx-auto">
          <h2 className="text-s-40 font-bold text-center mb-s-64">Enterprise Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-s-24">
            {ENTERPRISE_FEATURES.map((feature, idx) => (
              <div key={idx} className="card p-s-32 hover:border-text-muted/50 transition-all group">
                <div className="w-s-56 h-s-56 bg-accent/10 rounded-s-12 flex items-center justify-center mb-s-24 text-accent group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-s-18 font-bold mb-s-12">{feature.title}</h3>
                <p className="text-s-14 text-text-secondary">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-s-100 px-s-40 bg-bg-card/30">
        <div className="max-w-s-1000 mx-auto">
          <h2 className="text-s-40 font-bold mb-s-64 text-center">What's Included</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-s-32">
            {BENEFITS.map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-s-16">
                <Check className="w-s-24 h-s-24 text-success flex-shrink-0 mt-s-2" />
                <span className="text-s-16 text-text-secondary">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-s-100 px-s-40">
        <div className="max-w-s-900 mx-auto">
          <div className="card glass p-s-64 text-center">
            <h2 className="text-s-48 font-extrabold mb-s-24">Ready for Enterprise?</h2>
            <p className="text-s-16 text-text-secondary mb-s-48 leading-relaxed max-w-s-600 mx-auto">
              Let's discuss how MailFlow can support your enterprise needs with custom solutions tailored to your requirements.
            </p>
            <div className="flex items-center justify-center gap-s-16 flex-wrap">
              <button className="px-s-40 py-s-20 bg-accent text-white rounded-s-12 font-bold text-s-16 transition-all hover:scale-105 hover:shadow-accent-glow">
                SCHEDULE DEMO
              </button>
              <button className="px-s-40 py-s-20 border border-border text-text-muted rounded-s-12 font-bold text-s-16 transition-all hover:border-accent hover:text-accent">
                CONTACT SALES
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
