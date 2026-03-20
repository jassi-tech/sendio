'use client';
import { useEffect, useState } from 'react';
import { Plus, Trash2, CheckCircle, Loader2, Server, Wifi, WifiOff, Star, ShieldCheck, Mail } from 'lucide-react';
import { smtpApi } from '@/lib/api';
import { useToast } from '@/context/ToastContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Table, THead, TBody, TR, TH, TD } from '@/components/ui/Table';
import type { SmtpConfig } from '@/lib/interface';

export default function SendersPage() {
  const { showToast } = useToast();
  const [configs, setConfigs] = useState<SmtpConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [testing, setTesting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [testResult, setTestResult] = useState<{ ok: boolean; msg: string } | null>(null);
  const [form, setForm] = useState({ label: '', host: '', port: '587', secure: false, user: '', password: '', fromName: '', fromEmail: '', isDefault: false });

  useEffect(() => {
    smtpApi.list().then((d) => setConfigs(d as SmtpConfig[])).finally(() => setLoading(false));
  }, []);

  const handleTest = async () => {
    setTesting(true); setTestResult(null);
    try {
      await smtpApi.test({ host: form.host, port: Number(form.port), secure: form.secure, user: form.user, password: form.password });
      setTestResult({ ok: true, msg: 'SMTP connection successful!' });
      showToast('SMTP Connection Successful', 'success');
    } catch (e: any) { 
      setTestResult({ ok: false, msg: e.message }); 
      showToast(e.message || 'Connection Failed', 'error');
    }
    finally { setTesting(false); }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!form.label || !form.host || !form.user || !form.password || !form.fromName || !form.fromEmail) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    try {
      setSaving(true);
      const newCfg = await smtpApi.save({ 
        ...form, 
        port: Number(form.port),
        provider: 'smtp' // Required by backend validation
      });
      showToast('Sender profile created', 'success');
      setConfigs((prev) => [newCfg as SmtpConfig, ...prev]);
      setShowForm(false); 
      setForm({ label: '', host: '', port: '587', secure: false, user: '', password: '', fromName: '', fromEmail: '', isDefault: false });
      setTestResult(null);
    } catch (e: any) { 
      showToast(e.message || 'Failed to save configuration', 'error'); 
    } finally { 
      setSaving(false); 
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this sender profile?')) return;
    try {
      await smtpApi.delete(id);
      showToast('Sender profile deleted', 'success');
      setConfigs((prev) => prev.filter((c) => c._id !== id));
    } catch (e: any) {
      showToast(e.message || 'Failed to delete', 'error');
    }
  };

  return (
    <div className="animate-fade-in space-y-s-32">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-s-16">
        <div>
          <h1 className="text-s-32 font-black text-text-primary tracking-tight mb-s-4">Sender Profiles</h1>
          <p className="text-text-secondary text-s-15">Manage your SMTP configurations for outgoing mail.</p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          variant={showForm ? 'secondary' : 'primary'}
          icon={showForm ? null : <Plus size={18} />}
        >
          {showForm ? 'Cancel' : 'Add New Sender'}
        </Button>
      </div>

      {/* Add Form */}
      {showForm && (
        <Card padded variant="elevated" className="animate-slide-up">
          <form onSubmit={handleSave} className="space-y-s-24">
            <div className="flex items-center gap-s-12 pb-s-16 border-b border-border">
               <div className="w-s-40 h-s-40 rounded-s-10 bg-accent/10 flex items-center justify-center text-accent">
                 <Server size={20} />
               </div>
               <h3 className="text-s-18 font-bold text-text-primary">New SMTP Configuration</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-s-20">
              <Input label="Profile Label" placeholder="Work Google Workspace" value={form.label} onChange={e => setForm({...form, label: e.target.value})} required />
              <Input label="SMTP Host" placeholder="smtp.gmail.com" value={form.host} onChange={e => setForm({...form, host: e.target.value})} required />
              <Input label="SMTP User/Email" placeholder="user@domain.com" value={form.user} onChange={e => setForm({...form, user: e.target.value})} required />
              <Input label="Password" type="password" placeholder="••••••••" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
              <Input label="Sender Name" placeholder="Support Team" value={form.fromName} onChange={e => setForm({...form, fromName: e.target.value})} required />
              <Input label="Sender Email" type="email" placeholder="no-reply@domain.com" value={form.fromEmail} onChange={e => setForm({...form, fromEmail: e.target.value})} required />
            </div>

            <div className="flex flex-wrap items-center gap-s-24 py-s-8">
               <div className="w-s-120">
                 <Input label="Port" type="number" value={form.port} onChange={e => setForm({...form, port: e.target.value})} />
               </div>
               <label className="flex items-center gap-s-10 cursor-pointer select-none group mt-s-20">
                  <div className={`w-s-20 h-s-20 rounded-s-4 border flex items-center justify-center transition-all ${form.secure ? 'bg-accent border-accent text-white' : 'border-border bg-bg-elevated group-hover:border-accent'}`}>
                     <input type="checkbox" className="hidden" checked={form.secure} onChange={e => setForm({...form, secure: e.target.checked})} />
                     {form.secure && <CheckCircle size={14} />}
                  </div>
                  <span className="text-s-14 font-medium text-text-secondary">Use SSL/TLS</span>
               </label>
               <label className="flex items-center gap-s-10 cursor-pointer select-none group mt-s-20">
                  <div className={`w-s-20 h-s-20 rounded-s-4 border flex items-center justify-center transition-all ${form.isDefault ? 'bg-accent border-accent text-white' : 'border-border bg-bg-elevated group-hover:border-accent'}`}>
                     <input type="checkbox" className="hidden" checked={form.isDefault} onChange={e => setForm({...form, isDefault: e.target.checked})} />
                     {form.isDefault && <CheckCircle size={14} />}
                  </div>
                  <span className="text-s-14 font-medium text-text-secondary">Set as Default</span>
               </label>
            </div>

            {testResult && (
              <Badge 
                variant={testResult.ok ? 'success' : 'error'} 
                className="w-full py-s-12 px-s-16 text-s-13 font-medium rounded-s-8 border-none" 
                icon={testResult.ok ? <Wifi size={14} /> : <WifiOff size={14} />}
              >
                {testResult.msg}
              </Badge>
            )}

            <div className="flex items-center justify-end gap-s-12 pt-s-16 border-t border-border">
              <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button type="button" variant="secondary" onClick={handleTest} loading={testing} icon={<Wifi size={16} />}>Test Connection</Button>
              <Button type="submit" variant="primary" loading={saving} icon={<CheckCircle size={16} />}>Create Profile</Button>
            </div>
          </form>
        </Card>
      )}

      {/* List */}
      <Card padded={false} className="overflow-hidden">
        {loading ? (
          <div className="p-s-80 flex flex-col items-center justify-center text-text-muted gap-s-16">
            <Loader2 className="w-s-32 h-s-32 animate-spin text-accent" />
            <span className="text-s-14 font-medium">Fetching profiles...</span>
          </div>
        ) : configs.length === 0 ? (
          <div className="p-s-80 flex flex-col items-center justify-center text-center space-y-s-16">
            <div className="w-s-64 h-s-64 rounded-full bg-bg-elevated flex items-center justify-center border border-border text-text-muted">
              <Server size={32} />
            </div>
            <div>
              <h3 className="text-s-18 font-bold text-text-primary">No Senders Cloud</h3>
              <p className="text-text-secondary text-s-14 max-w-s-300 mx-auto">
                You haven't configured any SMTP sender profiles yet. Add one to start sending emails.
              </p>
            </div>
            {!showForm && <Button onClick={() => setShowForm(true)} variant="outline" size="sm">Get Started</Button>}
          </div>
        ) : (
          <Table>
            <THead className="md:hidden">
              <TR>

                <TH>Profile</TH>
                <TH className="hidden md:table-cell">Sender Details</TH>
                <TH className="hidden lg:table-cell">SMTP Host</TH>
                <TH className="hidden xl:table-cell">Status</TH>
                <TH className="text-right">Actions</TH>
              </TR>
            </THead>
            <TBody>
              {configs.map((cfg) => (
                <TR key={cfg._id}>
                  <TD>
                    <div className="flex items-center gap-s-12">
                      <div className={`w-s-40 h-s-40 rounded-s-10 flex items-center justify-center shrink-0 ${cfg.isDefault ? 'bg-accent/10 text-accent' : 'bg-bg-elevated text-text-muted'}`}>
                         <Mail size={18} />
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold truncate text-s-15 flex items-center gap-s-6">
                           {cfg.label}
                           {cfg.isDefault && <Badge variant="accent" className="px-s-4 py-0 text-[9px] uppercase tracking-tighter">Default</Badge>}
                        </div>
                        <div className="text-s-13 text-text-muted truncate md:hidden">
                           {cfg.fromName} &lt;{cfg.fromEmail}&gt;
                        </div>
                      </div>
                    </div>
                  </TD>
                  <TD className="hidden md:table-cell">
                    <div className="text-s-14 font-medium">{cfg.fromName}</div>
                    <div className="text-s-12 text-text-muted">{cfg.fromEmail}</div>
                  </TD>
                  <TD className="hidden lg:table-cell">
                    <div className="flex items-center gap-s-6 text-s-13">
                       <code className="bg-bg-elevated px-s-4 py-s-2 rounded-s-4 border border-border text-text-secondary">{cfg.host}</code>
                       <span className="text-text-muted shrink-0">: {cfg.port}</span>
                       {cfg.secure && <ShieldCheck size={14} className="text-success" />}
                    </div>

                  </TD>
                  <TD className="hidden xl:table-cell">
                     <Badge variant="success" icon={<Wifi size={10} />}>Connected</Badge>
                  </TD>
                  <TD className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-text-muted hover:text-error hover:bg-error/5" 
                      onClick={() => handleDelete(cfg._id)}
                      icon={<Trash2 size={16} />}
                    />
                  </TD>
                </TR>
              ))}
            </TBody>
          </Table>
        )}
      </Card>
    </div>
  );
}

