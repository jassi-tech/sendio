"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Server,
  FileCode2,
  Key,
  ScrollText,
  LogOut,
  Mail,
  Menu,
  X,
  Zap,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { logsApi } from "@/lib/api";
import { ChatWidget } from "@/components/chatbot/ChatWidget";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Overview" },
  { href: "/dashboard/services", icon: Server, label: "Services" },
  { href: "/dashboard/senders", icon: Server, label: "Senders" },
  { href: "/dashboard/templates", icon: FileCode2, label: "Templates" },
  { href: "/dashboard/logs", icon: ScrollText, label: "Logs" },
  { href: "/dashboard/account", icon: Key, label: "Account" }, // Reusing Key icon for now as in reference image or User icon if available
];

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [sentCount, setSentCount] = useState<number | null>(null);

  useEffect(() => {
    if (user) {
      logsApi
        .list({ limit: 1, status: "sent" })
        .then((res: any) => {
          setSentCount(res.pagination?.total ?? 0);
        })
        .catch(() => setSentCount(0));
    }
  }, [user]);

  const totalQuota = 200;
  const requestsLeft =
    sentCount !== null ? Math.max(0, totalQuota - sentCount) : "...";

  return (
    <>
      {/* Sidebar Top / Logo */}
      <div className="p-s-32 border-b border-border flex items-center gap-s-16">
        <div className="w-s-48 h-s-48 bg-gradient-to-br from-accent to-accent-dim rounded-s-12 flex items-center justify-center shadow-accent-glow">
          <Mail className="w-s-24 h-s-24 text-white" />
        </div>
        <span className="text-s-24 font-black text-text-primary tracking-tight">
          MailFlow
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-s-16 space-y-s-4">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={() => onClose?.()}
              className={`flex items-center gap-s-16 p-s-16 rounded-s-12 text-s-16 transition-all no-underline font-medium ${
                isActive
                  ? "text-accent bg-accent/10 shadow-[inset_s-2_0_0_0_currentColor]"
                  : "text-text-secondary hover:bg-bg-hover hover:text-text-primary"
              }`}
            >
              <Icon className="w-s-20 h-s-20" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer / User Profile */}
      <div className="p-s-20 border-t border-border bg-bg-card/50">
        <div className="flex items-center gap-s-12 mb-s-20">
          <div className="w-s-36 h-s-36 bg-accent/10 rounded-full flex items-center justify-center border border-accent/20">
            <Zap className="w-s-18 h-s-18 text-accent shrink-0" />
          </div>
          <div className="min-w-0">
            <div className="text-s-13 font-bold text-text-primary truncate">
              Requests Left:{" "}
              <span className="text-accent">
                {requestsLeft.toLocaleString()}
              </span>
            </div>
            <div className="text-s-11 text-text-muted truncate">
              {user?.email}
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="w-full hover:border-error hover:text-error hover:bg-error/5"
          onClick={logout}
          icon={<LogOut className="w-s-14 h-s-14" />}
        >
          Sign out
        </Button>
      </div>
    </>
  );
}

function DashboardShell({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.replace("/auth");
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-bg-base flex items-center justify-center">
        <div className="animate-spin w-s-40 h-s-40 border-s-3 border-border border-t-accent rounded-full" />
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-bg-base text-text-primary">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-s-280 bg-bg-card border-r border-border flex-col z-20">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <aside
        className={`
        fixed top-0 left-0 bottom-0 h-full w-s-280 bg-bg-card z-50 lg:hidden transform transition-transform duration-300 ease-out flex flex-col
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="absolute top-s-16 right-s-16">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-s-8 text-text-secondary hover:text-text-primary"
          >
            <X className="w-s-24 h-s-24" />
          </Button>
        </div>
        <SidebarContent onClose={() => setIsMobileMenuOpen(false)} />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Top bar (for breadcrumbs or mobile toggle) */}
        <header className="h-s-72 border-b border-border bg-bg-base/80 backdrop-blur-md sticky top-0 z-10 px-s-20 flex items-center lg:px-s-40">
          <Button
            variant="ghost"
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-s-10 -ml-s-10 text-text-secondary hover:text-text-primary transition-colors"
          >
            <Menu className="w-s-24 h-s-24" />
          </Button>

          <div className="flex-1 flex items-center justify-between ml-s-16 lg:ml-0">
            <div className="flex items-center gap-s-8 text-s-20 font-bold">
              <span className="text-text-secondary">Welcome,</span>
              <span className="text-accent">
                {user?.email?.split("@")[0] || "User"}
              </span>
            </div>

            <div className="flex items-center gap-s-24">
              <Link
                href="/docs"
                target="_blank"
                className="text-s-20 font-medium text-text-secondary hover:text-accent transition-colors no-underline flex items-center gap-s-6"
              >
                Doc
              </Link>
              <Link
                href="/support"
                target="_blank"
                className="text-s-20 font-medium text-text-secondary hover:text-accent transition-colors no-underline flex items-center gap-s-6"
              >
                Support
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-s-20 md:p-s-32 lg:p-s-40">
          <div className="max-w-s-1200 mx-auto">{children}</div>
        </main>
      </div>
      <ChatWidget />
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}
