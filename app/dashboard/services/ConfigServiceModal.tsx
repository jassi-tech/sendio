"use client";

import React, { useState } from "react";
import { X, HelpCircle, Check, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ServiceDef } from "@/lib/api";
import { useSaveSMTP } from "@/hooks/useSMTP";
import type { ConfigServiceModalProps } from "@/lib/interface";
import Image from "next/image";
import { useServiceContext } from "@/context/ServiceContext";
import { handleGoogleSignIn, handleMicrosoftSignIn } from "@/helper";
import { useToast } from "@/context/ToastContext";

export function ConfigServiceModal({
  isOpen,
  onClose,
  serviceDef,
  onCreated,
}: ConfigServiceModalProps) {
  const { showToast } = useToast();
  const [name, setName] = useState("");
  const [serviceId, setServiceId] = useState("");
  const saveMutation = useSaveSMTP();
  const [testEmail, setTestEmail] = useState(true);
  const [connectedEmail, setConnectedEmail] = useState<string | null>(null);
  const [fromName, setFromName] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setActiveServiceId } = useServiceContext();

  React.useEffect(() => {
    if (isOpen && serviceDef) {
      setName(serviceDef.name || "");
      const newId = `${serviceDef.id}_${Math.random().toString(36).substring(2, 7)}`;
      setServiceId(newId);
      setActiveServiceId(newId);
      
      // Reset sensitive fields
      setConnectedEmail(null);
      setPassword("");
    }
  }, [isOpen, serviceDef]);

  const handleClose = () => {
    setActiveServiceId(null);
    onClose();
  };

  if (!isOpen || !serviceDef) return null;

  const isOauth = serviceDef.id === "gmail" || serviceDef.id === "outlook";

  const handleCreate = async () => {
    if (!name.trim()) {
      showToast("Name is required", "error");
      return;
    }
    
    if (isOauth) {
      if (!connectedEmail) {
        showToast(`Please connect your ${serviceDef.name} account`, "error");
        return;
      }
    } else {
      if (!fromEmail.trim()) {
        showToast("Email is required", "error");
        return;
      }
      if (!password.trim()) {
        showToast("Password/App Password is required", "error");
        return;
      }
    }

    try {
      const payload = {
        serviceId,
        label: name,
        provider: serviceDef.id,
        host: serviceDef.smtpHost || "",
        port: serviceDef.smtpPort || 587,
        secure: serviceDef.smtpSecure ?? (serviceDef.smtpPort === 465),
        user: isOauth ? (connectedEmail || "") : fromEmail,
        password: isOauth ? " " : password,
        isDefault: false,
        sendTest: testEmail,
        fromName: fromName || name,
        fromEmail: fromEmail || connectedEmail || "",
      };

      await saveMutation.mutateAsync(payload);
      showToast("Service created successfully", "success");

      if (onCreated) onCreated();
      onClose();
    } catch (error: any) {
      showToast(error.message || "Failed to create service", "error");
    }
  };

  const getProviderLogo = () => {
    return serviceDef.logoUrl || `/${serviceDef.id.toLowerCase()}.png`;
  };

  const categoryText =
    serviceDef.category === "transactional"
      ? "Transactional Service"
      : "Personal Service";
  // Mocking the limit per day as per design for Gmail
  const limitText =
    serviceDef.id === "gmail"
      ? "500 emails per day"
      : serviceDef.id === "outlook"
      ? "10,000 emails per day"
      : "Limit depends on provider";

  const handleConnect = () => {
    const callbacks = {
      setConnectedEmail,
      setFromEmail,
      setFromName,
      onError: (err: string) => showToast(err, "error"),
    };
    if (serviceDef.id === "gmail") {
      handleGoogleSignIn(callbacks);
    } else if (serviceDef.id === "outlook") {
      handleMicrosoftSignIn(callbacks);
    }
  };

  const regenerateServiceId = () => {
    const newId = `${serviceDef.id}_${Math.random().toString(36).substring(2, 7)}`;
    setServiceId(newId);
    setActiveServiceId(newId); // ← update context too
    showToast("Service ID regenerated", "info");
  };
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-s-16 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-bg-base rounded-s-8 shadow-2xl w-full max-w-2xl overflow-hidden border border-border animate-slide-up flex flex-col max-h-[90vh]">
        {/* Header matching the screenshot */}
        <div className="flex items-center justify-between p-s-16 bg-[#4f6ebf] text-white">
          <h2 className="text-s-14 font-semibold">Config Service</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="p-s-4 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X size={18} />
          </Button>
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 overflow-y-auto custom-scrollbar bg-bg-base text-text-primary">
          {/* Top Info Section */}
          <div className="flex items-center gap-s-16 p-s-24 border-b border-border-dim">
            <div className="w-s-48 h-s-48 shrink-0 flex items-center justify-center bg-white rounded-s-8 p-s-8 border border-border">
              {getProviderLogo() ? (
                <Image
                  src={getProviderLogo()}
                  alt={serviceDef.name}
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.srcset = "";
                    target.src =
                      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%235c5c78" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>';
                  }}
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#5c5c78"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              )}
            </div>
            <div className="flex flex-col gap-s-4">
              <span className="text-s-16 font-bold text-text-primary">
                {serviceDef.name}
              </span>
              <div className="flex items-center gap-s-8 text-s-12 text-text-secondary">
                <span>{categoryText}</span>
                <span className="w-s-4 h-s-4 rounded-full bg-border"></span>
                <span className="flex items-center gap-s-4">
                  {limitText}
                  <HelpCircle
                    size={12}
                    className="cursor-help opacity-70 hover:opacity-100 transition-opacity"
                  />
                </span>
              </div>
            </div>
          </div>

          {/* Form Fields Section */}
          <div className="p-s-24 flex flex-col gap-s-24">
            {/* Name Input */}
            <Input
              label="Name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={`e.g. My ${serviceDef.name}`}
            />

            {/* From Details (Only shows if connected or not OAuth) */}
            {(connectedEmail || !isOauth) && (
              <div className="flex gap-s-16">
                <div className="flex-1">
                  <Input
                    label="From Name"
                    value={fromName}
                    onChange={(e) => setFromName(e.target.value)}
                    placeholder="e.g. Acme Support"
                  />
                </div>
                <div className="flex-1">
                  <Input
                    label="From Email *"
                    value={fromEmail}
                    readOnly={isOauth}
                    onChange={(e) => setFromEmail(e.target.value)}
                    placeholder="e.g. support@acme.com"
                  />
                </div>
              </div>
            )}

            {!isOauth && (
              <Input
                label="App Password *"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your 16-character app password"
              />
            )}

            {/* Service ID Input (Readonly for preview/mock) */}
            <div>
              <label className="block text-s-12 font-semibold text-text-secondary mb-s-6 ml-s-2">
                Service ID <span className="text-error">*</span>
              </label>
              <div className="relative">
                <Input
                  type="text"
                  value={serviceId}
                  readOnly
                  className="w-full bg-bg-elevated border border-border rounded-s-8 text-text-primary text-s-14 outline-none px-s-14 py-s-11 pr-s-40"
                />
                <button
                  type="button"
                  onClick={regenerateServiceId}
                  title="Generate new Service ID"
                  className="absolute right-s-12 top-1/2 -translate-y-1/2 text-text-muted hover:text-accent transition-colors cursor-pointer hover:rotate-180 duration-300"
                >
                  <RefreshCw size={16} />
                </button>
              </div>
            </div>

            {/* Connect Button or Status */}
            {isOauth && (
              <div className="flex flex-col gap-s-8">
                <label className="block text-s-12 font-semibold text-text-secondary ml-s-2">
                  {serviceDef.name} Connect
                </label>

                {connectedEmail ? (
                  <div className="flex items-center justify-between p-s-16 border border-border rounded-s-12 bg-bg-card">
                    <span className="text-s-14 text-text-primary">
                      Connected as{" "}
                      <span className="font-semibold text-accent">
                        {connectedEmail}
                      </span>
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-auto py-s-6"
                      onClick={() => setConnectedEmail(null)}
                    >
                      Disconnect
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Button
                      variant="primary"
                      className="h-auto py-s-10 px-s-24 text-s-14"
                      onClick={handleConnect}
                    >
                      Sign in with {serviceDef.name}
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Info Message */}
            <div className="flex gap-s-12 p-s-16 bg-bg-elevated/40 border border-border rounded-s-12">
              <div className="mt-s-2 text-accent">
                <HelpCircle size={16} />
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                {isOauth ? (
                  <>
                    Please allow the &quot;Send email on your behalf&quot; permission when connecting.
                    <br />
                    Both {serviceDef.name} and Enterprise accounts are supported.
                  </>
                ) : (
                  <>
                    For security, {serviceDef.name} requires an <b>App Password</b> instead of your normal account password.
                    <br />
                    Go to your {serviceDef.name} account security settings to generate one.
                  </>
                )}
              </p>
            </div>

            {/* Test Email Checkbox */}
            <div className="flex flex-col gap-s-16 mt-s-8 ml-s-2">
              <label className="flex items-center gap-s-12 cursor-pointer group">
                <div
                  className={`w-s-20 h-s-20 rounded-s-6 border flex items-center justify-center transition-all ${testEmail ? "bg-accent border-accent shadow-accent-glow" : "border-border group-hover:border-accent"}`}
                >
                  {testEmail && <Check size={14} className="text-white" />}
                </div>
                <input
                  type="checkbox"
                  className="hidden"
                  checked={testEmail}
                  onChange={() => setTestEmail(!testEmail)}
                />
                <span className="text-s-14 text-text-secondary group-hover:text-text-primary transition-colors font-medium">
                  Send test email to verify configuration
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-s-12 p-s-16 border-t border-border bg-bg-card">
          <Button variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleCreate}
            loading={saveMutation.isPending}
            icon={<Check size={18} />}
          >
            Create Service
          </Button>
        </div>
      </div>
    </div>
  );
}
