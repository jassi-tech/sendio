'use client';
import { useEffect, useState } from 'react';
import { Plus, Trash2, Copy, Key, Loader2, CheckCircle, Server, Eye, EyeOff, Shield } from 'lucide-react';
import { keysApi, smtpApi } from '@/lib/api';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Table, THead, TBody, TR, TH, TD } from '@/components/ui/Table';
import type { ApiKeyItem, ApiKeySmtpConfig } from '@/lib/interface';


export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKeyItem[]>([]);
  const [senders, setSenders] = useState<ApiKeySmtpConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ label: '', smtpConfigId: '' });
  const [newRawKey, setNewRawKey] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    Promise.all([keysApi.list(), smtpApi.list()]).then(([k, s]) => {
      setKeys(k as ApiKeyItem[]);
      setSenders(s as ApiKeySmtpConfig[]);
    }).finally(() => setLoading(false));
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    try {
      const res = await keysApi.generate({ label: form.label, smtpConfigId: form.smtpConfigId }) as ApiKeyItem & { rawKey: string };
      setNewRawKey(res.rawKey);
      setKeys((prev) => [res, ...prev]);
      setShowForm(false); setForm({ label: '', smtpConfigId: '' });
    } catch (err: any) { alert(err.message); }
    finally { setSaving(false); }
  };

  const handleRevoke = async (id: string) => {
    if (!confirm('Revoke this API key? This cannot be undone.')) return;
    await keysApi.revoke(id);
    setKeys((prev) => prev.filter((k) => k._id !== id));
  };

  const copy = () => {
    navigator.clipboard.writeText(newRawKey);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="animate-fade-in space-y-s-32">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-s-16">
        <div>
          <h1 className="text-s-32 font-black text-text-primary tracking-tight mb-s-4">API Keys</h1>
          <p className="text-text-secondary text-s-15">Securely authenticate your applications to send mail.</p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          variant={showForm ? 'secondary' : 'primary'}
          icon={showForm ? null : <Plus size={18} />}
        >
          {showForm ? 'Cancel' : 'Generate New Key'}
        </Button>
      </div>

      {newRawKey && (
        <Card variant="glass" className="border-success/30 bg-success/5 animate-slide-up">
          <div className="flex items-start gap-s-16 mb-s-20">
            <div className="w-s-40 h-s-40 bg-success/20 rounded-full flex items-center justify-center text-success shrink-0">
               <Shield size={20} />
            </div>
            <div>
              <h3 className="text-s-16 font-bold text-success mb-s-4">API Key Generated Successfully</h3>
              <p className="text-success/80 text-s-13 leading-relaxed">
                Copy this key now. For security reasons, <strong>it will never be shown again</strong>.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-s-12">
            <div className="flex-1 p-s-14 bg-bg-base/50 backdrop-blur rounded-s-10 border border-success/20 font-mono text-s-13 text-text-primary break-all">
              {newRawKey}
            </div>
            <Button 
              variant={copied ? 'primary' : 'secondary'} 
              className={copied ? 'bg-success hover:bg-success shadow-none' : ''}
              onClick={copy}
              icon={copied ? <CheckCircle size={16} /> : <Copy size={16} />}
            >
              {copied ? 'Copied' : 'Copy Key'}
            </Button>
          </div>
        </Card>
      )}

      {showForm && (
        <Card variant="elevated" padded className="animate-slide-up">
          <form onSubmit={handleCreate} className="space-y-s-24">
             <div className="flex items-center gap-s-12 pb-s-16 border-b border-border">
               <div className="w-s-40 h-s-40 rounded-s-10 bg-accent/10 flex items-center justify-center text-accent">
                 <Key size={20} />
               </div>
               <h3 className="text-s-18 font-bold text-text-primary">Generate API Key</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-s-20">
              <Input 
                label="Key Label" 
                placeholder="e.g. Production Web App" 
                value={form.label} 
                onChange={e => setForm({...form, label: e.target.value})} 
                required 
              />
              <div className="space-y-s-6">
                <label className="block text-s-12 font-semibold text-text-secondary ml-s-2">Restrict to Sender</label>
                <select
                  value={form.smtpConfigId}
                  onChange={(e) => setForm({ ...form, smtpConfigId: e.target.value })}
                  required
                  className="w-full bg-bg-elevated border border-border rounded-s-8 text-text-primary text-s-14 outline-none transition-all focus:border-accent p-s-11 px-s-14 appearance-none"
                >
                  <option value="">Select a sender profile…</option>
                  {senders.map((s) => (
                    <option key={s._id} value={s._id}>{s.label} ({s.fromEmail})</option>
                  ))}
                </select>
                {senders.length === 0 && (
                  <p className="text-s-11 text-warning font-medium mt-s-4 ml-s-2">
                    You need to create a sender profile first.
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-s-12 pt-s-16 border-t border-border">
              <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button type="submit" variant="primary" loading={saving} icon={<Key size={16} />}>Generate Key</Button>
            </div>
          </form>
        </Card>
      )}

      <Card padded={false} className="overflow-hidden">
        {loading ? (
          <div className="p-s-80 flex flex-col items-center justify-center text-text-muted gap-s-16">
            <Loader2 className="w-s-32 h-s-32 animate-spin text-accent" />
            <span className="text-s-14 font-medium">Loading keys...</span>
          </div>
        ) : keys.length === 0 ? (
          <div className="p-s-80 flex flex-col items-center justify-center text-center space-y-s-16">
            <div className="w-s-64 h-s-64 rounded-full bg-bg-elevated flex items-center justify-center border border-border text-text-muted">
              <Key size={32} />
            </div>
            <div>
              <h3 className="text-s-18 font-bold text-text-primary">No API Keys</h3>
              <p className="text-text-secondary text-s-14 max-w-s-300 mx-auto">
                Create an API key to start sending emails through our HTTP endpoint.
              </p>
            </div>
            {!showForm && <Button onClick={() => setShowForm(true)} variant="outline" size="sm">Generate One</Button>}
          </div>
        ) : (
          <Table>
            <THead className="hidden lg:table-header-group">
              <TR>
                <TH>Key Name</TH>
                <TH>Linked Sender</TH>
                <TH>Last Used</TH>
                <TH>Created</TH>
                <TH className="text-right">Actions</TH>
              </TR>
            </THead>
            <TBody>
              {keys.map((k) => (
                <TR key={k._id}>
                  <TD>
                    <div className="flex items-center gap-s-12">
                      <div className="w-s-40 h-s-40 bg-accent/10 rounded-s-10 flex items-center justify-center text-accent shrink-0">
                         <Key size={18} />
                      </div>
                      <div>
                        <div className="font-bold text-s-15">{k.label}</div>
                        <div className="flex items-center gap-s-6 text-s-12 font-mono text-text-muted mt-s-2">
                           <Shield size={10} /> {k.keyPrefix}••••••••
                        </div>
                      </div>
                    </div>
                  </TD>
                  <TD className="hidden lg:table-cell">
                    {k.smtpConfigId ? (
                       <div className="space-y-s-2">
                         <div className="text-s-13 font-bold text-text-primary">{k.smtpConfigId.label}</div>
                         <div className="text-s-11 text-text-muted">{k.smtpConfigId.fromEmail}</div>
                       </div>
                    ) : (
                       <Badge variant="neutral">System Managed</Badge>
                    )}
                  </TD>
                  <TD className="hidden lg:table-cell">
                    {k.lastUsedAt ? (
                       <div className="text-s-13 font-medium text-text-primary">
                         {new Date(k.lastUsedAt).toLocaleDateString()}
                       </div>
                    ) : (
                       <span className="text-s-12 text-text-muted">Never</span>
                    )}
                  </TD>
                  <TD className="hidden lg:table-cell text-s-13 text-text-secondary">
                    {new Date(k.createdAt).toLocaleDateString()}
                  </TD>
                  <TD className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-text-muted hover:text-error hover:bg-error/5" 
                      onClick={() => handleRevoke(k._id)}
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

