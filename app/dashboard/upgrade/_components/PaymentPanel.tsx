"use client";
import { useState } from "react";
import { Lock, ShieldCheck, CreditCard, Landmark, Globe, Check } from "lucide-react";

interface PaymentPanelProps {
  onPay: (method: "razorpay" | "manual") => void;
}

export function PaymentPanel({ onPay }: PaymentPanelProps) {
  const [method, setMethod] = useState<"razorpay" | "manual">("razorpay");

  return (
    <div className="flex flex-col h-full min-h-[400px]">
      <div className="flex flex-col items-center mb-s-32">
        <div className="w-s-56 h-s-56 bg-success/10 rounded-full flex items-center justify-center mb-s-16 shadow-sm border border-success/20">
          <ShieldCheck className="w-s-28 h-s-28 text-success" />
        </div>
        <h3 className="text-s-18 font-black text-text-primary mb-s-4 tracking-tight">
          Choose Payment Method
        </h3>
        <p className="text-s-13 text-text-secondary text-center max-w-s-300 leading-relaxed">
          Select how you'd like to complete your upgrade.
        </p>
      </div>

      {/* Method Selector */}
      <div className="space-y-s-16 mb-s-40">
        <button
          onClick={() => setMethod("razorpay")}
          className={`w-full flex items-center gap-s-16 p-s-16 rounded-s-12 border-2 transition-all text-left ${
            method === "razorpay"
              ? "border-accent bg-accent/5 shadow-sm"
              : "border-border/40 bg-bg-card/50 hover:border-border"
          }`}
        >
          <div className={`w-s-40 h-s-40 rounded-full flex items-center justify-center ${
            method === "razorpay" ? "bg-accent text-white" : "bg-bg-elevated text-text-muted"
          }`}>
            <CreditCard className="w-s-20 h-s-20" />
          </div>
          <div className="flex-1">
            <p className="text-s-14 font-bold text-text-primary">Razorpay (India)</p>
            <p className="text-s-12 text-text-secondary">Cards, UPI, Netbanking, Wallets</p>
          </div>
          {method === "razorpay" && (
            <div className="w-s-20 h-s-20 rounded-full bg-accent flex items-center justify-center">
              <Check className="w-s-12 h-s-12 text-white" />
            </div>
          )}
        </button>

        <button
          onClick={() => setMethod("manual")}
          className={`w-full flex items-center gap-s-16 p-s-16 rounded-s-12 border-2 transition-all text-left ${
            method === "manual"
              ? "border-accent bg-accent/5 shadow-sm"
              : "border-border/40 bg-bg-card/50 hover:border-border"
          }`}
        >
          <div className={`w-s-40 h-s-40 rounded-full flex items-center justify-center ${
            method === "manual" ? "bg-accent text-white" : "bg-bg-elevated text-text-muted"
          }`}>
            <Globe className="w-s-20 h-s-20" />
          </div>
          <div className="flex-1">
            <p className="text-s-14 font-bold text-text-primary">International / Manual</p>
            <p className="text-s-12 text-text-secondary">Bank Transfer, PayPal, Crypto</p>
          </div>
          {method === "manual" && (
            <div className="w-s-20 h-s-20 rounded-full bg-accent flex items-center justify-center">
              <Check className="w-s-12 h-s-12 text-white" />
            </div>
          )}
        </button>
      </div>

      {/* Action Section */}
      <div className="mt-auto pt-s-32 border-t border-border/40">
        {method === "razorpay" ? (
          <div className="w-full">
            <button
              onClick={() => onPay("razorpay")}
              className="group relative w-full flex items-center justify-center gap-s-10 py-s-16 bg-accent text-white rounded-s-8 font-bold text-s-15 transition-all outline-none focus:ring-4 focus:ring-accent/30 hover:bg-accent/90 hover:shadow-[0_0_20px_rgba(108,99,255,0.4)] overflow-hidden"
            >
              <Lock className="w-s-18 h-s-18 relative z-10" />
              <span className="relative z-10">Pay Securely with Razorpay</span>
            </button>
            <p className="text-s-11 text-text-muted text-center mt-s-16 flex items-center justify-center gap-s-8">
              <Check className="w-s-12 h-s-12 text-success" />
              Instant activation after payment
            </p>
          </div>
        ) : (
          <div className="w-full">
            <div className="bg-bg-elevated/50 p-s-16 rounded-s-12 mb-s-24 border border-border/40">
              <div className="flex items-start gap-s-12 mb-s-12">
                <Landmark className="w-s-18 h-s-18 text-accent mt-s-2" />
                <p className="text-s-13 text-text-secondary leading-relaxed">
                  For international users or bank transfers, please request a manual invoice. Our team will contact you within 
                  <span className="text-text-primary font-semibold"> 2-4 hours</span> with payment instructions.
                </p>
              </div>
            </div>
            <button
              onClick={() => onPay("manual")}
              className="w-full flex items-center justify-center gap-s-10 py-s-16 bg-bg-elevated border-2 border-border text-text-primary rounded-s-8 font-bold text-s-15 transition-all hover:border-accent hover:text-accent"
            >
              Request Manual Payment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
