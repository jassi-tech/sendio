"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
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
    color: 'text-white',
    bgColor: 'bg-accent',
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
    bgColor: 'bg-info/10',
    variant: 'info',
    requestRange: [25000, 200000],
    hasSlider: true,
    features: ['Unlimited email templates', 'Whitelist', 'Unlimited contacts', 'Attachments up to 30mb', 'Completely white label', 'Suppressions list', 'Multi-user access', 'Priority support'],
  },
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const [proVolume, setProVolume] = useState(15);
  const [bizVolume, setBizVolume] = useState(40);

  const getPrice = (plan: typeof PRICING_PLANS[0]) => {
    if (isYearly) return Math.floor(plan.price * 0.8);
    return plan.price;
  };

  const getVolume = (planId: string) => {
    if (planId === 'professional') return proVolume;
    if (planId === 'business') return bizVolume;
    return null;
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg-base text-text-primary py-s-100 px-s-40 flex flex-col items-center font-sans tracking-s-normal">
        {/* Monthly / Yearly Toggle */}
        <div className="flex items-center gap-s-24 mb-s-100">
          <span className={`text-s-28 font-bold transition-colors ${!isYearly ? 'text-accent' : 'text-text-muted'}`}>Monthly</span>
          <button 
            onClick={() => setIsYearly(!isYearly)}
            className="group relative w-s-100 h-s-48 bg-bg-card rounded-full p-s-6 flex items-center transition-all border border-border hover:border-accent/50 shadow-inner"
          >
            <div className={`absolute inset-0 bg-gradient-to-r from-accent/20 to-accent/20 transition-opacity duration-500 rounded-full ${isYearly ? 'opacity-100' : 'opacity-0'}`} />
            <div className={`z-10 w-s-36 h-s-36 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.4)] transform transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) ${isYearly ? 'translate-x-s-52' : 'translate-x-0'}`} />
          </button>
          <div className="flex items-center gap-s-12">
            <span className={`text-s-28 font-bold transition-colors ${isYearly ? 'text-success' : 'text-text-muted'}`}>Yearly</span>
            <div className="bg-success/10 border border-success/30 px-s-12 py-s-4 rounded-full">
              <span className="text-s-16 font-extrabold text-success tracking-s-wide">20% OFF</span>
            </div>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-s-48 max-w-s-1500 w-full mb-s-64 items-stretch">
          {PRICING_PLANS.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              price={getPrice(plan)}
              volume={getVolume(plan.id)}
              onVolumeChange={plan.id === 'professional' ? setProVolume : plan.id === 'business' ? setBizVolume : undefined}
            />
          ))}
        </div>
      </main>
    </>
  );
}

function PricingCard({ plan, price, volume, onVolumeChange }: any) {
  const isSliderCard = plan.hasSlider && volume !== null;
  const cardClass = plan.isActive ? 'relative scale-[1.05] z-10' : '';
  const hoverClass = plan.isActive ? '' : `hover:border-${plan.color.split('-')[1]}/30`;

  return (
    <div className={`card flex flex-col transition-all ${cardClass} ${hoverClass}`}>
      {/* Header */}
      <div className={`${plan.bgColor || 'transparent'} ${plan.isActive ? 'p-s-32 pb-s-56' : 'p-s-32'} text-center`}>
        <h3 className={`text-s-18 font-black mb-s-4 tracking-s-wider ${plan.color}`}>{plan.name}</h3>
        <p className={`text-s-13 mb-s-24 italic font-medium ${plan.isActive ? 'text-white/80' : 'text-text-muted'}`}>{plan.subtitle}</p>
        <div className="flex items-baseline justify-center gap-s-2">
          <span className={`text-s-14 font-bold ${plan.isActive ? 'text-white/70' : 'text-text-muted'}`}>$</span>
          <span className="text-s-48 font-black text-text-primary">{price}</span>
          <span className={`text-s-14 font-bold ${plan.isActive ? 'text-white/70' : 'text-text-muted'}`}>/mo</span>
        </div>
      </div>

      {/* Content */}
      <div className="px-s-24 pt-s-64 pb-s-32 flex-grow text-center text-s-14 space-y-s-16">
        {isSliderCard && plan.requestRange && (
          <div className="space-y-s-12 mb-s-28">
            <div className="flex justify-between text-s-11 text-text-muted px-s-2 font-bold uppercase tracking-s-tighter">
              <span>{plan.requestRange[0].toLocaleString()}</span>
              <span>{plan.requestRange[1].toLocaleString()}</span>
            </div>
            <input 
              type="range" 
              min={plan.requestRange[0]} 
              max={plan.requestRange[1]} 
              step={plan.requestRange[0] === 5000 ? 15 : 20}
              value={volume} 
              onChange={(e) => onVolumeChange?.(parseInt(e.target.value))}
              className={`w-full h-s-6 bg-border rounded-full appearance-none cursor-pointer accent-${plan.color.split('text-')[1]}`}
            />
            <p className="text-text-secondary text-s-11 font-bold uppercase tracking-s-widest">monthly requests</p>
          </div>
        )}

        {!isSliderCard && plan.requests && (
          <p className="text-text-primary font-bold text-s-14">{plan.requests.toLocaleString()} monthly requests</p>
        )}

        <div className="space-y-s-12 text-text-secondary font-medium pt-s-24">
          {plan.features.map((feature: string, idx: number) => (
            <p key={idx}>{feature}</p>
          ))}
        </div>
      </div>

      <SignUpButton active={plan.isActive} variant={plan.variant} />
    </div>
  );
}

function SignUpButton({ active = false, variant = 'accent' }: { active?: boolean, variant?: 'accent' | 'success' | 'info' }) {
  const colorMap = {
    accent: { bg: 'bg-accent', hover: 'hover:border-accent hover:text-accent', glow: 'shadow-accent-glow' },
    success: { bg: 'bg-success', hover: 'hover:border-success hover:text-success', glow: 'shadow-[0_10px_20px_-5px_rgba(34,197,94,0.3)]' },
    info: { bg: 'bg-info', hover: 'hover:border-info hover:text-info', glow: 'shadow-[0_10px_20px_-5px_rgba(56,189,248,0.3)]' }
  };

  const colors = colorMap[variant];
  
  return (
    <div className="p-s-6 overflow-hidden">
       <button 
        className={`w-full py-s-18 rounded-s-12 text-s-14 font-black tracking-[0.2em] transition-all uppercase hover:scale-[1.02] active:scale-[0.98] ${
          active 
            ? `${colors.bg} text-white border-transparent ${colors.glow}` 
            : `border border-border text-text-muted ${colors.hover}`
        }`}
      >
        SIGN UP FREE
      </button>
    </div>
  );
}
