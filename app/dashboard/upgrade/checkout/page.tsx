"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { plans, getPrice } from "@/lib/pricing";
import { OrderSummary } from "../_components/OrderSummary";
import { DetailsForm } from "../_components/DetailsForm";
import { PaymentPanel } from "../_components/PaymentPanel";
import { useRazorpay } from "react-razorpay";
import { paymentApi } from "@/lib/api";

const GST_RATE = 0.18;

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const { Razorpay } = useRazorpay();

  const planId = searchParams.get("plan") || "";
  const billing = searchParams.get("billing") || "monthly";
  const isYearly = billing === "yearly";

  const selectedPlan = plans.find((p) => p.id === planId);

  const [checkoutTab, setCheckoutTab] = useState<"details" | "payment">(
    "details",
  );
  const [formData, setFormData] = useState({
    email: "",
    country: "",
    zipcode: "",
    cardName: "",
  });
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<any>(null);
  const [showPromoInput, setShowPromoInput] = useState(false);

  useEffect(() => {
    if (user?.email && !formData.email) {
      setFormData((prev) => ({ ...prev, email: user.email }));
    }
  }, [user]);

  if (!selectedPlan) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-bg-base">
        <div className="text-center">
          <p className="text-text-secondary mb-s-16">Plan not found.</p>
          <button
            onClick={() => router.push("/dashboard/upgrade")}
            className="text-accent font-semibold hover:underline"
          >
            ← Back to Plans
          </button>
        </div>
      </div>
    );
  }

  const basePrice = getPrice(selectedPlan.price, isYearly) || 0;
  const discount = appliedPromo
    ? appliedPromo.type === "percentage"
      ? basePrice * (appliedPromo.value / 100)
      : appliedPromo.value
    : 0;
  const discountedBase = Math.max(0, basePrice - discount);
  const gstAmount = discountedBase * GST_RATE;
  const finalPrice = discountedBase + gstAmount;

  const handlePay = async (paymentMethod: "razorpay" | "manual" = "razorpay") => {
    try {
      const orderConfig = await paymentApi.createOrder(
        selectedPlan.name,
        paymentMethod,
      );

      if (paymentMethod === "manual") {
        alert(
          "Manual payment request submitted! Our team will contact you shortly.",
        );
        router.push("/dashboard?payment=pending");
        return;
      }

      const rzp = new Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "dummy_key_id",
        amount: orderConfig.amount,
        currency: orderConfig.currency as "INR",
        name: "MailX",
        description: `Upgrade to ${selectedPlan.name}`,
        order_id: orderConfig.orderId as string,
        handler: async (response: any) => {
          try {
            await paymentApi.verify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              billingEmail: formData.email,
              billingCountry: formData.country,
              billingZip: formData.zipcode,
            });
            router.push("/dashboard?payment=success");
          } catch (err: any) {
            alert(err.message || "Verification Failed");
          }
        },
        prefill: {
          name: formData.cardName || user?.name || "",
          email: formData.email,
        },
        theme: { color: "#6c63ff" },
      });
      rzp.on("payment.failed", (res: any) => alert(res.error.description));
      rzp.open();
    } catch (err: any) {
      alert(err.message || "Failed to initialize payment");
    }
  };

  return (
    <div className="flex flex-col">
      {/* Top Bar */}
      <header className="border-b border-border/40 px-s-40 py-s-20 flex items-center gap-s-16 bg-bg-card/50 backdrop-blur-sm">
        <button
          onClick={() => router.push("/dashboard/upgrade")}
          className="flex items-center gap-s-8 text-accent hover:text-accent/80 transition-colors font-semibold text-s-14"
        >
          <ArrowLeft className="w-s-16 h-s-16" />
          Back to Plans
        </button>
        <div className="h-s-20 w-px bg-border/40" />
        <span className="text-s-14 text-text-secondary">Checkout</span>
        <span className="ml-auto text-s-13 font-semibold text-text-primary">
          {selectedPlan.name} Plan · {isYearly ? "Yearly" : "Monthly"}
        </span>
      </header>

      {/* Main Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 max-w-s-1100 mx-auto w-full py-s-32 px-s-24 gap-s-48 lg:gap-s-80">
        {/* Left: Order Summary */}
        <div className="order-2 lg:order-1">
          <OrderSummary
            selectedPlan={selectedPlan}
            isYearly={isYearly}
            discountedBase={discountedBase}
            gstAmount={gstAmount}
            finalPrice={finalPrice}
            discount={discount}
            appliedPromo={appliedPromo}
            showPromoInput={showPromoInput}
            promoCode={promoCode}
            setPromoCode={setPromoCode}
            setShowPromoInput={setShowPromoInput}
            setAppliedPromo={setAppliedPromo}
          />
        </div>

        {/* Right: Form Steps */}
        <div className="order-1 lg:order-2">
          {/* Step Tabs */}
          <div className="flex gap-s-24 mb-s-48 border-b border-border/40 pb-s-20">
            <div
              onClick={() => setCheckoutTab("details")}
              className={`text-s-14 font-semibold pb-s-8 transition-colors cursor-pointer ${
                checkoutTab === "details"
                  ? "text-accent border-b-2 border-accent"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              1. Your Details
            </div>
            <div
              className={`text-s-14 font-semibold pb-s-8 transition-colors ${
                checkoutTab === "payment"
                  ? "text-accent border-b-2 border-accent"
                  : "text-text-secondary opacity-50 select-none"
              }`}
            >
              2. Payment
            </div>
          </div>

          {checkoutTab === "details" && (
            <DetailsForm
              formData={formData}
              setFormData={setFormData}
              onContinue={() => {
                if (formData.email && formData.country && formData.zipcode) {
                  setCheckoutTab("payment");
                } else {
                  alert("Please fill in all required billing details first.");
                }
              }}
            />
          )}

          {checkoutTab === "payment" && <PaymentPanel onPay={handlePay} />}
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-bg-base flex items-center justify-center">
          <div className="w-s-32 h-s-32 rounded-full border-2 border-accent border-t-transparent animate-spin" />
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
