"use client";

import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Navbar } from '@/components/Navbar';

const PRICING_PLANS = [
  {
    id: 'free',
    name: 'FREE',
    subtitle: 'For Testing',
    price: 0,
    color: 'text-text-primary',
    variant: 'accent',
    requests: 200,
    features: ['2 email templates', 'Requests up to 50Kb', 'Limited contacts history'],
  },
  {
    id: 'personal',
    name: 'PERSONAL',
    subtitle: 'For Personal Use',
    price: 9,
    color: 'text-success',
    variant: 'success',
    requests: 2000,
    features: ['6 email templates', 'Whitelist', 'Unlimited contacts', 'Attachments up to 500kb', 'Completely white label'],
  },
  {
    id: 'professional',
    name: 'PROFESSIONAL',
    subtitle: 'Entrepreneurs & Freelancers',
    price: 15,
    color: 'text-accent',
    bgColor: 'bg-gradient-to-b from-accent/20 to-accent/5',
    variant: 'accent',
    isActive: true,
    requestRange: [5000, 10000],
    hasSlider: true,
    features: ['Unlimited email templates', 'Whitelist', 'Unlimited contacts', 'Attachments up to 2mb', 'Completely white label', 'Suppressions list', 'Multi-user access', 'Priority support'],
  },
  {
    id: 'business',
    name: 'BUSINESS',
    subtitle: 'Best For Small Business',
    price: 40,
    color: 'text-info',
    bgColor: 'bg-gradient-to-b from-info/20 to-info/5',
    variant: 'info',
    requestRange: [25000, 200000],
    hasSlider: true,
    features: ['Unlimited email templates', 'Whitelist', 'Unlimited contacts', 'Attachments up to 30mb', 'Completely white label', 'Suppressions list', 'Multi-user access', 'Priority support'],
  },
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const [proVolume, setProVolume] = useState(5000);
  const [bizVolume, setBizVolume] = useState(25000);

  const getPrice = (plan: typeof PRICING_PLANS[0]) => {
    if (isYearly) return Math.floor(plan.price * 12 * 0.8);
    return plan.price;
  };

  const getVolume = (planId: string) => {
    if (planId === 'professional') return proVolume;
    if (planId === 'business') return bizVolume;
    return null;
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-bg-base text-text-primary">
      <Navbar />
      <main className="min-h-screen max-w-7xl mx-auto bg-bg-base text-text-primary py-s-80 px-s-40 flex flex-col items-center font-sans">
        {/* Header Section */}
        <div className="max-w-s-900 w-full text-center mb-s-120">
          <h1 className="text-s-64 font-black tracking-tight mb-s-24 leading-tight">
            Simple, Transparent
            <br />
            <span className="bg-gradient-to-r from-accent via-accent to-purple-500 bg-clip-text text-transparent">
              Pricing Plans
            </span>
          </h1>
          <p className="text-s-20 text-text-secondary leading-relaxed font-medium">
            Choose the perfect plan for your email needs. Scale up as you grow.
          </p>
        </div>

        {/* Monthly / Yearly Toggle */}
        <div className="flex items-center gap-s-32 mb-s-120 bg-bg-card border border-border p-s-12 rounded-s-20">
          <span className={`text-s-16 font-bold transition-colors duration-300 ${!isYearly ? 'text-accent' : 'text-text-muted'}`}>
            Monthly
          </span>
          <button 
            onClick={() => setIsYearly(!isYearly)}
            className="group relative w-s-80 h-s-40 bg-bg-elevated rounded-full p-s-4 flex items-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-card"
            aria-label="Toggle billing period"
            aria-pressed={isYearly}
          >
            <div className={`z-10 w-s-32 h-s-32 bg-white rounded-full shadow-lg transform transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) ${isYearly ? 'translate-x-s-40' : 'translate-x-0'}`} />
          </button>
          <div className="flex items-center gap-s-12">
            <span className={`text-s-16 font-bold transition-colors duration-300 ${isYearly ? 'text-success' : 'text-text-muted'}`}>
              Yearly
            </span>
            <div className="bg-success/15 border border-success/40 px-s-16 py-s-6 rounded-full">
              <span className="text-s-12 font-extrabold text-success tracking-s-wide">20% OFF</span>
            </div>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-s-32 max-w-s-1400 w-full mb-s-80 items-stretch">
          {PRICING_PLANS.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              price={getPrice(plan)}
              volume={getVolume(plan.id)}
              onVolumeChange={plan.id === 'professional' ? setProVolume : plan.id === 'business' ? setBizVolume : undefined}
              isYearly={isYearly}
            />
          ))}
        </div>

        {/* FAQ Note */}
        <div className="text-center text-s-14 text-text-secondary max-w-s-600">
          <p>All plans include API access, detailed analytics, and dedicated support. No credit card required to get started.</p>
        </div>
      </main>
    </div>
  );
}

function PricingCard({ plan, price, volume, onVolumeChange, isYearly }: any) {
  const isSliderCard = plan.hasSlider && volume !== null;
  const cardClass = plan.isActive ? 'relative lg:scale-[1.04] z-10 lg:shadow-2xl lg:shadow-accent/30' : '';

  return (
    <div className={`card flex flex-col h-full overflow-hidden transition-all duration-300 hover:border-border/80 ${cardClass}`}>
      {/* Header with gradient background */}
      <div className={`${plan.bgColor || 'bg-bg-elevated'} ${plan.isActive ? 'p-s-40' : 'p-s-32'} text-center relative border-b border-border/50`}>
        {plan.isActive && (
          <div className="absolute inset-0 bg-gradient-to-b from-accent/10 to-transparent pointer-events-none" />
        )}
        <div className="relative z-10">
          <div className="inline-block mb-s-16">
            <span className={`text-s-12 font-black uppercase tracking-widest px-s-16 py-s-6 rounded-full ${
              plan.isActive ? 'bg-accent text-white' : 'bg-border/50 text-text-muted'
            }`}>
              {plan.isActive ? '★ MOST POPULAR' : 'STARTER'}
            </span>
          </div>
          <h3 className={`text-s-24 font-black mb-s-8 tracking-tight ${plan.color}`}>{plan.name}</h3>
          <p className={`text-s-13 font-medium italic ${plan.isActive ? 'text-text-secondary' : 'text-text-muted'}`}>{plan.subtitle}</p>
        </div>
      </div>

      {/* Price Section */}
      <div className={`${plan.bgColor || 'bg-bg-elevated'} px-s-32 py-s-40 text-center border-b border-border/50`}>
        <div className="flex items-baseline justify-center gap-s-6 mb-s-8">
          <span className={`text-s-16 font-bold ${plan.isActive ? 'text-accent' : 'text-text-muted'}`}>$</span>
          <span className="text-s-56 font-black text-text-primary">{price}</span>
          <div className="flex flex-col">
            <span className={`text-s-14 font-bold ${plan.isActive ? 'text-accent' : 'text-text-muted'}`}>/mo</span>
            {isYearly && <span className="text-s-11 text-text-muted">billed yearly</span>}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-s-32 py-s-40 flex-grow flex flex-col">
        {isSliderCard && plan.requestRange && (
          <div className="space-y-s-20 mb-s-32 pb-s-32 border-b border-border/50">
            <div>
              <div className="flex justify-between text-s-10 text-text-muted px-s-2 font-bold uppercase tracking-s-widest mb-s-12">
                <span>{plan.requestRange[0].toLocaleString()}</span>
                <span className="text-accent font-black">{volume?.toLocaleString()}</span>
                <span>{plan.requestRange[1].toLocaleString()}</span>
              </div>
              <input 
                type="range" 
                min={plan.requestRange[0]} 
                max={plan.requestRange[1]} 
                step={plan.requestRange[0] === 5000 ? 100 : 500}
                value={volume} 
                onChange={(e) => onVolumeChange?.(parseInt(e.target.value))}
                className="w-full h-s-4 bg-border rounded-full appearance-none cursor-pointer accent-accent hover:accent-accent/80 transition-all"
                aria-label="Monthly requests"
              />
            </div>
            <p className="text-text-secondary text-s-12 font-bold uppercase tracking-s-widest text-center">monthly requests</p>
          </div>
        )}

        {!isSliderCard && plan.requests && (
          <p className="text-text-primary font-bold text-s-15 text-center mb-s-32 pb-s-32 border-b border-border/50">
            {plan.requests.toLocaleString()}
            <span className="block text-s-12 text-text-muted font-medium mt-s-4">monthly requests</span>
          </p>
        )}

        {/* Features List */}
        <div className="space-y-s-16 flex-grow">
          {plan.features.map((feature: string, idx: number) => (
            <div key={idx} className="flex items-start gap-s-12">
              <CheckCircle2 className="w-s-18 h-s-18 text-accent flex-shrink-0 mt-s-2" />
              <p className="text-text-secondary font-medium text-s-13 leading-relaxed">{feature}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Button */}
      <SignUpButton active={plan.isActive} variant={plan.variant} />
    </div>
  );
}

function SignUpButton({ active = false, variant = 'accent' }: { active?: boolean, variant?: 'accent' | 'success' | 'info' }) {
  const colorMap = {
    accent: { 
      bg: 'bg-accent text-white shadow-lg shadow-accent/40 hover:shadow-xl hover:shadow-accent/50', 
      outline: 'border-2 border-accent text-accent hover:bg-accent/5' 
    },
    success: { 
      bg: 'bg-success text-white shadow-lg shadow-success/40 hover:shadow-xl hover:shadow-success/50', 
      outline: 'border-2 border-success text-success hover:bg-success/5' 
    },
    info: { 
      bg: 'bg-info text-white shadow-lg shadow-info/40 hover:shadow-xl hover:shadow-info/50', 
      outline: 'border-2 border-info text-info hover:bg-info/5' 
    }
  };

  const colors = colorMap[variant];
  
  return (
    <div className="p-s-24 border-t border-border/50">
      <button 
        className={`w-full py-s-14 px-s-20 rounded-s-14 text-s-13 font-bold tracking-wider transition-all duration-200 uppercase hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
          active 
            ? `${colors.bg}` 
            : `${colors.outline} hover:scale-[1.01]`
        }`}
      >
        Get Started
      </button>
    </div>
  );
}
