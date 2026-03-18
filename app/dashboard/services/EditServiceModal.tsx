"use client";

import React, { useEffect, useState } from "react";
import { X, HelpCircle, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { servicesApi, ServiceDef, smtpApi } from "@/lib/api";
import type { EditServiceModalProps } from "@/lib/interface";
import { handleGoogleSignIn } from "@/helper";

export function EditServiceModal({
  isOpen,
  onClose,
  service,
  onUpdate,
}: EditServiceModalProps) {
  const [providerDef, setProviderDef] = useState<ServiceDef | null>(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [connectedEmail, setConnectedEmail] = useState<string | null>(null);
  const [disconnecting, setDisconnecting] = useState(false);
  const [testEmail, setTestEmail] = useState(true);

  useEffect(() => {
    if (isOpen && service) {
      setName(service.label || "");
      setConnectedEmail(service.user || null);
      fetchProviderDef(service.provider);
    }
  }, [isOpen, service]);

  const fetchProviderDef = async (providerId: string) => {
    try {
      setLoading(true);
      const allServices = await servicesApi.list();
      const def = allServices.find((s) => s.id === providerId);
      if (def) setProviderDef(def);
    } catch (error) {
      console.error("Failed to load provider definition:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !service) return null;

  const handleDisconnect = async () => {
    try {
      setDisconnecting(true);
      await smtpApi.update(service.id, { user: "", fromEmail: "" });
      setConnectedEmail(null);
    } catch (error) {
      console.error("Failed to disconnect:", error);
    } finally {
      setDisconnecting(false);
    }
  };

  const handleUpdate = async () => {
    if (!service._id) return;
    try {
      setUpdating(true);
      await smtpApi.update(service._id, { label: name });
      console.log("Update service:", { id: service.id, name, testEmail });

      if (onUpdate) onUpdate();
      onClose();
    } catch (error) {
      console.error("Failed to update service:", error);
    } finally {
      setUpdating(false);
    }
  };

  const getProviderLogo = () => {
    if (providerDef?.logoUrl) return providerDef.logoUrl;
    if (service.provider.toLowerCase() === "gmail") {
      return "https://upload.wikimedia.org/wikipedia/commons/4/4e/Gmail_Icon.png";
    }
    return `/${service.provider.toLowerCase()}.png`;
  };

  const providerName =
    providerDef?.name ||
    service.provider.charAt(0).toUpperCase() + service.provider.slice(1);
  const categoryText =
    providerDef?.category === "transactional"
      ? "Transactional Service"
      : "Personal Service";
  // Mocking the limit per day, for this showcase we follow the design which shows 500 for Gmail
  const limitText =
    service.provider === "gmail"
      ? "500 emails per day"
      : "Limit depends on provider";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-s-16 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-bg-base rounded-s-8 shadow-2xl w-full max-w-2xl overflow-hidden border border-border animate-slide-up flex flex-col max-h-[90vh]">
        {/* Header matching the screenshot */}
        <div className="flex items-center justify-between p-s-16 bg-[#4f6ebf] text-white">
          <h2 className="text-s-14 font-semibold">Edit Service</h2>
          <Button
            size="sm"
            variant="ghost"
            onClick={onClose}
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
              <img
                src={getProviderLogo()}
                alt={providerName}
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%235c5c78" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>';
                }}
              />
            </div>
            <div className="flex flex-col gap-s-4">
              <span className="text-s-16 font-bold text-text-primary">
                {providerName}
              </span>
              <div className="flex items-center gap-s-8 text-s-12 text-text-secondary">
                <span>{categoryText}</span>
                <span className="w-s-4 h-s-4 rounded-full bg-border"></span>
                <span className="flex items-center gap-s-4">
                  {limitText}
                  <HelpCircle
                    size={12}
                    className="cursor-help transition-opacity opacity-70 hover:opacity-100"
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
              placeholder="e.g. Personal Gmail"
            />

            {/* Service ID Input (Readonly) */}
            <div>
              <label className="block text-s-12 font-semibold text-text-secondary mb-s-6 ml-s-2">
                Service ID <span className="text-error">*</span>
              </label>
              <div className="relative">
                <Input
                  type="text"
                  value={service.serviceId || service.id}
                  readOnly
                  className="w-full bg-bg-elevated border border-border rounded-s-8 
                 text-text-primary text-s-14 outline-none px-s-14 py-s-11 
                 pr-s-40 cursor-not-allowed opacity-70"
                />
                <Button
                  variant="ghost"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      service.serviceId || service.id,
                    )
                  }
                  className="absolute right-s-12 top-1/2 -translate-y-1/2 text-text-muted 
                 hover:text-text-secondary transition-colors cursor-pointer p-s-4"
                >
                  <Copy size={16} />
                </Button>
              </div>
            </div>

            {/* Provider Specific Settings (e.g. Gmail Connect) */}
            <div className="flex flex-col gap-s-8">
              <label className="block text-s-12 font-semibold text-text-secondary ml-s-2">
                {providerName} Connect
              </label>

              {connectedEmail ? (
                <>
                  <div className="flex items-center justify-between p-s-16 border border-border rounded-s-12 bg-bg-card">
                    <div className="flex flex-col gap-s-4">
                      <span className="text-s-14 text-text-primary">
                        Connected as{" "}
                        <span className="font-semibold text-accent">
                          {connectedEmail}
                        </span>
                      </span>
                      <span className="text-s-11 text-text-muted text-green-800">
                        ● Active connection
                      </span>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="h-auto py-s-6 text-red-400 border-red-400/30 hover:bg-red-400/10 hover:border-red-400"
                      onClick={() => {
                        handleDisconnect();
                      }}
                    >
                      Disconnect
                    </Button>
                  </div>
                </>
              ) : (
                // Not connected — show reconnect option
                <div className="flex items-center justify-between p-s-16 border border-border border-dashed rounded-s-12 bg-bg-card">
                  <span className="text-s-14 text-text-secondary">
                    No account connected
                  </span>
                  <Button
                    variant="primary"
                    size="sm"
                    className="h-auto py-s-6"
                    onClick={() => handleGoogleSignIn({ setConnectedEmail })}
                  >
                    Reconnect
                  </Button>
                </div>
              )}

              <div className="flex gap-s-12 p-s-16 bg-bg-elevated/40 border border-border rounded-s-12 mt-s-4">
                <div className="mt-s-2 text-accent">
                  <HelpCircle size={16} />
                </div>
                <p className="text-s-13 text-text-secondary leading-relaxed">
                  Allow &quot;Send email on your behalf&quot; permission during
                  connection.
                  <br />
                  Both {providerName} and Google Apps accounts are supported.
                </p>
              </div>
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
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleUpdate}
            loading={updating}
            icon={<Check size={18} />}
          >
            Update Service
          </Button>
        </div>
      </div>
    </div>
  );
}
