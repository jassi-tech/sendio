"use client";
import { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  Copy,
  Key,
  Loader2,
  CheckCircle,
  Server,
  Eye,
  EyeOff,
  Shield,
  AlertTriangle,
  X,
} from "lucide-react";
import { useKeys, useGenerateKey, useRevokeKey } from "@/hooks/useKeys";
import { useSMTPList } from "@/hooks/useSMTP";
import { useTemplates } from "@/hooks/useTemplates";
import { useToast } from "@/context/ToastContext";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/Table";
import type { ApiKeyItem, ApiKeySmtpConfig, Template } from "@/lib/interface";

export default function ApiKeysPage() {
  const { showToast } = useToast();
  const { data: rawKeys = [], isLoading: loadingKeys } = useKeys();
  const { data: rawSenders = [], isLoading: loadingSenders } = useSMTPList();
  const { data: templates = [], isLoading: loadingTemplates } = useTemplates();
  const loading = loadingKeys || loadingSenders || loadingTemplates;

  const keys = rawKeys as ApiKeyItem[];
  const senders = rawSenders as ApiKeySmtpConfig[];

  const generateMutation = useGenerateKey();
  const revokeMutation = useRevokeKey();

  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ label: "", smtpConfigId: "", templateId: "" });
  const [newRawKey, setNewRawKey] = useState("");
  const [copied, setCopied] = useState(false);
  const [revokingId, setRevokingId] = useState<string | null>(null);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = (await generateMutation.mutateAsync({
        label: form.label,
        smtpConfigId: form.smtpConfigId,
        templateId: form.templateId,
      })) as ApiKeyItem & { rawKey: string };
      setNewRawKey(res.rawKey);
      setShowForm(false);
      setForm({ label: "", smtpConfigId: "", templateId: "" });
      showToast("API key generated", "success");
    } catch (err: any) {
      showToast(err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const handleRevoke = async (id: string) => {
    try {
      await revokeMutation.mutateAsync(id);
      showToast("API key revoked", "success");
    } catch (err: any) {
      showToast(err.message || "Failed to revoke key", "error");
    } finally {
      setRevokingId(null);
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(newRawKey);
    setCopied(true);
    showToast("API key copied", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="animate-fade-in space-y-s-32 pb-s-40">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-s-16">
        <div>
          <h1 className="text-s-32 font-black text-text-primary tracking-tight mb-s-4">
            API Keys
          </h1>
          <p className="text-text-secondary text-s-15">
            Securely authenticate your applications to send mail.
          </p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          variant={showForm ? "secondary" : "primary"}
          icon={showForm ? null : <Plus size={18} />}
        >
          {showForm ? "Cancel" : "Generate New Key"}
        </Button>
      </div>

      {newRawKey && (
        <Card
          variant="glass"
          className="border-success/30 bg-success/5 animate-slide-up"
        >
          <div className="flex items-start gap-s-16 mb-s-20">
            <div className="w-s-40 h-s-40 bg-success/20 rounded-full flex items-center justify-center text-success shrink-0">
              <Shield size={20} />
            </div>
            <div className="flex-1">
              <h3 className="text-s-16 font-bold text-success mb-s-4">
                API Key Generated Successfully
              </h3>
              <p className="text-success/80 text-s-13 leading-relaxed">
                Copy this key now. For security reasons,{" "}
                <strong>it will never be shown again</strong>.
              </p>
            </div>
            <button 
              onClick={() => setNewRawKey("")}
              className="text-success/60 hover:text-success transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          <div className="flex items-center gap-s-12">
            <div className="flex-1 p-s-14 bg-bg-base/50 backdrop-blur rounded-s-10 border border-success/20 font-mono text-s-13 text-text-primary break-all">
              {newRawKey}
            </div>
            <Button
              variant={copied ? "primary" : "secondary"}
              className={
                copied ? "bg-success hover:bg-success shadow-none" : ""
              }
              onClick={copy}
              icon={copied ? <CheckCircle size={16} /> : <Copy size={16} />}
            >
              {copied ? "Copied" : "Copy Key"}
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
              <h3 className="text-s-18 font-bold text-text-primary">
                Generate API Key
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-s-20">
              <Input
                label="Key Label"
                placeholder="e.g. Production Web App"
                value={form.label}
                onChange={(e) => setForm({ ...form, label: e.target.value })}
                required
              />
              <div className="space-y-s-6">
                <label className="block text-s-12 font-semibold text-text-secondary ml-s-2">
                  Restrict to Sender
                </label>
                <select
                  value={form.smtpConfigId}
                  onChange={(e) =>
                    setForm({ ...form, smtpConfigId: e.target.value })
                  }
                  required
                  className="w-full bg-bg-elevated border border-border rounded-s-8 text-text-primary text-s-14 outline-none transition-all focus:border-accent p-s-11 px-s-14 appearance-none"
                >
                  <option value="">Select a sender profile…</option>
                  {senders.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.label} ({s.fromEmail}) {s.serviceId ? `[${s.serviceId}]` : ""}
                    </option>
                  ))}
                </select>
                {senders.length === 0 && (
                  <p className="text-s-11 text-warning font-medium mt-s-4 ml-s-2">
                    You need to create a sender profile first.
                  </p>
                )}
              </div>
              <div className="space-y-s-6">
                <label className="block text-s-12 font-semibold text-text-secondary ml-s-2">
                  Linked Template
                </label>
                <select
                  value={form.templateId}
                  onChange={(e) =>
                    setForm({ ...form, templateId: e.target.value })
                  }
                  required
                  className="w-full bg-bg-elevated border border-border rounded-s-8 text-text-primary text-s-14 outline-none transition-all focus:border-accent p-s-11 px-s-14 appearance-none"
                >
                  <option value="">Select a template…</option>
                  {templates.map((t) => (
                    <option key={t.templateId} value={t._id}>
                      {t.name} ({t.templateId})
                    </option>
                  ))}
                </select>
                {templates.length === 0 && (
                  <p className="text-s-11 text-warning font-medium mt-s-4 ml-s-2">
                    You need to create a template first.
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-s-12 pt-s-16 border-t border-border">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                loading={generateMutation.isPending}
                icon={<Key size={16} />}
              >
                Generate Key
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Revocation Confirmation Overlay */}
      {revokingId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-s-24 bg-bg-base/80 backdrop-blur-sm animate-fade-in">
          <Card variant="elevated" padded className="max-w-s-400 w-full animate-scale-in">
            <div className="flex flex-col items-center text-center space-y-s-20">
              <div className="w-s-64 h-s-64 rounded-full bg-error/10 flex items-center justify-center text-error border border-error/20">
                <AlertTriangle size={32} />
              </div>
              <div>
                <h3 className="text-s-20 font-bold text-text-primary mb-s-8">
                  Revoke API Key?
                </h3>
                <p className="text-text-secondary text-s-14 leading-relaxed">
                  Are you sure you want to revoke this API key? This will instantly break any applications using it. <strong>This action cannot be undone.</strong>
                </p>
              </div>
              <div className="flex items-center gap-s-12 w-full pt-s-8">
                <Button
                  className="flex-1"
                  variant="secondary"
                  onClick={() => setRevokingId(null)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-error hover:bg-error/90 text-white"
                  onClick={() => handleRevoke(revokingId)}
                  icon={<Trash2 size={16} />}
                >
                  Revoke
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      <Card padded={false} className="overflow-hidden shadow-xl border-border/50">
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
              <h3 className="text-s-18 font-bold text-text-primary">
                No API Keys
              </h3>
              <p className="text-text-secondary text-s-14 max-w-s-300 mx-auto">
                Create an API key to start sending emails through our HTTP
                endpoint.
              </p>
            </div>
            {!showForm && (
              <Button
                onClick={() => setShowForm(true)}
                variant="outline"
                size="sm"
              >
                Generate One
              </Button>
            )}
          </div>
        ) : (
          <Table>
            <THead className="hidden lg:table-header-group">
              <TR>
                <TH>Key Name</TH>
                <TH>Linked Sender</TH>
                <TH>Linked Template</TH>
                <TH>Last Used</TH>
                <TH>Created</TH>
                <TH className="text-right pr-s-32">Actions</TH>
              </TR>
            </THead>
            <TBody>
              {keys.map((k) => (
                <TR key={k._id} className={`group transition-colors ${!k.isActive ? 'opacity-60 bg-bg-elevated/50' : 'hover:bg-bg-elevated/30'}`}>
                  <TD>
                    <div className="flex items-center gap-s-12">
                      <div className="relative shrink-0">
                        <div className={`w-s-40 h-s-40 rounded-s-10 flex items-center justify-center transition-colors ${
                          k.isActive ? 'bg-accent/10 text-accent group-hover:bg-accent/20' : 'bg-text-muted/10 text-text-muted'
                        }`}>
                          <Key size={18} />
                        </div>
                        {/* Status Pulse Dot */}
                        <div className={`absolute -top-s-1 -right-s-1 w-s-10 h-s-10 rounded-full border-2 border-bg-card ${
                          k.isActive ? 'bg-success animate-pulse' : 'bg-error'
                        }`} />
                      </div>
                      <div>
                        <div className={`font-bold text-s-15 tracking-tight flex items-center gap-s-8 ${k.isActive ? 'text-text-primary' : 'text-text-muted line-through'}`}>
                          {k.label}
                          {!k.isActive && <Badge variant="error" className="text-[9px] px-s-4 py-0 uppercase">Deactivated</Badge>}
                        </div>
                        <div className="flex items-center gap-s-6 text-s-12 font-mono text-text-muted mt-s-2">
                          <Shield size={10} className={k.isActive ? "text-success" : "text-text-muted"} /> {k.keyPrefix}••••••••
                        </div>
                      </div>
                    </div>
                  </TD>
                  <TD className="hidden lg:table-cell">
                    {k.smtpConfigId ? (
                      <div className="space-y-s-2">
                        <div className="text-s-13 font-bold text-text-primary tracking-tight">
                          {k.smtpConfigId.label} {k.smtpConfigId.serviceId && <span className="text-s-10 text-accent ml-s-4 font-mono">[{k.smtpConfigId.serviceId}]</span>}
                        </div>
                        <div className="text-s-11 text-text-muted">
                          {k.smtpConfigId.fromEmail}
                        </div>
                      </div>
                    ) : k.isActive ? (
                      <Badge variant="neutral">System Managed</Badge>
                    ) : (
                      <div className="flex flex-col gap-s-1">
                        <Badge variant="error" className="w-fit">SERVICE DELETED</Badge>
                        <span className="text-[10px] text-error/70 font-medium ml-s-2 italic">Invalidated</span>
                      </div>
                    )}
                  </TD>
                  <TD className="hidden lg:table-cell">
                    {k.templateId ? (
                      <div className="space-y-s-2">
                        <div className="text-s-13 font-bold text-text-primary tracking-tight">
                          {(k.templateId as any).name}
                        </div>
                        <div className="text-s-11 text-text-muted font-mono">
                          {(k.templateId as any).templateId}
                        </div>
                      </div>
                    ) : k.isActive ? (
                      <Badge variant="neutral">None</Badge>
                    ) : (
                      <Badge variant="error">TEMPLATE DELETED</Badge>
                    )}
                  </TD>
                  <TD className="hidden lg:table-cell">
                    {k.lastUsedAt ? (
                      <div className="text-s-13 font-medium text-text-primary">
                        {new Date(k.lastUsedAt).toLocaleDateString()}
                      </div>
                    ) : (
                      <span className="text-s-12 text-text-muted italic">Never</span>
                    )}
                  </TD>
                  <TD className="hidden lg:table-cell text-s-13 text-text-secondary">
                    {new Date(k.createdAt).toLocaleDateString()}
                  </TD>
                  <TD className="text-right pr-s-32">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-text-muted hover:text-error hover:bg-error/5"
                      onClick={() => setRevokingId(k._id)}
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
