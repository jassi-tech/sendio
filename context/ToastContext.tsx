"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { Trash2 } from "lucide-react";

import { Toast, ConfirmState, ToastContextType } from "@/lib/interface";

type ToastType = "success" | "error" | "info" | "warning";

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [confirmState, setConfirmState] = useState<ConfirmState | null>(null);

  // Remove toast
  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  // Show toast
  const showToast = useCallback(
    (message: string, type: ToastType = "info") => {
      const id = Math.random().toString(36).substring(2, 9);

      setToasts((prev) => [...prev, { id, message, type }]);

      setTimeout(() => {
        removeToast(id);
      }, 4000);
    },
    [removeToast],
  );

  // Confirm toast (Promise-based)
  const confirmToast = useCallback((message: string): Promise<boolean> => {
    return new Promise((resolve) => {
      console.log("confirmState being set:", message);
      setConfirmState({ message, resolve });
    });
  }, []);

  return (
    <ToastContext.Provider
      value={{
        showToast,
        removeToast,
        confirmToast,
        toasts,
        confirmState,
        setConfirmState,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
}
