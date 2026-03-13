"use client";

import React from 'react';
import { BookOpen, Code2, FileText, Video, Github, ExternalLink } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const RESOURCES = [
  {
    category: 'Documentation',
    icon: <BookOpen className="w-s-20 h-s-20" />,
    color: 'bg-accent/10 text-accent',
    items: [
      { title: 'Getting Started', desc: 'Set up your first SMTP connection in minutes', url: '#' },
      { title: 'API Reference', desc: 'Complete REST API documentation with examples', url: '#' },
      { title: 'Webhooks', desc: 'Learn how to handle delivery events', url: '#' },
      { title: 'Authentication', desc: 'Secure your API keys and tokens', url: '#' },
    ],
  },
  {
    category: 'Code Examples',
    icon: <Code2 className="w-s-20 h-s-20" />,
    color: 'bg-success/10 text-success',
    items: [
      { title: 'Node.js SDK', desc: 'Send emails using our JavaScript SDK', url: '#' },
      { title: 'Python SDK', desc: 'Python library for seamless integration', url: '#' },
      { title: 'cURL Examples', desc: 'Quick REST API examples using cURL', url: '#' },
      { title: 'Postman Collection', desc: 'Pre-built requests for testing', url: '#' },
    ],
  },
  {
    category: 'Guides & Tutorials',
    icon: <FileText className="w-s-20 h-s-20" />,
    color: 'bg-info/10 text-info',
    items: [
      { title: 'Email Templates', desc: 'Create and manage email templates', url: '#' },
      { title: 'Delivery Best Practices', desc: 'Improve email deliverability', url: '#' },
      { title: 'Migration Guide', desc: 'Move from other email services', url: '#' },
      { title: 'Rate Limiting', desc: 'Understand and optimize rate limits', url: '#' },
    ],
  },
  {
    category: 'Video Tutorials',
    icon: <Video className="w-s-20 h-s-20" />,
    color: 'bg-warning/10 text-warning',
    items: [
      { title: 'Dashboard Tour', desc: '5-min overview of the platform', url: '#' },
      { title: 'API Integration', desc: 'Step-by-step API setup walkthrough', url: '#' },
      { title: 'Webhooks Guide', desc: 'Master event-driven architecture', url: '#' },
      { title: 'Troubleshooting', desc: 'Common issues and solutions', url: '#' },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-s-120 pb-s-80 px-s-40">
        <div className="max-w-s-1000 mx-auto text-center">
          <h1 className="text-s-64 font-extrabold mb-s-32 leading-tight">
            Resources & <span className="gradient-text">Documentation</span>
          </h1>
          <p className="text-s-18 text-text-secondary max-w-s-700 mx-auto leading-relaxed">
            Everything you need to integrate and master MailFlow. From API docs to video tutorials, we've got you covered.
          </p>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-s-100 px-s-40">
        <div className="max-w-s-1400 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-s-40">
            {RESOURCES.map((resource) => (
              <div key={resource.category} className="space-y-s-24">
                {/* Category Header */}
                <div className="flex items-center gap-s-16 mb-s-32">
                  <div className={`${resource.color} w-s-56 h-s-56 rounded-s-12 flex items-center justify-center flex-shrink-0`}>
                    {resource.icon}
                  </div>
                  <h2 className="text-s-28 font-bold text-text-primary">{resource.category}</h2>
                </div>

                {/* Items */}
                <div className="space-y-s-16">
                  {resource.items.map((item, idx) => (
                    <a
                      key={idx}
                      href={item.url}
                      className="card p-s-24 group hover:border-text-muted/50 transition-all flex items-start justify-between"
                    >
                      <div>
                        <h3 className="text-s-16 font-bold text-text-primary mb-s-4 group-hover:text-accent transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-s-13 text-text-secondary">{item.desc}</p>
                      </div>
                      <ExternalLink className="w-s-16 h-s-16 text-text-muted group-hover:text-accent flex-shrink-0 mt-s-4 transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-s-100 px-s-40 bg-bg-card/30">
        <div className="max-w-s-1200 mx-auto">
          <h2 className="text-s-40 font-bold mb-s-64 text-center">Additional Resources</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-s-24">
            <div className="card p-s-40 text-center hover:border-text-muted/50 transition-all">
              <Github className="w-s-32 h-s-32 text-accent mx-auto mb-s-24" />
              <h3 className="text-s-18 font-bold mb-s-12">GitHub Repository</h3>
              <p className="text-s-14 text-text-secondary mb-s-24">
                Check out our open-source SDKs and examples
              </p>
              <a href="#" className="text-accent text-s-14 font-bold hover:underline">
                Visit GitHub →
              </a>
            </div>

            <div className="card p-s-40 text-center hover:border-text-muted/50 transition-all">
              <BookOpen className="w-s-32 h-s-32 text-success mx-auto mb-s-24" />
              <h3 className="text-s-18 font-bold mb-s-12">Community Forum</h3>
              <p className="text-s-14 text-text-secondary mb-s-24">
                Connect with other developers and share tips
              </p>
              <a href="#" className="text-success text-s-14 font-bold hover:underline">
                Join Community →
              </a>
            </div>

            <div className="card p-s-40 text-center hover:border-text-muted/50 transition-all">
              <FileText className="w-s-32 h-s-32 text-info mx-auto mb-s-24" />
              <h3 className="text-s-18 font-bold mb-s-12">Blog</h3>
              <p className="text-s-14 text-text-secondary mb-s-24">
                Latest updates and best practices
              </p>
              <a href="#" className="text-info text-s-14 font-bold hover:underline">
                Read Blog →
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
