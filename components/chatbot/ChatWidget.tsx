"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MessageCircle, 
  X, 
  ChevronRight, 
  RotateCcw, 
  Zap,
  ExternalLink
} from "lucide-react";
import Link from "next/link";

type Option = {
  label: string;
  nextState: string;
  action?: () => void;
  link?: string;
};

type State = {
  message: string;
  options: Option[];
};

const CONVERSATION_TREE: Record<string, State> = {
  start: {
    message: "Welcome to Sendio Support. I'm here to help you optimize your transactional email infrastructure. \n\nWhat aspect of the platform can I assist you with?",
    options: [
      { label: "SMTP Configuration", nextState: "setup_smtp" },
      { label: "Infrastructure Scaling", nextState: "pricing" },
      { label: "Technical Support", nextState: "troubleshoot" },
      { label: "Developer Docs", nextState: "start", link: "/docs" },
    ],
  },
  setup_smtp: {
    message: "Sendio acts as a high-performance abstraction layer for your SMTP providers. \n\n1. Navigate to **Services** to connect AWS SES, SendGrid, or custom relays.\n2. In **Senders**, configure your identities to match your provider's authenticated domains.",
    options: [
      { label: "DNS Requirements", nextState: "verify_domain" },
      { label: "Supported Providers", nextState: "providers" },
    ],
  },
  providers: {
    message: "We provide native integrations for the industry's most reliable relays: \n\n• AWS SES (Recommended for scale)\n• SendGrid & Mailgun\n• Postmark (Best for deliverability)\n• Any Custom SMTP/Port 587 relay.",
    options: [
      { label: "Setup Guide", nextState: "setup_smtp" },
    ],
  },
  verify_domain: {
    message: "To achieve 99%+ deliverability, ensure your DNS includes: \n\n• **SPF**: `v=spf1 include:sendio.in ~all` \n• **DKIM**: 2048-bit RSA keys (provided in Senders tab) \n• **DMARC**: Policy set to `quarantine` or `reject`.",
    options: [
      { label: "Open DNS Guide", nextState: "start", link: "/docs/dns" },
    ],
  },
  pricing: {
    message: "Our infrastructure is built to handle millions of requests. \n\n• **Pro**: Dedicated support & 50k+ monthly volume.\n• **Enterprise**: Custom rate limits, dedicated IPs, and White-labeling options.",
    options: [
      { label: "Volume Pricing", nextState: "start", link: "/dashboard/upgrade" },
    ],
  },
  troubleshoot: {
    message: "Common technical hurdles: \n\n1. **Auth Errors**: Verify your API credentials in the 'Services' tab.\n2. **Propagation**: DNS changes can take up to 24 hours to reflect.\n3. **Rate Limits**: Check your relay provider's daily quota.",
    options: [
      { label: "System Status", nextState: "start", link: "/status" },
    ],
  },
};

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentState, setCurrentState] = useState("start");
  const [history, setHistory] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: Option) => {
    if (option.action) option.action();
    if (!option.link) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setCurrentState(option.nextState);
      }, 600);
    }
  };

  const handleReset = () => {
    setCurrentState("start");
    setHistory([]);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [currentState, history]);

  return (
    <div className="fixed bottom-s-32 right-s-32 z-50 flex flex-col items-end gap-s-16">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-s-380 max-w-[calc(100vw-s-64)] bg-bg-elevated border border-border rounded-s-24 shadow-2xl overflow-hidden flex flex-col"
            style={{ height: "calc(var(--1) * 540)" }}
          >
            {/* Header */}
            <div className="p-s-20 bg-gradient-to-r from-accent/20 to-transparent border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-s-12">
                <div className="w-s-36 h-s-36 bg-accent rounded-full flex items-center justify-center shadow-accent-glow">
                  <Zap className="w-s-18 h-s-18 text-white" />
                </div>
                <div>
                  <h3 className="text-s-16 font-bold text-text-primary">Sendio Assistant</h3>
                  <div className="flex items-center gap-s-4">
                    <span className="w-s-8 h-s-8 bg-success rounded-full animate-pulse" />
                    <span className="text-s-12 text-text-secondary">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-s-8">
                <button 
                  onClick={handleReset}
                  className="p-s-8 text-text-secondary hover:text-accent transition-colors rounded-full hover:bg-accent/10"
                  title="Restart Conversation"
                >
                  <RotateCcw className="w-s-18 h-s-18" />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-s-8 text-text-secondary hover:text-error transition-colors rounded-full hover:bg-error/10"
                >
                  <X className="w-s-18 h-s-18" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-s-20 pb-s-32 space-y-s-20 scroll-smooth">
              <AnimatePresence mode="wait">
                {isTyping ? (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-bg-card p-s-16 rounded-s-16 rounded-tl-none border border-border w-s-80 flex gap-s-4 items-center justify-center h-s-44"
                  >
                    <span className="w-s-6 h-s-6 bg-accent rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-s-6 h-s-6 bg-accent rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-s-6 h-s-6 bg-accent rounded-full animate-bounce" />
                  </motion.div>
                ) : (
                  <motion.div
                    key={currentState}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-bg-card p-s-16 rounded-s-16 rounded-tl-none border border-border text-s-14 text-text-primary leading-relaxed shadow-md whitespace-pre-line"
                  >
                    {CONVERSATION_TREE[currentState].message.split("**").map((part, i) => 
                      i % 2 === 1 ? <strong key={i} className="text-accent">{part}</strong> : part
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {!isTyping && (
                <div className="flex flex-wrap gap-s-10 pt-s-12 pr-s-12">
                {CONVERSATION_TREE[currentState].options.map((option, idx) => (
                  <motion.div
                    key={`${currentState}-${idx}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="max-w-full"
                  >
                    {option.link ? (
                      <Link
                        href={option.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => option.action?.()}
                        className="flex items-center gap-s-10 px-s-20 py-s-12 bg-accent/15 border border-accent/30 rounded-full text-s-14 font-semibold text-accent hover:bg-accent hover:text-white transition-all no-underline shadow-md hover:shadow-accent-glow"
                      >
                        {option.label}
                        <ExternalLink className="w-s-14 h-s-14" />
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleOptionClick(option)}
                        className="flex items-center gap-s-10 px-s-20 py-s-12 bg-bg-elevated border border-border rounded-full text-s-14 font-medium text-text-primary hover:border-accent hover:text-accent transition-all shadow-md group"
                      >
                        <span className="truncate">{option.label}</span>
                        <ChevronRight className="w-s-14 h-s-14 transition-transform group-hover:translate-x-s-2" />
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-s-16 border-t border-border bg-bg-base/50 text-center">
              <p className="text-s-11 text-text-muted">
                Powered by Sendio Support Engine
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-s-64 h-s-64 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
          isOpen ? "bg-bg-card border border-border text-text-primary" : "bg-accent text-white shadow-accent-glow rotate-0"
        }`}
      >
        {isOpen ? (
          <X className="w-s-28 h-s-28" />
        ) : (
          <MessageCircle className="w-s-28 h-s-28" />
        )}
      </motion.button>
    </div>
  );
}
