"use client";

import React, { useState } from 'react';
import { MessageCircle, Mail, Phone, Clock, Search, ChevronDown, Send } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const FAQ = [
  {
    question: 'How do I get started with MailFlow?',
    answer: 'Sign up for a free account, verify your email, and you can start sending emails immediately. Check our getting started guide for detailed setup instructions.'
  },
  {
    question: 'What are the rate limits?',
    answer: 'Free plan: 200 requests/month. Personal: 2,000/month. Professional: 5,000-10,000/month (adjustable). Business: 25,000-200,000/month. Enterprise plans have no limits.'
  },
  {
    question: 'Can I use my own SMTP server?',
    answer: 'Yes! That\'s one of our core features. You can connect unlimited sender profiles with your own AWS SES, Postmark, or custom SMTP servers.'
  },
  {
    question: 'Is my data secure?',
    answer: 'Absolutely. We use AES-256 encryption for all credentials, implement zero-knowledge architecture, and are SOC 2 Type II compliant for enterprise users.'
  },
  {
    question: 'What\'s your support response time?',
    answer: 'Free plans: 24-48 hours. Paid plans: 4-12 hours. Enterprise: 1 hour priority support with dedicated account manager available 24/7.'
  },
  {
    question: 'Do you offer webhooks?',
    answer: 'Yes, we support webhooks for delivery events, bounces, complaints, and more. Full webhook documentation is available in our API reference.'
  },
];

export default function SupportPage() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-bg-base text-text-primary">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-s-120 pb-s-80 px-s-40">
        <div className="max-w-s-1000 mx-auto text-center">
          <h1 className="text-s-64 font-extrabold mb-s-32 leading-tight">
            We're here to <span className="gradient-text">help</span>
          </h1>
          <p className="text-s-18 text-text-secondary max-w-s-700 mx-auto leading-relaxed">
            Got questions? We have answers. Reach out to our support team or browse our knowledge base.
          </p>
        </div>
      </section>

      {/* Support Channels */}
      <section className="py-s-100 px-s-40">
        <div className="max-w-s-1200 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-s-24 mb-s-100">
            <div className="card p-s-40 text-center hover:border-text-muted/50 transition-all">
              <MessageCircle className="w-s-40 h-s-40 text-accent mx-auto mb-s-24" />
              <h3 className="text-s-20 font-bold mb-s-12">Live Chat</h3>
              <p className="text-s-14 text-text-secondary mb-s-24">
                Chat with our support team in real-time
              </p>
              <button className="text-accent text-s-14 font-bold hover:underline">
                Start Chat →
              </button>
            </div>

            <div className="card p-s-40 text-center hover:border-text-muted/50 transition-all">
              <Mail className="w-s-40 h-s-40 text-success mx-auto mb-s-24" />
              <h3 className="text-s-20 font-bold mb-s-12">Email Support</h3>
              <p className="text-s-14 text-text-secondary mb-s-24">
                Send us an email anytime
              </p>
              <a href="mailto:support@mailflow.com" className="text-success text-s-14 font-bold hover:underline">
                support@mailflow.com →
              </a>
            </div>

            <div className="card p-s-40 text-center hover:border-text-muted/50 transition-all">
              <Phone className="w-s-40 h-s-40 text-info mx-auto mb-s-24" />
              <h3 className="text-s-20 font-bold mb-s-12">Phone Support</h3>
              <p className="text-s-14 text-text-secondary mb-s-24">
                Enterprise customers can call us
              </p>
              <a href="tel:+1234567890" className="text-info text-s-14 font-bold hover:underline">
                +1 (234) 567-890 →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Response Times */}
      <section className="py-s-100 px-s-40 bg-bg-card/30">
        <div className="max-w-s-1000 mx-auto">
          <h2 className="text-s-40 font-bold mb-s-64 text-center">Support Response Times</h2>
          
          <div className="space-y-s-16">
            {[
              { plan: 'Free Plan', time: '24-48 hours', icon: 'bg-accent/10 text-accent' },
              { plan: 'Personal Plan', time: '12-24 hours', icon: 'bg-success/10 text-success' },
              { plan: 'Professional Plan', time: '4-12 hours', icon: 'bg-info/10 text-info' },
              { plan: 'Business Plan', time: '2-4 hours', icon: 'bg-warning/10 text-warning' },
              { plan: 'Enterprise', time: '1 hour (24/7)', icon: 'bg-accent/10 text-accent' },
            ].map((item, idx) => (
              <div key={idx} className="card p-s-32 flex items-center justify-between">
                <div className="flex items-center gap-s-16">
                  <Clock className={`w-s-24 h-s-24 flex-shrink-0 ${item.icon}`} />
                  <span className="text-s-16 font-bold text-text-primary">{item.plan}</span>
                </div>
                <span className="text-s-16 text-text-secondary">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-s-100 px-s-40">
        <div className="max-w-s-900 mx-auto">
          <h2 className="text-s-40 font-bold mb-s-64 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-s-16">
            {FAQ.map((item, idx) => (
              <div
                key={idx}
                className="card hover:border-text-muted/50 transition-all cursor-pointer overflow-hidden"
                onClick={() => setExpandedFAQ(expandedFAQ === idx ? null : idx)}
              >
                <div className="p-s-32 flex items-center justify-between">
                  <h3 className="text-s-16 font-bold text-text-primary pr-s-24">{item.question}</h3>
                  <ChevronDown
                    className={`w-s-20 h-s-20 text-text-muted flex-shrink-0 transition-transform ${
                      expandedFAQ === idx ? 'rotate-180' : ''
                    }`}
                  />
                </div>
                {expandedFAQ === idx && (
                  <div className="px-s-32 pb-s-32 text-s-14 text-text-secondary leading-relaxed border-t border-border pt-s-24">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-s-100 px-s-40">
        <div className="max-w-s-700 mx-auto">
          <div className="card p-s-64">
            <h2 className="text-s-32 font-bold mb-s-8 text-center">Still need help?</h2>
            <p className="text-s-14 text-text-secondary text-center mb-s-48">
              Fill out the form below and our team will get back to you shortly.
            </p>

            <form className="space-y-s-24">
              <div>
                <label className="block text-s-14 font-bold text-text-primary mb-s-8">Full Name</label>
                <input
                  type="text"
                  className="w-full px-s-16 py-s-12 bg-bg-card border border-border rounded-s-8 text-text-primary placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-s-14 font-bold text-text-primary mb-s-8">Email</label>
                <input
                  type="email"
                  className="w-full px-s-16 py-s-12 bg-bg-card border border-border rounded-s-8 text-text-primary placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-s-14 font-bold text-text-primary mb-s-8">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-s-16 py-s-12 bg-bg-card border border-border rounded-s-8 text-text-primary placeholder-text-muted focus:outline-none focus:border-accent transition-colors resize-none"
                  placeholder="Tell us how we can help..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-s-24 py-s-16 bg-accent text-white rounded-s-8 font-bold text-s-14 transition-all hover:scale-105 hover:shadow-accent-glow flex items-center justify-center gap-s-8"
              >
                <Send className="w-s-16 h-s-16" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
