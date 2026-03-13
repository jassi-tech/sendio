'use client';
import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { 
  GeneralTab, 
  SubscriptionTab, 
  InvoicesTab, 
  SecurityTab 
} from './tabs';

export default function AccountPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'subscription', label: 'Subscription' },
    { id: 'invoices', label: 'Invoices' },
    { id: 'security', label: 'Security' },
  ];

  if (!user) return null;

  return (
    <div className="max-w-s-1000">
      <h1 className="text-s-24 font-extrabold mb-s-24 tracking-tight">Account</h1>
      
      {/* Tabs Navigation */}
      <div className="flex border-b border-border mb-s-32 gap-s-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              px-s-16 py-s-10 text-s-14 font-medium transition-colors border-b-2 
              ${activeTab === tab.id 
                ? 'border-accent text-accent bg-accent/5' 
                : 'border-transparent text-text-secondary hover:text-text-primary hover:bg-bg-hover'}
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="animate-fade-in">
        {activeTab === 'general' && <GeneralTab />}
        {activeTab === 'subscription' && <SubscriptionTab />}
        {activeTab === 'invoices' && <InvoicesTab />}
        {activeTab === 'security' && <SecurityTab />}
      </div>
    </div>
  );
}
