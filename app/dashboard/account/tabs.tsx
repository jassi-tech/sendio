'use client';
import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { authApi } from '@/lib/api';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { RefreshCw, Trash2, CheckCircle, EyeOff, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function GeneralTab() {
  const { user, fetchUser, logout } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const router = useRouter();

  if (!user) return null;

  const handleRefreshKeys = async () => {
    try {
      setRefreshing(true);
      await authApi.refreshKeys();
      await fetchUser();
    } catch (err) {
      console.error(err);
      alert('Failed to refresh keys');
    } finally {
      setRefreshing(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) return;
    try {
      setDeleting(true);
      await authApi.deleteAccount();
      logout();
    } catch (err) {
      console.error(err);
      alert('Failed to delete account');
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-s-32">
      {/* API Keys */}
      <Card variant="solid">
        <h3 className="text-s-16 font-bold mb-s-24 tracking-tight">API keys</h3>
        
        <div className="space-y-s-20">
          <div>
            <label className="block text-s-12 text-text-secondary mb-s-8 font-medium">Public Key</label>
            <Input 
              value={user.publicKey || 'mf_pub_***************'} 
              readOnly 
              className="font-mono text-s-13 bg-bg-base/50 text-text-muted select-all"
            />
          </div>
          <div>
            <label className="block text-s-12 text-text-secondary mb-s-8 font-medium">Private Key</label>
            <div className="relative">
              <Input 
                value={user.privateKey || 'mf_priv_******************************'} 
                type={showPrivateKey ? 'text' : 'password'}
                readOnly 
                className="font-mono text-s-13 bg-bg-base/50 text-text-muted pr-s-40 select-all"
              />
              <button 
                className="absolute right-s-12 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                onClick={() => setShowPrivateKey(!showPrivateKey)}
                type="button"
              >
                {showPrivateKey ? <EyeOff className="w-s-16 h-s-16" /> : <Eye className="w-s-16 h-s-16" />}
              </button>
            </div>
          </div>
          <Button 
            variant="secondary" 
            size="sm" 
            icon={<RefreshCw className={`w-s-14 h-s-14 ${refreshing ? 'animate-spin' : ''}`} />}
            onClick={handleRefreshKeys}
            loading={refreshing}
          >
            Refresh Keys
          </Button>
        </div>
      </Card>

      {/* Notifications */}
      <Card variant="solid">
        <h3 className="text-s-16 font-bold mb-s-16 tracking-tight">Notifications</h3>
        <p className="text-s-13 text-text-secondary mb-s-24">
          All system notifications will be sent to the email address below
        </p>
        
        <div className="space-y-s-20 max-w-s-500">
          <div>
            <label className="block text-s-12 text-text-secondary mb-s-8 font-medium">Email <span className="text-error">*</span></label>
            <Input 
              value={user.email} 
              readOnly 
              className="bg-bg-base/50 text-text-muted"
            />
          </div>
          <Button variant="secondary" size="sm" icon={<CheckCircle className="w-s-14 h-s-14" />}>
            Change
          </Button>
        </div>
      </Card>

      {/* Delete Account */}
      <Card variant="solid" className="border-error/20">
        <h3 className="text-s-16 font-bold mb-s-16 tracking-tight">Delete Account</h3>
        <p className="text-s-13 text-text-secondary mb-s-16">
          Before you go...
        </p>
        <ul className="list-disc list-inside text-s-13 text-text-secondary space-y-s-8 mb-s-24">
          <li>Please make sure you have canceled your paid subscription.</li>
          <li>If you have problems with integration, please contact support, we will help you.</li>
          <li>If you are interested in receiving newsletters from us, do not delete your account.</li>
        </ul>
        <Button 
          variant="danger" 
          size="sm" 
          icon={<Trash2 className="w-s-14 h-s-14" />}
          onClick={handleDeleteAccount}
          loading={deleting}
        >
          Delete My Account
        </Button>
      </Card>
    </div>
  );
}

export function SubscriptionTab() {
  return (
    <Card variant="solid">
      <h3 className="text-s-16 font-bold mb-s-24 tracking-tight">Subscription Details</h3>
      
      <div className="space-y-s-20 text-s-14 max-w-s-400 mb-s-32">
        <div className="grid grid-cols-[1fr_2fr] gap-s-16 border-b border-border-dim pb-s-12">
          <span className="text-text-secondary">Current plan:</span>
          <span className="font-semibold">Free <span className="text-text-muted font-normal">/ Lifetime</span></span>
        </div>
        <div className="grid grid-cols-[1fr_2fr] gap-s-16 border-b border-border-dim pb-s-12">
          <span className="text-text-secondary">Monthly quota:</span>
          <span className="font-semibold">200</span>
        </div>
        <div className="grid grid-cols-[1fr_2fr] gap-s-16 border-b border-border-dim pb-s-12">
          <span className="text-text-secondary">Remaining quota:</span>
          <span className="font-semibold">192</span>
        </div>
        <div className="grid grid-cols-[1fr_2fr] gap-s-16 pb-s-12">
          <span className="text-text-secondary">Quota resets on:</span>
          <span className="font-semibold">logic not created</span>
        </div>
      </div>

      <div className="flex gap-s-12">
        <Button variant="primary" size="sm" icon={<CheckCircle className="w-s-14 h-s-14" />}>
          Upgrade
        </Button>
        <Button variant="ghost" size="sm" className="opacity-50 cursor-not-allowed">
          Cancel Subscription
        </Button>
      </div>
    </Card>
  );
}

export function InvoicesTab() {
  return (
    <Card variant="solid" className="min-h-s-200 flex flex-col">
      <h3 className="text-s-16 font-bold mb-s-64 tracking-tight">Billing History</h3>
      
      <div className="flex-1 flex items-center justify-center text-s-14 text-text-muted">
        Your invoices will appear here
      </div>
    </Card>
  );
}

export function SecurityTab() {
  return (
    <div className="space-y-s-32">
      {/* Domains Restriction */}
      <Card variant="solid">
        <h3 className="text-s-16 font-bold mb-s-16 tracking-tight">Domains</h3>
        <p className="text-s-13 text-text-secondary mb-s-24">
          Your requests are restricted to the domains listed below
        </p>

        <div className="max-w-s-800 mb-s-24">
          <label className="block text-s-12 text-text-secondary mb-s-8 font-medium">Domain <span className="text-error">*</span></label>
          <div className="flex">
            <Input 
              placeholder="https://my-site.com" 
              className="rounded-e-none border-r-0"
            />
            <div className="flex items-center justify-center px-s-16 bg-bg-elevated border border-border border-l-0 rounded-e-s-8 cursor-pointer hover:bg-bg-hover transition-colors text-text-muted">
              +
            </div>
          </div>
          <p className="text-s-11 text-text-muted mt-s-6">
            Domain includes schema, host and port if present. Press Enter to add
          </p>
        </div>

        <Button variant="secondary" size="sm" icon={<CheckCircle className="w-s-14 h-s-14" />}>
          Save Changes
        </Button>
      </Card>

      {/* API Settings */}
      <Card variant="solid">
        <h3 className="text-s-16 font-bold mb-s-24 tracking-tight">API Settings</h3>
        
        <div className="space-y-s-12 mb-s-24 text-s-14">
          <label className="flex items-center gap-s-12 cursor-pointer">
            <input type="checkbox" className="w-s-16 h-s-16 rounded-s-4 border-border bg-bg-elevated accent-accent text-accent focus:ring-accent" defaultChecked />
            <span className="text-text-primary">Allow EmailJS API for non-browser applications.</span>
            <div className="w-s-14 h-s-14 rounded-full border border-text-muted text-text-muted flex items-center justify-center text-[10px] cursor-help">?</div>
          </label>
          
          <label className="flex items-center gap-s-12 cursor-pointer">
            <input type="checkbox" className="w-s-16 h-s-16 rounded-s-4 border-border bg-bg-elevated accent-accent text-accent focus:ring-accent" defaultChecked />
            <span className="text-text-primary">Use Private Key (recommended)</span>
            <div className="w-s-14 h-s-14 rounded-full border border-text-muted text-text-muted flex items-center justify-center text-[10px] cursor-help">?</div>
          </label>
        </div>

        <Button variant="secondary" size="sm" icon={<CheckCircle className="w-s-14 h-s-14" />}>
          Save Changes
        </Button>
      </Card>
    </div>
  );
}
