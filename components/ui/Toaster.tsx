"use client";

import React from "react";
import { useToast } from "@/context/ToastContext";
import {
  X,
  CheckCircle,
  AlertCircle,
  Info,
  AlertTriangle,
  Trash2,
} from "lucide-react";

const icons = {
  success: <CheckCircle className="text-success w-s-20 h-s-20" />,
  error: <AlertCircle className="text-error w-s-20 h-s-20" />,
  info: <Info className="text-info w-s-20 h-s-20" />,
  warning: <AlertTriangle className="text-warning w-s-20 h-s-20" />,
};

const colors = {
  success: "border-success/20 bg-success/5",
  error: "border-error/20 bg-error/5",
  info: "border-info/20 bg-info/5",
  warning: "border-warning/20 bg-warning/5",
};

const progressColors = {
  success: "bg-success",
  error: "bg-error",
  info: "bg-info",
  warning: "bg-warning",
};

export function Toaster() {
  const { toasts, removeToast, confirmState, setConfirmState } = useToast(); // ← add confirmState

  return (
    <>
      {/* Regular Toasts */}
      {toasts.length > 0 && (
        <div className="fixed top-s-24 right-s-24 z-[9999] flex flex-col items-end gap-s-12 pointer-events-none">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`
                pointer-events-auto relative flex flex-col
                rounded-s-16 border glass shadow-2xl overflow-hidden
                min-w-s-320 max-w-s-480
                animate-in fade-in slide-in-from-right-4 duration-300
                ${colors[toast.type]}
              `}
            >
              <div className="flex items-center gap-s-16 p-s-16 pr-s-20">
                <div className="flex-shrink-0">{icons[toast.type]}</div>
                <div className="flex-1 min-w-0 py-s-4">
                  <p className="text-s-16 font-semibold text-text-primary leading-tight tracking-tight">
                    {toast.message}
                  </p>
                </div>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="p-s-4 rounded-full text-text-muted hover:text-text-primary hover:bg-white/10 transition-colors shrink-0"
                >
                  <X className="w-s-16 h-s-16" />
                </button>
              </div>
              <div className="h-s-3 w-full bg-white/5 overflow-hidden">
                <div
                  className={`h-full ${progressColors[toast.type]} opacity-60`}
                  style={{
                    animationName: "progress",
                    animationDuration: "4000ms",
                    animationTimingFunction: "linear",
                    animationFillMode: "forwards",
                  }}
                />
              </div>
            </div>
          ))}
          <style jsx global>{`
            @keyframes progress {
              from {
                width: 0%;
              }
              to {
                width: 100%;
              }
            }
          `}</style>
        </div>
      )}

      {/* Confirm Toast*/}
      {confirmState && (
        <div className="fixed top-s-24 right-s-24 z-[9999] pointer-events-auto">
          <div
            className={`
      relative flex flex-col
      rounded-s-16 border glass shadow-2xl overflow-hidden
      min-w-s-320 max-w-s-480
      animate-in fade-in slide-in-from-right-4 duration-300
      border-error/20 bg-error/5
    `}
          >
            <div className="flex items-center gap-s-16 p-s-16 pr-s-20">
              <div className="flex-shrink-0">
                <Trash2 className="text-error w-s-20 h-s-20" />{" "}
              </div>

              <div className="flex-1 min-w-0 py-s-4">
                <p className="text-s-16 font-semibold text-text-primary leading-tight tracking-tight">
                  Delete Service?
                </p>
                <p className="text-s-12 text-text-secondary mt-s-2">
                  {confirmState.message}
                </p>
              </div>

              <button
                onClick={() => {
                  confirmState.resolve(false);
                  setConfirmState(null);
                }}
                className="p-s-4 rounded-full text-text-muted hover:text-text-primary hover:bg-white/10 transition-colors shrink-0"
              >
                <X className="w-s-16 h-s-16" />
              </button>
            </div>

            <div className="flex items-center justify-end gap-s-8 px-s-16 pb-s-12">
              <button
                onClick={() => {
                  confirmState.resolve(false);
                  setConfirmState(null);
                }}
                className="px-s-12 py-s-6 rounded-s-8 text-s-12 font-medium 
                     text-text-secondary hover:bg-white/10 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  confirmState.resolve(true);
                  setConfirmState(null);
                }}
                className="px-s-12 py-s-6 rounded-s-8 text-s-12 font-medium 
                     bg-error text-white hover:bg-error/90 transition-colors cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
            <div className="h-s-3 w-full bg-error/20">
              <div className="h-full w-full bg-error opacity-60" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
