"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  useDeleteAccount,
  useRequestEmailChange,
  useVerifyEmailChange,
  useSubscription,
  useUpgradePlan,
  useCancelSubscription,
} from "@/hooks/useAuth";
import { useToast } from "@/context/ToastContext";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import {
  Trash2,
  CheckCircle,
  EyeOff,
  Eye,
  Check,
  X,
  Zap,
  Mail,
  ArrowRight,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { plans } from "@/lib/pricing";

function EmailChangeModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { showToast } = useToast();
  const [step, setStep] = useState<"email" | "otp">("email");
  const [newEmail, setNewEmail] = useState("");
  const [otp, setOtp] = useState("");

  const requestMutation = useRequestEmailChange();
  const verifyMutation = useVerifyEmailChange();

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail) return;
    try {
      await requestMutation.mutateAsync(newEmail);
      showToast("Verification code sent to your new email", "success");
      setStep("otp");
    } catch (err: any) {
      showToast(err.message || "Failed to request email change", "error");
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return;
    try {
      await verifyMutation.mutateAsync(otp);
      showToast("Email updated successfully", "success");
      onClose();
      // Reset state for next time
      setStep("email");
      setNewEmail("");
      setOtp("");
    } catch (err: any) {
      showToast(err.message || "Verification failed", "error");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={step === "email" ? "Change Email Address" : "Verify Your Email"}
    >
      {step === "email" ? (
        <form onSubmit={handleRequest} className="space-y-s-20">
          <p className="text-s-13 text-text-secondary leading-relaxed">
            Enter the new email address you'd like to use. We'll send a 6-digit
            verification code to this address.
          </p>
          <div className="space-y-s-8">
            <label className="text-s-12 font-bold text-text-secondary uppercase tracking-wider">
              New Email Address
            </label>
            <Input
              type="email"
              placeholder="new-email@example.com"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              required
              autoFocus
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            className="w-full h-s-48"
            loading={requestMutation.isPending}
            icon={<ArrowRight className="w-s-18 h-s-18" />}
          >
            Send Verification Code
          </Button>
        </form>
      ) : (
        <form onSubmit={handleVerify} className="space-y-s-20">
          <div className="flex flex-col items-center text-center gap-s-16 mb-s-8">
            <div className="w-s-56 h-s-56 rounded-full bg-accent/10 flex items-center justify-center text-accent">
              <ShieldCheck className="w-s-28 h-s-28" />
            </div>
            <div>
              <p className="text-s-13 text-text-secondary">
                We've sent a 6-digit code to{" "}
                <span className="font-bold text-text-primary px-s-4 py-s-1 bg-bg-elevated rounded-s-4 border border-border/50">
                  {newEmail}
                </span>
              </p>
            </div>
          </div>
          <div className="space-y-s-8">
            <label className="text-s-12 font-bold text-text-secondary uppercase tracking-wider block text-center">
              Verification Code
            </label>
            <Input
              placeholder="000000"
              className="text-center text-s-24 font-bold tracking-[0.5em] h-s-64"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              required
              autoFocus
            />
          </div>
          <div className="flex flex-col gap-s-12">
            <Button
              type="submit"
              variant="primary"
              className="w-full h-s-48"
              loading={verifyMutation.isPending}
              icon={<CheckCircle className="w-s-18 h-s-18" />}
            >
              Verify & Update Email
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="text-text-muted hover:text-text-primary"
              onClick={() => setStep("email")}
            >
              Back to change email
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}

export function GeneralTab() {
  const { showToast } = useToast();
  const { user, logout } = useAuth();
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  const deleteMutation = useDeleteAccount();

  const router = useRouter();

  if (!user) return null;

  const handleDeleteAccount = async () => {
    if (
      !confirm(
        "Are you sure you want to delete your account? This action cannot be undone.",
      )
    )
      return;
    try {
      await deleteMutation.mutateAsync();
      showToast("Account deleted successfully", "success");
      logout();
    } catch (err: any) {
      showToast(err.message || "Failed to delete account", "error");
    }
  };

  return (
    <div className="space-y-s-32">
      {/* Notifications */}
      <Card variant="solid">
        <h3 className="text-s-16 font-bold mb-s-16 tracking-tight">
          Notifications
        </h3>
        <p className="text-s-13 text-text-secondary mb-s-24">
          All system notifications will be sent to the email address below
        </p>

        <div className="space-y-s-20 max-w-s-500">
          <div>
            <label className="block text-s-12 text-text-secondary mb-s-8 font-medium">
              Email <span className="text-error">*</span>
            </label>
            <Input
              value={user.email}
              readOnly
              className="bg-bg-base/50 text-text-muted"
            />
          </div>
          <Button
            variant="secondary"
            size="sm"
            icon={<CheckCircle className="w-s-14 h-s-14" />}
            onClick={() => setIsEmailModalOpen(true)}
          >
            Change
          </Button>
        </div>
      </Card>

      <EmailChangeModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
      />

      {/* Delete Account */}
      <Card variant="solid" className="border-error/20">
        <h3 className="text-s-16 font-bold mb-s-16 tracking-tight">
          Delete Account
        </h3>
        <p className="text-s-13 text-text-secondary mb-s-16">
          Before you go...
        </p>
        <ul className="list-disc list-inside text-s-13 text-text-secondary space-y-s-8 mb-s-24">
          <li>
            All your data including **API keys, templates, SMTP configs, and
            logs** will be permanently deleted.
          </li>
          <li>
            You will not be able to create a new account with this email for a
            short period (cooldown).
          </li>
          <li>
            If you have problems with integration, please contact support, we
            will help you.
          </li>
          <li>
            If you are interested in receiving newsletters from us, do not
            delete your account.
          </li>
        </ul>
        <Button
          variant="danger"
          size="sm"
          icon={<Trash2 className="w-s-14 h-s-14" />}
          onClick={handleDeleteAccount}
          loading={deleteMutation.isPending}
        >
          Delete My Account
        </Button>
      </Card>
    </div>
  );
}

export function SubscriptionTab() {
  const { showToast } = useToast();
  const { data: sub, isLoading, error } = useSubscription();
  const router = useRouter();
  const cancelMutation = useCancelSubscription();

  if (isLoading) {
    return (
      <Card variant="solid" className="flex items-center justify-center p-s-64">
        <Loader2 className="w-s-24 h-s-24 animate-spin text-accent" />
      </Card>
    );
  }

  if (error || !sub) {
    return (
      <Card variant="solid" className="p-s-32 text-center">
        <p className="text-error mb-s-16">
          Failed to load subscription details
        </p>
        <Button variant="secondary" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </Card>
    );
  }

  const handleUpgrade = () => {
    router.push("/dashboard/upgrade");
  };

  const handleCancel = async () => {
    if (
      !confirm(
        "Are you sure you want to cancel your subscription? You will be moved to the Free plan.",
      )
    )
      return;
    try {
      await cancelMutation.mutateAsync();
      showToast("Subscription cancelled", "success");
    } catch (err: any) {
      showToast(err.message || "Failed to cancel subscription", "error");
    }
  };

  return (
    <Card variant="solid">
      <div className="flex items-start justify-between mb-s-24">
        <div>
          <h3 className="text-s-16 font-bold mb-s-4 tracking-tight">
            Subscription Details
          </h3>
          <p className="text-s-13 text-text-secondary">
            Manage your billing and plan details
          </p>
        </div>
        <div
          className={`px-s-12 py-s-4 rounded-full text-s-11 font-bold uppercase tracking-wider ${
            sub.plan.toLowerCase() === "free"
              ? "bg-bg-elevated text-text-muted"
              : "bg-accent/20 text-accent border border-accent/30"
          }`}
        >
          {sub.plan}
        </div>
      </div>

      <div className="space-y-s-20 text-s-14 max-w-s-500 mb-s-32">
        <div className="grid grid-cols-[1fr_2fr] gap-s-16 border-b border-border/40 pb-s-12">
          <span className="text-text-secondary">Current plan:</span>
          <span className="font-semibold text-text-primary">
            {sub.plan}
            <span className="text-text-muted font-normal ml-s-8">
              {sub.plan.toLowerCase() === "free"
                ? "/ Lifetime Free"
                : "/ Active Subscription"}
            </span>
          </span>
        </div>
        <div className="grid grid-cols-[1fr_2fr] gap-s-16 border-b border-border/40 pb-s-12">
          <span className="text-text-secondary">Monthly quota:</span>
          <span className="font-semibold text-text-primary">
            {sub.monthlyQuota}
          </span>
        </div>
        <div className="grid grid-cols-[1fr_2fr] gap-s-16 border-b border-border/40 pb-s-12">
          <span className="text-text-secondary">Usage status:</span>
          <div className="flex flex-col gap-s-8">
            <span className="font-semibold text-text-primary">
              {sub.remainingPercentage}% remaining
            </span>
            <div className="w-full h-s-6 bg-bg-elevated rounded-full overflow-hidden">
              <div
                className={`h-full ${sub.remainingPercentage < 10 ? "bg-error" : "bg-success"}`}
                style={{ width: `${sub.remainingPercentage}%` }}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-[1fr_2fr] gap-s-16 pb-s-12">
          <span className="text-text-secondary">Included features:</span>
          <div className="flex flex-wrap gap-s-6">
            {sub.includedFeatures.map((f: string, i: number) => (
              <span
                key={i}
                className="text-s-11 bg-bg-card border border-border px-s-8 py-s-2 rounded-md text-text-secondary"
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-s-12">
        <Button
          variant="primary"
          size="sm"
          icon={<Zap className="w-s-14 h-s-14" />}
          onClick={handleUpgrade}
        >
          {sub.plan.toLowerCase() === "free" ? "Upgrade Plan" : "Change Plan"}
        </Button>
        {sub.plan.toLowerCase() !== "free" && (
          <Button
            variant="ghost"
            size="sm"
            className="text-text-muted hover:text-error hover:bg-error/5 border border-transparent hover:border-error/20"
            onClick={handleCancel}
            loading={cancelMutation.isPending}
          >
            Cancel Subscription
          </Button>
        )}
      </div>
    </Card>
  );
}

export function InvoicesTab() {
  return (
    <Card variant="solid" className="min-h-s-200 flex flex-col">
      <h3 className="text-s-16 font-bold mb-s-64 tracking-tight">
        Billing History
      </h3>

      <div className="flex-1 flex items-center justify-center text-s-14 text-text-muted">
        Your invoices will appear here
      </div>
    </Card>
  );
}

export function SecurityTab() {
  return (
    <div className="space-y-s-32">
      {/* Domains Restriction */}
      <Card variant="solid">
        <h3 className="text-s-16 font-bold mb-s-16 tracking-tight">Domains</h3>
        <p className="text-s-13 text-text-secondary mb-s-24">
          Your requests are restricted to the domains listed below
        </p>

        <div className="max-w-s-800 mb-s-24">
          <label className="block text-s-12 text-text-secondary mb-s-8 font-medium">
            Domain <span className="text-error">*</span>
          </label>
          <div className="flex">
            <Input
              placeholder="https://my-site.com"
              className="rounded-e-none border-r-0"
            />
            <div className="flex items-center justify-center px-s-16 bg-bg-elevated border border-border border-l-0 rounded-e-s-8 cursor-pointer hover:bg-bg-hover transition-colors text-text-muted">
              +
            </div>
          </div>
          <p className="text-s-11 text-text-muted mt-s-6">
            Domain includes schema, host and port if present. Press Enter to add
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          icon={<CheckCircle className="w-s-14 h-s-14" />}
        >
          Save Changes
        </Button>
      </Card>

      {/* API Settings */}
      <Card variant="solid">
        <h3 className="text-s-16 font-bold mb-s-24 tracking-tight">
          API Settings
        </h3>

        <div className="space-y-s-12 mb-s-24 text-s-14">
          <label className="flex items-center gap-s-12 cursor-pointer">
            <input
              type="checkbox"
              className="w-s-16 h-s-16 rounded-s-4 border-border bg-bg-elevated accent-accent text-accent focus:ring-accent"
              defaultChecked
            />
            <span className="text-text-primary">
              Allow EmailJS API for non-browser applications.
            </span>
            <div className="w-s-14 h-s-14 rounded-full border border-text-muted text-text-muted flex items-center justify-center text-[10px] cursor-help">
              ?
            </div>
          </label>

          <label className="flex items-center gap-s-12 cursor-pointer">
            <input
              type="checkbox"
              className="w-s-16 h-s-16 rounded-s-4 border-border bg-bg-elevated accent-accent text-accent focus:ring-accent"
              defaultChecked
            />
            <span className="text-text-primary">
              Use Private Key (recommended)
            </span>
            <div className="w-s-14 h-s-14 rounded-full border border-text-muted text-text-muted flex items-center justify-center text-[10px] cursor-help">
              ?
            </div>
          </label>
        </div>

        <Button
          variant="secondary"
          size="sm"
          icon={<CheckCircle className="w-s-14 h-s-14" />}
        >
          Save Changes
        </Button>
      </Card>
    </div>
  );
}
