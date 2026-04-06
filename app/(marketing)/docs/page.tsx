"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Code2,
  Play,
  Zap,
  Shield,
  Settings,
  AlertCircle,
  ChevronRight,
  Copy,
  Check,
} from "lucide-react";

const DOCS_SECTIONS = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: <Play className="w-s-20 h-s-20" />,
    content: `
      <h3>Welcome to Sendio Documentation</h3>
      <p>Sendio is a powerful email delivery platform that lets you send transactional emails through your own SMTP servers with complete control and transparency.</p>
      
      <h4>Quick Start (5 minutes)</h4>
      <ol>
        <li>Create a free account at sendio.in</li>
        <li>Add your SMTP configuration in the Dashboard</li>
        <li>Generate an API key from Settings</li>
        <li>Send your first email using our REST API</li>
      </ol>
      
      <h4>What You'll Need</h4>
      <ul>
        <li>SMTP server credentials (AWS SES, Postmark, custom SMTP)</li>
        <li>Basic understanding of REST APIs</li>
        <li>An API client (cURL, Postman, or SDK)</li>
      </ul>
    `,
  },
  {
    id: "installation",
    title: "Installation",
    icon: <Settings className="w-s-20 h-s-20" />,
    content: `
      <h3>Installation & Setup</h3>
      
      <h4>Node.js SDK</h4>
      <pre>npm install @sendio/sdk</pre>
      
      <h4>Python SDK</h4>
      <pre>pip install sendio</pre>
      
      <h4>cURL Setup</h4>
      <p>No installation needed! You can use cURL directly with Sendio API endpoints.</p>
      
      <h4>Configuration</h4>
      <pre>
const Sendio = require('@sendio/sdk');

const client = new Sendio({
  apiKey: 'your_api_key_here',
  apiBaseUrl: 'https://api.sendio.com/v1'
});
      </pre>
    `,
  },
  {
    id: "api-reference",
    title: "API Reference",
    icon: <Code2 className="w-s-20 h-s-20" />,
    content: `
      <h3>REST API Reference</h3>
      
      <h4>Authentication</h4>
      <p>All API requests require an API key in the Authorization header:</p>
      <pre>Authorization: Bearer YOUR_API_KEY</pre>
      
      <h4>Send Email Endpoint</h4>
      <p><strong>POST</strong> /emails/send</p>
      
      <h4>Request Body</h4>
      <pre>
{
  "to": "recipient@example.com",
  "from": "sender@example.com",
  "subject": "Welcome to Sendio",
  "html": "&lt;h1&gt;Hello!&lt;/h1&gt;",
  "text": "Hello!",
  "metadata": {
    "user_id": "12345"
  }
}
      </pre>
      
      <h4>Response</h4>
      <pre>
{
  "id": "email_123abc",
  "status": "queued",
  "timestamp": "2026-03-11T10:30:00Z"
}
      </pre>
    `,
  },
  {
    id: "webhooks",
    title: "Webhooks",
    icon: <Zap className="w-s-20 h-s-20" />,
    content: `
      <h3>Webhook Events</h3>
      
      <h4>Supported Events</h4>
      <ul>
        <li><strong>email.delivered</strong> - Email successfully delivered</li>
        <li><strong>email.bounced</strong> - Email bounced</li>
        <li><strong>email.complained</strong> - User marked as spam</li>
        <li><strong>email.opened</strong> - Email opened by recipient</li>
        <li><strong>email.clicked</strong> - Link clicked in email</li>
      </ul>
      
      <h4>Webhook Payload</h4>
      <pre>
{
  "event": "email.delivered",
  "email_id": "email_123abc",
  "timestamp": "2026-03-11T10:35:00Z",
  "recipient": "user@example.com",
  "metadata": {
    "user_id": "12345"
  }
}
      </pre>
    `,
  },
  {
    id: "security",
    title: "Security",
    icon: <Shield className="w-s-20 h-s-20" />,
    content: `
      <h3>Security Best Practices</h3>
      
      <h4>API Key Management</h4>
      <ul>
        <li>Never commit API keys to version control</li>
        <li>Use environment variables for sensitive data</li>
        <li>Rotate API keys regularly</li>
        <li>Use different keys for development and production</li>
      </ul>
      
      <h4>Encryption</h4>
      <p>All data in transit is encrypted using TLS 1.3. SMTP credentials are encrypted using AES-256-GCM encryption at rest.</p>
      
      <h4>Rate Limiting</h4>
      <ul>
        <li>Free Plan: 200 requests/month</li>
        <li>Personal: 2,000 requests/month</li>
        <li>Professional: 5,000-10,000 requests/month</li>
        <li>Business: 25,000-200,000 requests/month</li>
      </ul>
    `,
  },
  {
    id: "examples",
    title: "Code Examples",
    icon: <Code2 className="w-s-20 h-s-20" />,
    content: `
      <h3>Code Examples</h3>
      
      <h4>Node.js Example</h4>
      <pre>
const client = new Sendio({ apiKey: 'YOUR_KEY' });

await client.emails.send({
  to: 'user@example.com',
  from: 'hello@example.com',
  subject: 'Hello!',
  html: '&lt;p&gt;Welcome!&lt;/p&gt;'
});
      </pre>
      
      <h4>Python Example</h4>
      <pre>
from sendio import Client

client = Client(api_key='YOUR_KEY')
client.emails.send(
    to='user@example.com',
    from_email='hello@example.com',
    subject='Hello!',
    html='&lt;p&gt;Welcome!&lt;/p&gt;'
)
      </pre>
      
      <h4>cURL Example</h4>
      <pre>
curl -X POST https://api.sendio.in/v1/emails/send \\
  -H "Authorization: Bearer YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "user@example.com",
    "from": "hello@example.com",
    "subject": "Hello!",
    "html": "&lt;p&gt;Welcome!&lt;/p&gt;"
  }'
      </pre>
    `,
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    icon: <AlertCircle className="w-s-20 h-s-20" />,
    content: `
      <h3>Troubleshooting Guide</h3>
      
      <h4>Common Issues</h4>
      
      <h5>401 Unauthorized</h5>
      <p>Check that your API key is correct and included in the Authorization header.</p>
      
      <h5>422 Validation Error</h5>
      <p>Ensure all required fields are provided and in the correct format. Check email addresses are valid.</p>
      
      <h5>429 Too Many Requests</h5>
      <p>You've hit rate limits. Wait before sending more requests or upgrade your plan.</p>
      
      <h5>Emails Not Delivering</h5>
      <ul>
        <li>Check SMTP credentials are correct</li>
        <li>Verify sender domain is authenticated</li>
        <li>Check recipient email address is valid</li>
        <li>Review email content for spam triggers</li>
      </ul>
      
      <h4>Getting Help</h4>
      <p>Can't find an answer? Contact our support team at support@sendio.in or use the live chat in the dashboard.</p>
    `,
  },
];

export default function DocsPage() {
  const [selectedSection, setSelectedSection] = useState("getting-started");
  const selectedContent = DOCS_SECTIONS.find((s) => s.id === selectedSection);
  const currentIndex = DOCS_SECTIONS.findIndex((s) => s.id === selectedSection);

  return (
    <>
      {/* Simple Header */}
      <section className="border-b border-border/40 px-s-40 py-s-60">
        <div className="max-w-s-1400 mx-auto">
          <div className="flex items-start gap-s-20">
            <div className="text-accent mt-s-4">
              <BookOpen className="w-s-32 h-s-32" />
            </div>
            <div>
              <h1 className="text-s-56 font-black text-text-primary mb-s-12">
                Documentation
              </h1>
              <p className="text-s-18 text-text-secondary max-w-s-600">
                Complete guides and API reference for Sendio integration
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-1 relative">
        {/* Clean Sidebar */}
        <aside className="hidden lg:flex lg:w-s-280 bg-bg-card/30 border-r border-border/40 flex-col sticky top-s-0">
          <div className="p-s-40 border-b border-border/40">
            <h2 className="text-s-13 font-bold text-text-muted uppercase tracking-widest">
              Sections
            </h2>
          </div>

          <nav className="flex-1 overflow-y-auto p-s-24">
            <div className="space-y-s-8">
              {DOCS_SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setSelectedSection(section.id)}
                  className={`w-full text-left px-s-16 py-s-14 rounded-s-10 transition-all duration-200 flex items-center gap-s-14 text-s-14 ${
                    selectedSection === section.id
                      ? "bg-accent/20 text-accent font-semibold border border-accent/40"
                      : "text-text-secondary hover:text-text-primary hover:bg-bg-elevated/60"
                  }`}
                >
                  <div className="flex-shrink-0 text-s-18">{section.icon}</div>
                  <span className="flex-1">{section.title}</span>
                </button>
              ))}
            </div>
          </nav>

          {/* Sidebar Footer Links */}
          <div className="p-s-24 border-t border-border/40 space-y-s-12">
            <a
              href="https://api.sendio.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-s-10 text-s-13 text-accent hover:text-accent/80 transition-colors no-underline py-s-8"
            >
              <span>API Playground</span>
              <span className="text-s-10">↗</span>
            </a>
            <a
              href="mailto:support@sendio.in"
              className="flex items-center gap-s-10 text-s-13 text-accent hover:text-accent/80 transition-colors no-underline py-s-8"
            >
              <span>Get Support</span>
              <span className="text-s-10">↗</span>
            </a>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-s-40 py-s-80 lg:py-s-100">
          <div className="max-w-s-1100 mx-auto">
            {selectedContent && (
              <>
                {/* Breadcrumb */}
                <div className="flex items-center gap-s-12 text-s-13 text-text-muted mb-s-40">
                  <span>Documentation</span>
                  <span className="text-text-muted/50">→</span>
                  <span className="text-accent font-semibold">
                    {selectedContent.title}
                  </span>
                </div>

                {/* Content Header */}
                <div className="mb-s-60">
                  <div className="flex items-start gap-s-24 mb-s-32">
                    <div className="w-s-64 h-s-64 bg-accent/15 rounded-s-14 flex items-center justify-center text-accent flex-shrink-0">
                      {selectedContent.icon}
                    </div>
                    <div className="flex-1">
                      <h1 className="text-s-56 font-black text-text-primary mb-s-12 leading-tight">
                        {selectedContent.title}
                      </h1>
                      <p className="text-s-16 text-text-secondary">
                        Learn everything you need to know about{" "}
                        {selectedContent.title.toLowerCase()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="prose prose-invert max-w-none mb-s-80">
                  <div
                    className="text-text-secondary"
                    dangerouslySetInnerHTML={{
                      __html: convertMarkdownToHtml(selectedContent.content),
                    }}
                  />
                </div>

                {/* Navigation Buttons */}
                <div className="border-t border-border/40 pt-s-60">
                  <div className="flex items-center justify-between gap-s-24">
                    {currentIndex > 0 ? (
                      <button
                        onClick={() =>
                          setSelectedSection(DOCS_SECTIONS[currentIndex - 1].id)
                        }
                        className="flex-1 px-s-32 py-s-18 border border-border rounded-s-12 text-text-secondary hover:text-text-primary hover:border-accent/40 transition-all flex items-center justify-center gap-s-8 text-s-14 font-semibold group"
                      >
                        <span className="text-s-16 group-hover:translate-x-[-4px] transition-transform">
                          ←
                        </span>
                        <span>{DOCS_SECTIONS[currentIndex - 1].title}</span>
                      </button>
                    ) : (
                      <div />
                    )}

                    {currentIndex < DOCS_SECTIONS.length - 1 ? (
                      <button
                        onClick={() =>
                          setSelectedSection(DOCS_SECTIONS[currentIndex + 1].id)
                        }
                        className="flex-1 px-s-32 py-s-18 bg-accent/20 border border-accent/40 text-accent hover:bg-accent/30 transition-all rounded-s-12 flex items-center justify-center gap-s-8 text-s-14 font-semibold group"
                      >
                        <span>{DOCS_SECTIONS[currentIndex + 1].title}</span>
                        <span className="text-s-16 group-hover:translate-x-[4px] transition-transform">
                          →
                        </span>
                      </button>
                    ) : (
                      <div />
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

function convertMarkdownToHtml(content: string): string {
  return content
    .replace(
      /<h3>(.*?)<\/h3>/g,
      '<h2 class="text-s-32 font-bold text-text-primary mt-s-48 mb-s-20">$1</h2>',
    )
    .replace(
      /<h4>(.*?)<\/h4>/g,
      '<h3 class="text-s-20 font-bold text-text-primary mt-s-32 mb-s-16">$1</h3>',
    )
    .replace(
      /<h5>(.*?)<\/h5>/g,
      '<h4 class="text-s-16 font-bold text-accent mt-s-24 mb-s-12">$1</h4>',
    )
    .replace(
      /<p>(.*?)<\/p>/g,
      '<p class="text-s-15 text-text-secondary mb-s-20 leading-relaxed">$1</p>',
    )
    .replace(
      /<pre>(.*?)<\/pre>/g,
      '<pre class="bg-bg-card/80 border-2 border-accent/60 rounded-s-16 p-s-28 overflow-x-auto mb-s-28 text-s-13 font-mono text-info/95 leading-relaxed relative group hover:border-accent/80 transition-all"><code>$1</code></pre>',
    )
    .replace(
      /<ol>(.*?)<\/ol>/g,
      '<ol class="list-decimal list-inside space-y-s-12 mb-s-24 text-s-15 text-text-secondary pl-s-8">$1</ol>',
    )
    .replace(
      /<ul>(.*?)<\/ul>/g,
      '<ul class="list-disc list-inside space-y-s-12 mb-s-24 text-s-15 text-text-secondary pl-s-8">$1</ul>',
    )
    .replace(/<li>(.*?)<\/li>/g, '<li class="text-text-secondary">$1</li>')
    .replace(
      /<strong>(.*?)<\/strong>/g,
      '<strong class="font-semibold text-text-primary">$1</strong>',
    )
    .replace(/<em>(.*?)<\/em>/g, '<em class="italic text-accent/80">$1</em>');
}
