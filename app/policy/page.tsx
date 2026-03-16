"use client";

import React, { useState } from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const POLICIES = [
  {
    id: 'privacy',
    title: 'Privacy Policy',
    lastUpdated: 'March 1, 2026',
    content: `
      <h3>Privacy Policy</h3>
      <p>Last updated: March 1, 2026</p>
      
      <h4>1. Information We Collect</h4>
      <p>We collect information you provide directly to us, such as:</p>
      <ul>
        <li>Account registration information (name, email, company)</li>
        <li>Billing and payment information</li>
        <li>Email content and metadata (to deliver and monitor emails)</li>
        <li>Communication preferences and support tickets</li>
      </ul>
      
      <h4>2. How We Use Your Information</h4>
      <ul>
        <li>Provide and improve our services</li>
        <li>Process payments and send billing information</li>
        <li>Communicate with you about your account</li>
        <li>Analyze usage patterns to improve our platform</li>
        <li>Detect and prevent fraud</li>
      </ul>
      
      <h4>3. Data Security</h4>
      <p>We implement industry-standard security measures including:</p>
      <ul>
        <li>AES-256 encryption for data at rest</li>
        <li>TLS 1.3 encryption for data in transit</li>
        <li>Regular security audits and penetration testing</li>
        <li>SOC 2 Type II compliance</li>
      </ul>
      
      <h4>4. Data Retention</h4>
      <p>We retain your data for as long as your account is active or as necessary to provide services. You can request deletion of your data at any time.</p>
      
      <h4>5. Your Rights</h4>
      <ul>
        <li>Access your personal data</li>
        <li>Correct inaccurate data</li>
        <li>Request deletion of your data</li>
        <li>Opt-out of marketing communications</li>
        <li>Export your data in a portable format</li>
      </ul>
      
      <h4>6. Contact Us</h4>
      <p>For privacy concerns, email: privacy@mailflow.com</p>
    `
  },
  {
    id: 'terms',
    title: 'Terms of Service',
    lastUpdated: 'March 1, 2026',
    content: `
      <h3>Terms of Service</h3>
      <p>Last updated: March 1, 2026</p>
      
      <h4>1. Acceptance of Terms</h4>
      <p>By using MailFlow, you agree to comply with these terms. If you don't agree, you may not use our service.</p>
      
      <h4>2. Use License</h4>
      <p>We grant you a limited, non-exclusive, non-transferable license to use MailFlow for legitimate business purposes.</p>
      
      <h4>3. User Responsibilities</h4>
      <ul>
        <li>You are responsible for maintaining account security</li>
        <li>You agree not to send spam or malicious emails</li>
        <li>You will comply with all applicable laws</li>
        <li>You won't reverse engineer or attempt to access our infrastructure</li>
      </ul>
      
      <h4>4. Email Content Restrictions</h4>
      <p>You may not use MailFlow to send:</p>
      <ul>
        <li>Spam or unsolicited bulk emails</li>
        <li>Phishing or malicious content</li>
        <li>Content violating copyright or intellectual property rights</li>
        <li>Illegal or fraudulent content</li>
      </ul>
      
      <h4>5. Limitation of Liability</h4>
      <p>MailFlow provides the service "as is". We are not liable for indirect, incidental, or consequential damages.</p>
      
      <h4>6. Service Modifications</h4>
      <p>We reserve the right to modify or discontinue the service with notice. We will not be liable for modifications.</p>
      
      <h4>7. Termination</h4>
      <p>We may terminate accounts that violate these terms or engage in illegal activity.</p>
    `
  },
  {
    id: 'cookies',
    title: 'Cookie Policy',
    lastUpdated: 'March 1, 2026',
    content: `
      <h3>Cookie Policy</h3>
      <p>Last updated: March 1, 2026</p>
      
      <h4>1. What Are Cookies?</h4>
      <p>Cookies are small text files stored on your device when you visit our website. They help us remember your preferences and improve your experience.</p>
      
      <h4>2. Types of Cookies We Use</h4>
      <ul>
        <li><strong>Essential Cookies:</strong> Required for website functionality</li>
        <li><strong>Performance Cookies:</strong> Help us understand how you use our site</li>
        <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
        <li><strong>Marketing Cookies:</strong> Track your activity for advertising purposes</li>
      </ul>
      
      <h4>3. Third-Party Cookies</h4>
      <p>We use analytics providers like Google Analytics and Mixpanel. These services set their own cookies to track website usage.</p>
      
      <h4>4. Your Cookie Choices</h4>
      <p>Most browsers allow you to control cookies. You can:</p>
      <ul>
        <li>Block all cookies</li>
        <li>Accept only certain cookies</li>
        <li>Delete cookies when you close your browser</li>
      </ul>
      
      <h4>5. Opt-Out Options</h4>
      <p>You can opt out of marketing cookies while still using the site. Essential cookies cannot be disabled.</p>
    `
  },
  {
    id: 'acceptable-use',
    title: 'Acceptable Use Policy',
    lastUpdated: 'March 1, 2026',
    content: `
      <h3>Acceptable Use Policy</h3>
      <p>Last updated: March 1, 2026</p>
      
      <h4>1. Prohibited Activities</h4>
      <p>You may not use MailFlow for:</p>
      <ul>
        <li>Sending spam or unsolicited emails</li>
        <li>Sending emails without proper consent</li>
        <li>Phishing or social engineering attacks</li>
        <li>Sending malware or harmful content</li>
        <li>Testing security vulnerabilities</li>
        <li>Interfering with service availability</li>
      </ul>
      
      <h4>2. Rate Limits</h4>
      <p>Respect our rate limits based on your plan. Excessive usage may result in account suspension.</p>
      
      <h4>3. API Usage</h4>
      <ul>
        <li>Use the API only for legitimate business purposes</li>
        <li>Don't attempt to bypass security measures</li>
        <li>Don't scrape or extract data without permission</li>
        <li>Don't use the API to build competing services</li>
      </ul>
      
      <h4>4. Compliance with Laws</h4>
      <p>Comply with all applicable laws including GDPR, CAN-SPAM, and CASL regulations.</p>
      
      <h4>5. Enforcement</h4>
      <p>Violations may result in:</p>
      <ul>
        <li>Account suspension</li>
        <li>Permanent termination</li>
        <li>Legal action if necessary</li>
      </ul>
    `
  },
];

export default function PolicyPage() {
  const [expandedPolicy, setExpandedPolicy] = useState('privacy');

  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-bg-base text-text-primary">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-s-120 pb-s-80 px-s-40">
        <div className="max-w-s-1000 mx-auto text-center">
          <h1 className="text-s-64 font-extrabold mb-s-32 leading-tight">
            Legal & <span className="gradient-text">Policy Documents</span>
          </h1>
          <p className="text-s-18 text-text-secondary max-w-s-700 mx-auto leading-relaxed">
            Transparency is important to us. Read our policies to understand how we protect your data and operate our service.
          </p>
        </div>
      </section>

      {/* Policies */}
      <section className="py-s-100 px-s-40">
        <div className="max-w-s-1000 mx-auto">
          <div className="space-y-s-16">
            {POLICIES.map((policy) => (
              <div
                key={policy.id}
                className="card hover:border-text-muted/50 transition-all cursor-pointer overflow-hidden"
                onClick={() => setExpandedPolicy(expandedPolicy === policy.id ? '' : policy.id)}
              >
                <div className="p-s-32 flex items-center justify-between">
                  <div>
                    <h3 className="text-s-20 font-bold text-text-primary mb-s-4">{policy.title}</h3>
                    <p className="text-s-12 text-text-muted">Last updated: {policy.lastUpdated}</p>
                  </div>
                  <ChevronDown
                    className={`w-s-24 h-s-24 text-text-muted flex-shrink-0 transition-transform ${
                      expandedPolicy === policy.id ? 'rotate-180' : ''
                    }`}
                  />
                </div>

                {expandedPolicy === policy.id && (
                  <div className="px-s-32 pb-s-32 text-s-14 text-text-secondary leading-relaxed border-t border-border pt-s-24">
                    <div
                      className="space-y-s-16"
                      dangerouslySetInnerHTML={{ __html: convertHtmlToStyledHtml(policy.content) }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-s-100 px-s-40 bg-bg-card/30">
        <div className="max-w-s-1000 mx-auto">
          <h2 className="text-s-40 font-bold mb-s-64 text-center">Legal Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-s-32">
            <div className="card p-s-32">
              <h3 className="text-s-20 font-bold mb-s-16">Contact Our Legal Team</h3>
              <p className="text-s-14 text-text-secondary mb-s-24">
                Have questions about our policies? Get in touch with our legal team.
              </p>
              <a href="mailto:legal@mailflow.com" className="text-accent text-s-14 font-bold hover:underline flex items-center gap-s-8">
                legal@mailflow.com <ExternalLink className="w-s-12 h-s-12" />
              </a>
            </div>

            <div className="card p-s-32">
              <h3 className="text-s-20 font-bold mb-s-16">Compliance & Certifications</h3>
              <p className="text-s-14 text-text-secondary mb-s-24">
                We maintain industry-leading compliance standards for your protection.
              </p>
              <ul className="space-y-s-8 text-s-13 text-text-secondary">
                <li>✓ SOC 2 Type II Certified</li>
                <li>✓ GDPR Compliant</li>
                <li>✓ CCPA Compliant</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function convertHtmlToStyledHtml(html: string): string {
  return html
    .replace(/<h3>(.*?)<\/h3>/g, '<h2 class="text-s-24 font-bold text-text-primary mt-s-32 mb-s-16">$1</h2>')
    .replace(/<h4>(.*?)<\/h4>/g, '<h3 class="text-s-16 font-bold text-text-primary mt-s-24 mb-s-12">$1</h3>')
    .replace(/<p>(.*?)<\/p>/g, '<p class="text-s-13 text-text-secondary mb-s-12 leading-relaxed">$1</p>')
    .replace(/<ul>(.*?)<\/ul>/g, '<ul class="list-disc list-inside space-y-s-8 mb-s-16 ml-s-16">$1</ul>')
    .replace(/<li>(.*?)<\/li>/g, '<li class="text-s-13 text-text-secondary">$1</li>')
    .replace(/<strong>(.*?)<\/strong>/g, '<strong class="font-bold text-text-primary">$1</strong>');
}
