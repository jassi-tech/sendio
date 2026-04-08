"use client";
import React, { useEffect } from "react";
import { X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: string;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  contentClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
  padded?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  maxWidth = "max-w-[560px]",
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  contentClassName = "",
  bodyClassName = "",
  footerClassName = "",
  padded = true,
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (closeOnEscape && event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose, closeOnEscape]);

  if (!isOpen || typeof document === "undefined") return null;

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[1000] bg-black/70 backdrop-blur-[2px] animate-fade-in" />
        <Dialog.Content
          className={`fixed left-1/2 top-1/2 z-[1001] w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] ${maxWidth} max-h-[88vh] -translate-x-1/2 -translate-y-1/2 animate-scale-in overflow-hidden rounded-[26px] border-2 bg-bg-base shadow-[0_18px_48px_-24px_rgba(0,0,0,0.8)] ${padded ? "p-s-24 sm:p-s-28" : ""} ${contentClassName}`}
          style={{ borderColor: "#212629" }}
          onEscapeKeyDown={(event) => {
            if (!closeOnEscape) event.preventDefault();
          }}
          onInteractOutside={(event) => {
            if (!closeOnOverlayClick) event.preventDefault();
          }}
        >
          <div className="flex items-center justify-between gap-s-12 mb-s-20 pb-s-14 border-b border-border/60">
            <Dialog.Title className="text-s-20 sm:text-s-22 font-semibold text-text-primary tracking-tight leading-tight">
              {title}
            </Dialog.Title>
            {showCloseButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="rounded-full p-s-4 text-text-secondary hover:bg-bg-elevated hover:text-text-primary transition-colors"
                icon={<X className="w-s-18 h-s-18" />}
              />
            )}
          </div>

          <div
            className={`overflow-y-auto pr-s-4 max-h-[calc(88vh-170px)] text-text-secondary ${bodyClassName}`}
          >
            {children}
          </div>

          {footer && (
            <div
              className={`mt-s-16 flex items-center justify-end gap-s-10 pt-s-14 border-t border-border/60 text-text-secondary ${footerClassName}`}
            >
              {footer}
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
