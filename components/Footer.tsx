'use client';

import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-s-160 max-w-7xl mx-auto border-t border-border/40">
      {/* Main Footer Content */}
      <div className="py-s-80 px-s-40">
        <div className="max-w-s-1400 mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-s-60 mb-s-80">
            {/* Brand Section */}
            <div>
              <h3 className="text-s-16 font-bold text-text-primary mb-s-20">MailFlow</h3>
              <p className="text-s-13 text-text-secondary leading-relaxed">
                Your SMTP infrastructure with complete control. Built for developers who value privacy and performance.
              </p>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="text-s-14 font-bold text-text-primary mb-s-16 uppercase tracking-wide">Product</h4>
              <ul className="space-y-s-12">
                <li><Link href="/pricing" className="text-s-13 text-text-secondary hover:text-text-primary transition-colors no-underline">Pricing</Link></li>
                <li><Link href="/features" className="text-s-13 text-text-secondary hover:text-text-primary transition-colors no-underline">Features</Link></li>
                <li><Link href="/docs" className="text-s-13 text-text-secondary hover:text-text-primary transition-colors no-underline">Documentation</Link></li>
                <li><Link href="/resources" className="text-s-13 text-text-secondary hover:text-text-primary transition-colors no-underline">Resources</Link></li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-s-14 font-bold text-text-primary mb-s-16 uppercase tracking-wide">Company</h4>
              <ul className="space-y-s-12">
                <li><Link href="/team" className="text-s-13 text-text-secondary hover:text-text-primary transition-colors no-underline">Team</Link></li>
                <li><Link href="/enterprise" className="text-s-13 text-text-secondary hover:text-text-primary transition-colors no-underline">Enterprise</Link></li>
                <li><Link href="/support" className="text-s-13 text-text-secondary hover:text-text-primary transition-colors no-underline">Support</Link></li>
                <li><a href="https://blog.mailflow.io" target="_blank" rel="noopener noreferrer" className="text-s-13 text-text-secondary hover:text-text-primary transition-colors no-underline">Blog</a></li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="text-s-14 font-bold text-text-primary mb-s-16 uppercase tracking-wide">Legal</h4>
              <ul className="space-y-s-12">
                <li><Link href="/policy?tab=privacy" className="text-s-13 text-text-secondary hover:text-text-primary transition-colors no-underline">Privacy Policy</Link></li>
                <li><Link href="/policy?tab=terms" className="text-s-13 text-text-secondary hover:text-text-primary transition-colors no-underline">Terms of Service</Link></li>
                <li><Link href="/policy?tab=cookies" className="text-s-13 text-text-secondary hover:text-text-primary transition-colors no-underline">Cookie Policy</Link></li>
                <li><a href="mailto:legal@mailflow.io" className="text-s-13 text-text-secondary hover:text-text-primary transition-colors no-underline">Contact Legal</a></li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border/40 pt-s-40 flex flex-col sm:flex-row items-center justify-between">
            <p className="text-s-13 text-text-muted">
              &copy; {currentYear} MailFlow. All Rights Reserved.
            </p>
            
            <div className="flex items-center gap-s-24 mt-s-24 sm:mt-0">
              <Link href="/policy?tab=privacy" className="text-s-13 text-text-muted hover:text-text-secondary transition-colors no-underline">
                Privacy Policy
              </Link>
              <span className="text-text-muted">|</span>
              <Link href="/policy?tab=terms" className="text-s-13 text-text-muted hover:text-text-secondary transition-colors no-underline">
                Terms and Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
