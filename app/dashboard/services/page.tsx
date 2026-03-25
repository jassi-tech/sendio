"use client";

import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, MoreVertical, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { AddServiceModal } from "./AddServiceModal";
import { EditServiceModal } from "./EditServiceModal";
import { ConfigServiceModal } from "./ConfigServiceModal";
import { ServiceDef, smtpApi } from "@/lib/api";
import { useToast } from "@/context/ToastContext";
import type { SmtpService } from "@/lib/interface";
import Image from "next/image";
import { useSMTPList, useDeleteSMTP, useUpdateSMTP } from "@/hooks/useSMTP";
import { useQueryClient } from "@tanstack/react-query";

export default function ServicesPage() {
  const { showToast, confirmToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<SmtpService | null>(
    null,
  );
  const [configuringService, setConfiguringService] =
    useState<ServiceDef | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  
  const queryClient = useQueryClient();
  const { data: rawServices = [], isLoading: loading } = useSMTPList();
  const services = rawServices as SmtpService[];
  const deleteMutation = useDeleteSMTP();
  const updateMutation = useUpdateSMTP();

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      // If we click anywhere else, close the menu
      // Check if the click was on the trigger button to prevent immediate closing/re-opening
      const target = e.target as HTMLElement;
      if (!target.closest(".service-menu-trigger")) {
        setOpenMenuId(null);
      }
    };

    if (openMenuId) {
      window.addEventListener("click", handleGlobalClick);
    }

    return () => window.removeEventListener("click", handleGlobalClick);
  }, [openMenuId]);

  const getProviderLogo = (provider?: string) => {
    if (!provider || provider.toLowerCase() === "smtp") return ""; // Empty string forces onError to show SVG
    if (provider.toLowerCase() === "gmail") {
      return "https://upload.wikimedia.org/wikipedia/commons/4/4e/Gmail_Icon.png";
    }
    // generic fallback logic
    return `/${provider.toLowerCase()}.png`;
  };

  const maskServiceId = (id: string) => {
    if (!id) return "—";
    const parts = id.split("_");
    if (parts.length === 2) {
      return `${parts[0]}_${"•".repeat(parts[1].length)}`;
    }
    // fallback for MongoDB _id style
    return `${id.substring(0, 6)}${"•".repeat(id.length - 6)}`;
  };

  const getProviderName = (provider?: string) => {
    if (!provider) return "SMTP Server";
    if (provider.toLowerCase() === "gmail") return "Gmail";
    return provider.charAt(0).toUpperCase() + provider.slice(1);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setOpenMenuId(null);
    showToast("Service ID copied", "success");
  };

  const handleSetDefault = async (serviceId: string) => {
    try {
      await updateMutation.mutateAsync({ id: serviceId, data: { isDefault: true } });
      showToast("Default service updated", "success");
      setOpenMenuId(null);
    } catch (error: any) {
      showToast(error.message || "Failed to set default", "error");
    }
  };

  return (
    <div className="flex flex-col gap-s-24 animate-fade-in w-full max-w-8xl">
      <div className="flex items-center">
        <Button
          onClick={() => setIsModalOpen(true)}
          icon={<Plus size={18} />}
          variant="primary"
          className="rounded-s-4"
        >
          Add New Service
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center p-s-32">
          <Loader2 className="animate-spin text-accent w-s-32 h-s-32" />
        </div>
      ) : services.length === 0 ? (
        <Card className="flex flex-col items-center justify-center p-s-48 text-center border-dashed border-border text-text-secondary">
          <p className="text-s-16 mb-s-16">No services configured yet.</p>
          <Button variant="outline" onClick={() => setIsModalOpen(true)}>
            Add your first service
          </Button>
        </Card>
      ) : (
        <div className="flex flex-col gap-s-16">
          {services.map((service) => {
            const resolvedId = (service as any)._id || service.id;
            return (
              <Card
                key={resolvedId}
                className="flex items-center justify-between p-s-16 bg-bg-card border-border hoverable"
              >
                <div className="flex items-center gap-s-24">
                  <div className="w-s-40 h-s-40 shrink-0 flex items-center justify-center bg-white rounded-s-8 p-s-8 shadow-sm">
                    {getProviderLogo(service.provider) ? (
                      <Image
                        src={getProviderLogo(service.provider)}
                        alt={service.provider}
                        width={24}
                        height={24}
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
                    <span className="text-s-16 font-semibold text-text-primary">
                      {service.label || getProviderName(service.provider)}
                    </span>
                    <span className="text-s-12 text-text-secondary">
                      Service ID:{" "}
                      <span className="font-bold text-text-primary font-mono tracking-wider">
                        {maskServiceId(
                          service.serviceId || service._id || service.id,
                        )}
                      </span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-s-32">
                  {service.isDefault === true && (
                    <Badge
                      variant="accent"
                      className="px-s-16 py-s-4 rounded-full text-s-10 tracking-widest uppercase font-bold"
                    >
                      DEFAULT
                    </Badge>
                  )}

                  <div className="flex items-center gap-s-8">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setEditingService(service)}
                      className="flex items-center justify-center w-s-32 h-s-32 rounded-s-4 border border-border text-text-secondary hover:bg-bg-hover hover:text-text-primary transition-colors cursor-pointer"
                    >
                      <Pencil size={14} />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={async () => {
                        console.log("resolvedId:", resolvedId); // ← add this
                        console.log("service:", service); // ← and this
                        const confirmed = await confirmToast(
                          "This action cannot be undone.",
                        );
                        console.log('confirmed:', confirmed);
                        if (!confirmed) return;

                        try {
                          await deleteMutation.mutateAsync(resolvedId);
                          showToast("Service deleted", "success");
                        } catch (error: any) {
                          showToast(
                            error.message || "Failed to delete",
                            "error",
                          );
                        }
                      }}
                      className="flex items-center justify-center w-s-32 h-s-32 rounded-s-4 border border-border text-text-secondary hover:bg-error/10 hover:text-error hover:border-error/20 transition-colors cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </Button>
                    <div className="relative">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuId(
                            openMenuId === resolvedId ? null : resolvedId,
                          );
                        }}
                        className="service-menu-trigger flex items-center justify-center w-s-32 h-s-32 rounded-s-4 border border-border text-text-secondary hover:bg-bg-hover hover:text-text-primary transition-colors cursor-pointer"
                      >
                        <MoreVertical size={14} />
                      </Button>

                      {openMenuId === service.id && (
                        <div className="absolute right-0 top-full mt-s-4 w-s-160 bg-bg-card border border-border rounded-s-8 shadow-xl z-20 overflow-hidden animate-in fade-in zoom-in duration-100 origin-top-right transition-all">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              copyToClipboard(resolvedId);
                            }}
                            className="w-full text-left px-s-16 py-s-10 text-s-13 text-text-primary hover:bg-bg-hover transition-colors font-medium border-b border-border/50 cursor-pointer"
                          >
                            Copy Service ID
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (!service.isDefault)
                                handleSetDefault(resolvedId);
                            }}
                            className={`w-full text-left px-s-16 py-s-10 text-s-13 transition-colors font-medium border-b border-border/50 ${service.isDefault ? "text-text-muted cursor-not-allowed opacity-50" : "text-text-primary hover:bg-bg-hover cursor-pointer"}`}
                          >
                            Set as Default
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenMenuId(null);
                              console.log("Testing service:", resolvedId);
                            }}
                            className="w-full text-left px-s-16 py-s-10 text-s-13 text-text-primary hover:bg-bg-hover transition-colors font-medium cursor-pointer"
                          >
                            Test Service
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      <AddServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={(service) => {
          setIsModalOpen(false);
          setConfiguringService(service);
        }}
      />

      <ConfigServiceModal
        isOpen={!!configuringService}
        onClose={() => setConfiguringService(null)}
        serviceDef={configuringService}
      />

      <EditServiceModal
        isOpen={!!editingService}
        onClose={() => setEditingService(null)}
        service={editingService}
      />
    </div>
  );
}
