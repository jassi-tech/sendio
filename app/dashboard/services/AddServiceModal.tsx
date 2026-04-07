"use client";

import React, { useEffect, useState } from "react";
import { X, HelpCircle, Loader2 } from "lucide-react";
import { ServiceDef } from "@/lib/api";
import { useServices } from "@/hooks/useServices";
import { Button } from "@/components/ui/Button";
import type { AddServiceModalProps } from "@/lib/interface";
import Image from "next/image";

export function AddServiceModal({
  isOpen,
  onClose,
  onSelect,
}: AddServiceModalProps) {
  const { data: services = [], isLoading: loading } = useServices();

  if (!isOpen) return null;

  const personalServices = services.filter((s) => s.category === "personal");
  const transactionalServices = services.filter(
    (s) => s.category === "transactional",
  );

  const getProviderLogo = (service: ServiceDef) => {
    // Only use explicit logoUrl — never fall back to a local PNG that may not exist
    return service.logoUrl || "";
  };

  const ServiceCard = ({ service }: { service: ServiceDef }) => (
    <div
      className={`relative flex flex-col items-center justify-center p-s-16 bg-bg-card border border-border rounded-s-8 transition-all overflow-hidden ${
        service.isSelectable
          ? "cursor-pointer hover:border-accent hover:bg-bg-hover hover:-translate-y-s-2 hover:shadow-accent-glow group"
          : "cursor-not-allowed"
      }`}
      onClick={() => {
        if (service.isSelectable) {
          onSelect(service);
        }
      }}
    >
      <div
        className={`w-s-40 h-s-40 mb-s-8 flex items-center justify-center bg-white rounded-s-8 p-s-4 shadow-[0_0_10px_rgba(0,0,0,0.1)] transition-transform ${service.isSelectable ? "group-hover:scale-110" : "opacity-50 grayscale"}`}
      >
        {service.id === "smtp" ? (
          <div className="text-[#5c5c78] flex flex-col items-center">
            <span className="font-bold text-s-12">SMTP</span>
          </div>
        ) : service.logoUrl ? (
          <img
            src={service.logoUrl}
            alt={service.name}
            className="w-full h-full object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null; // Prevent infinite loop
              target.src =
                'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%235c5c78" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>';
            }}
          />
        ) : (
          <div className="text-[#5c5c78] flex flex-col items-center">
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
          </div>
        )}
      </div>
      <span
        className={`text-s-12 font-medium text-center whitespace-nowrap ${service.isSelectable ? "text-text-primary" : "text-text-secondary line-through"}`}
      >
        {service.name}
      </span>

      {!service.isSelectable && (
        <div className="absolute inset-x-0 bottom-0 bg-bg-elevated/90 text-[10px] font-bold text-text-secondary text-center py-s-2 border-t border-border-dim tracking-wider uppercase">
          Coming Soon
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-s-16 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-bg-base rounded-s-8 shadow-2xl w-full max-w-3xl overflow-hidden border border-border animate-slide-up flex flex-col max-h-[90vh]">
        {/* Header - Styled like the image with blue but adapted to FMDS context via accent */}
        <div className="flex items-center justify-between p-s-16 bg-[#4f6ebf] text-white">
          <h2 className="text-s-16 font-semibold">Select Service</h2>
          <Button
            size="sm"
            variant="ghost"
            onClick={onClose}
            className="p-s-4 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X size={20} />
          </Button>
        </div>

        {/* Body */}
        <div className="p-s-24 overflow-y-auto flex-1 custom-scrollbar">
          {loading ? (
            <div className="flex justify-center flex-col items-center gap-s-16 p-s-48">
              <Loader2 className="animate-spin text-accent w-s-32 h-s-32" />
              <span className="text-text-secondary text-s-14">
                Loading services...
              </span>
            </div>
          ) : (
            <div className="flex flex-col gap-s-32">
              {/* Personal Services */}
              <div className="flex flex-col gap-s-16">
                <div className="flex items-center gap-s-8 text-text-secondary">
                  <h3 className="text-s-14 font-semibold text-text-primary">
                    Personal Services
                  </h3>
                  <HelpCircle
                    size={14}
                    className="opacity-70 cursor-help hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-s-12">
                  {personalServices.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              </div>

              {/* Transactional Services */}
              <div className="flex flex-col gap-s-16">
                <div className="flex items-center gap-s-8 text-text-secondary">
                  <h3 className="text-s-14 font-semibold text-text-primary">
                    Transactional Services
                  </h3>
                  <HelpCircle
                    size={14}
                    className="opacity-70 cursor-help hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-s-12">
                  {transactionalServices.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end p-s-16 border-t border-border bg-bg-card">
          <Button
            variant="outline"
            onClick={onClose}
            className="text-text-secondary bg-transparent hover:bg-bg-hover hover:text-text-primary border border-border"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
