"use client";

import React from "react";
import { Mail, Linkedin, Github, Twitter } from "lucide-react";

const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Co-Founder & CEO",
    bio: "Former Senior Engineer at SendGrid (2012-2018). Led infrastructure teams at AWS (2018-2021). 15+ years building scalable email systems.",
    image: "👩‍💼",
    social: { linkedin: "#", twitter: "#", email: "sarah@mailflow.com" },
  },
  {
    id: 2,
    name: "Alex Chen",
    role: "Co-Founder & CTO",
    bio: "PhD in Computer Science from MIT. Former Tech Lead at Google Cloud. Expert in distributed systems and API design.",
    image: "👨‍💻",
    social: { linkedin: "#", github: "#", email: "alex@mailflow.com" },
  },
  {
    id: 3,
    name: "Emma Wilson",
    role: "Head of Product",
    bio: "Product Management at Stripe and Twilio. Obsessed with developer experience. 10+ years in B2B SaaS.",
    image: "👩‍🔬",
    social: { linkedin: "#", twitter: "#", email: "emma@mailflow.com" },
  },
  {
    id: 4,
    name: "David Martinez",
    role: "VP of Engineering",
    bio: "Former Engineering Manager at Postmark. Led teams of 30+ engineers. Specialized in infrastructure and reliability.",
    image: "👨‍🏫",
    social: { linkedin: "#", github: "#", email: "david@mailflow.com" },
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "VP of Customer Success",
    bio: "Built customer success from zero to $50M ARR at previous startup. Customer obsessed and metrics-driven.",
    image: "👩‍💼",
    social: { linkedin: "#", email: "lisa@mailflow.com" },
  },
  {
    id: 6,
    name: "James Park",
    role: "VP of Security & Compliance",
    bio: "CISSP certified. 12 years at cybersecurity firms. Led security at $1B+ companies. SOC 2 & GDPR expert.",
    image: "🔐",
    social: { linkedin: "#", github: "#", email: "james@mailflow.com" },
  },
  {
    id: 7,
    name: "Michael Roberts",
    role: "VP of Sales",
    bio: "Enterprise sales background at Salesforce and HubSpot. Built sales teams from 0 to 100+ headcount.",
    image: "📊",
    social: { linkedin: "#", email: "michael@mailflow.com" },
  },
  {
    id: 8,
    name: "Jennifer Lee",
    role: "Director of DevRel & Community",
    bio: "Former Developer Advocate at GitHub and Slack. Community builder with 500K+ developers reached.",
    image: "🎤",
    social: { linkedin: "#", twitter: "#", email: "jennifer@mailflow.com" },
  },
  {
    id: 9,
    name: "Mark Thompson",
    role: "Senior Architect",
    bio: "Database expert with 20+ years experience. Architected systems handling 100K+ RPS.",
    image: "🏗️",
    social: { linkedin: "#", github: "#", email: "mark@mailflow.com" },
  },
];

const COMPANY_VALUES = [
  {
    title: "Developer First",
    description:
      "We build for developers, with developers. Every feature is designed with the developer experience in mind.",
    icon: "💻",
  },
  {
    title: "Security & Privacy",
    description:
      "Your data is sacred. We implement industry-leading security practices and are transparent about how we protect your information.",
    icon: "🔒",
  },
  {
    title: "Transparency",
    description:
      "We believe in open communication. You always know what's happening with your emails and your data.",
    icon: "🤝",
  },
  {
    title: "Reliability",
    description:
      "Email delivery is critical. We maintain 99.99% uptime and redundant infrastructure for your peace of mind.",
    icon: "⚡",
  },
];

export default function TeamPage() {
  return (
    <div className=" max-w-7xl mx-auto bg-bg-base text-text-primary">
      {/* Hero Section */}
      <section className="pt-s-120 pb-s-80 px-s-40">
        <div className="max-w-s-1000 mx-auto text-center">
          <h1 className="text-s-64 font-extrabold mb-s-32 leading-tight">
            Meet the <span className="gradient-text">MailFlow team</span>
          </h1>
          <p className="text-s-18 text-text-secondary max-w-s-700 mx-auto leading-relaxed">
            We're a team of passionate developers and builders dedicated to
            making email delivery simple, secure, and reliable.
          </p>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-s-100 px-s-40 bg-bg-card/30">
        <div className="max-w-s-1200 mx-auto">
          <h2 className="text-s-40 font-bold text-center mb-s-64">
            Our Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-s-32">
            {COMPANY_VALUES.map((value, idx) => (
              <div
                key={idx}
                className="card p-s-40 hover:border-text-muted/50 transition-all"
              >
                <div className="text-s-56 mb-s-24">{value.icon}</div>
                <h3 className="text-s-24 font-bold mb-s-16">{value.title}</h3>
                <p className="text-s-14 text-text-secondary leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-s-100 px-s-40">
        <div className="max-w-s-1400 mx-auto">
          <h2 className="text-s-40 font-bold text-center mb-s-64">
            Leadership Team
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-s-32">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.id}
                className="card p-s-40 hover:border-text-muted/50 transition-all group"
              >
                {/* Avatar */}
                <div className="w-full h-s-180 bg-gradient-to-br from-accent/20 to-success/20 rounded-s-12 flex items-center justify-center mb-s-24 text-s-80 group-hover:scale-105 transition-transform">
                  {member.image}
                </div>

                {/* Info */}
                <h3 className="text-s-20 font-bold mb-s-4">{member.name}</h3>
                <p className="text-s-14 text-accent font-bold mb-s-12">
                  {member.role}
                </p>
                <p className="text-s-13 text-text-secondary leading-relaxed mb-s-24">
                  {member.bio}
                </p>

                {/* Social Links */}
                <div className="flex items-center gap-s-12">
                  {member.social.email && (
                    <a
                      href={`mailto:${member.social.email}`}
                      className="p-s-8 bg-bg-card rounded-s-6 text-text-secondary hover:text-accent transition-colors"
                    >
                      <Mail className="w-s-16 h-s-16" />
                    </a>
                  )}
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      className="p-s-8 bg-bg-card rounded-s-6 text-text-secondary hover:text-accent transition-colors"
                    >
                      <Linkedin className="w-s-16 h-s-16" />
                    </a>
                  )}
                  {member.social.github && (
                    <a
                      href={member.social.github}
                      className="p-s-8 bg-bg-card rounded-s-6 text-text-secondary hover:text-accent transition-colors"
                    >
                      <Github className="w-s-16 h-s-16" />
                    </a>
                  )}
                  {member.social.twitter && (
                    <a
                      href={member.social.twitter}
                      className="p-s-8 bg-bg-card rounded-s-6 text-text-secondary hover:text-accent transition-colors"
                    >
                      <Twitter className="w-s-16 h-s-16" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-s-100 px-s-40 bg-bg-card/30">
        <div className="max-w-s-1000 mx-auto">
          <h2 className="text-s-40 font-bold mb-s-64 text-center">Our Story</h2>

          <div className="space-y-s-24 text-s-16 text-text-secondary leading-relaxed">
            <p>
              MailFlow was founded in 2023 by a group of engineers who were
              frustrated with existing email delivery platforms. They wanted a
              service that gave developers complete control, transparency, and
              the ability to use their own infrastructure.
            </p>
            <p>
              Today, MailFlow powers transactional emails for thousands of
              developers and companies worldwide. We're backed by leading
              venture capital firms and are on a mission to make email delivery
              simple, secure, and developer-friendly.
            </p>
            <p>
              Our team is distributed across multiple continents, with offices
              in San Francisco, Berlin, and Singapore. We're constantly hiring
              talented engineers, product managers, and customer success
              specialists. If you're interested in joining us, check out our
              careers page!
            </p>
          </div>

          {/* Stats */}
          <div className="mt-s-64 grid grid-cols-1 md:grid-cols-3 gap-s-24">
            <div className="card p-s-32 text-center">
              <div className="text-s-48 font-black text-accent mb-s-12">
                50+
              </div>
              <p className="text-s-14 text-text-secondary">Team Members</p>
            </div>
            <div className="card p-s-32 text-center">
              <div className="text-s-48 font-black text-success mb-s-12">
                5K+
              </div>
              <p className="text-s-14 text-text-secondary">Active Customers</p>
            </div>
            <div className="card p-s-32 text-center">
              <div className="text-s-48 font-black text-info mb-s-12">10B+</div>
              <p className="text-s-14 text-text-secondary">Emails Sent</p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us */}
      <section className="py-s-100 px-s-40">
        <div className="max-w-s-900 mx-auto">
          <div className="card glass p-s-64 text-center">
            <h2 className="text-s-48 font-extrabold mb-s-24">Join Our Team</h2>
            <p className="text-s-16 text-text-secondary mb-s-48 leading-relaxed">
              We're hiring talented engineers and product enthusiasts. Help us
              build the future of email delivery.
            </p>
            <a
              href="#"
              className="inline-block px-s-40 py-s-20 bg-accent text-white rounded-s-12 font-bold text-s-16 transition-all hover:scale-105 hover:shadow-accent-glow"
            >
              View Open Positions
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
