"use client";
import React, { useEffect } from "react";
import { X } from "lucide-react";
import { Card } from "./Card";
import { Button } from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  maxWidth = "max-w-s-500",
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-s-16">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Content */}
      <Card
        variant="elevated"
        padded
        className={`relative z-10 w-full ${maxWidth} animate-scale-in shadow-2xl border border-border/50`}
      >
        <div className="flex items-center justify-between mb-s-24 pb-s-16 border-b border-border/40">
          <h2 className="text-s-20 font-black text-text-primary tracking-tight">
            {title}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-s-4 hover:bg-bg-elevated rounded-full"
            icon={<X className="w-s-20 h-s-20 text-text-muted" />}
          />
        </div>

        <div className="mb-s-32">{children}</div>

        {footer && (
          <div className="flex items-center justify-end gap-s-12 pt-s-16 border-t border-border/40">
            {footer}
          </div>
        )}
      </Card>
    </div>
  );
}
