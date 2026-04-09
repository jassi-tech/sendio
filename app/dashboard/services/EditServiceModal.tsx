"use client";

import React, { useState } from "react";
import { HelpCircle, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { useServices } from "@/hooks/useServices";
import { useUpdateSMTP } from "@/hooks/useSMTP";
import type { EditServiceModalProps } from "@/lib/interface";
import { handleGoogleSignIn } from "@/helper";
import { useToast } from "@/context/ToastContext";

export function EditServiceModal({
  isOpen,
  onClose,
  service,
  onUpdate,
}: EditServiceModalProps) {
  const { showToast } = useToast();
  const [name, setName] = useState(service?.label || "");
  const { data: services = [] } = useServices();
  const updateMutation = useUpdateSMTP();
  const providerDef = services.find((s) => s.id === service?.provider);
  
  const [connectedEmail, setConnectedEmail] = useState<string | null>(
    service?.user || null,
  );
  const [testEmail, setTestEmail] = useState(true);

  if (!isOpen || !service) return null;

  const handleDisconnect = async () => {
    const serviceMongoId = service?._id || service?.id;

    if (!serviceMongoId) {
      showToast("Invalid service ID", "error");
      return;
    }
    try {
      await updateMutation.mutateAsync({ id: serviceMongoId, data: { user: "", fromEmail: "" } });
      setConnectedEmail(null);
      showToast("Service disconnected", "success");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to disconnect";
      showToast(message, "error");
    }
  };

  const handleUpdate = async () => {
    if (!service._id) return;
    try {
      await updateMutation.mutateAsync({ id: service._id, data: { label: name } });
      showToast("Service updated successfully", "success");

      if (onUpdate) onUpdate();
      onClose();
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to update service";
      showToast(message, "error");
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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Service"
      maxWidth="max-w-2xl"
      bodyClassName="no-scrollbar !pr-0 text-text-primary"
    >
      <div className="flex flex-col bg-bg-base text-text-primary rounded-s-12 overflow-hidden">
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
                  onClick={() => {
                    navigator.clipboard.writeText(
                      service.serviceId || service.id,
                    );
                    showToast("Service ID copied", "success");
                  }}
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
                      onClick={handleDisconnect}
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

            <div className="flex items-center justify-end gap-s-12 pt-s-8">
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleUpdate}
                loading={updateMutation.isPending}
                icon={<Check size={18} />}
              >
                Update Service
              </Button>
            </div>
          </div>
      </div>
    </Modal>
  );
}
