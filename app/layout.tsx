import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ServiceProvider } from "@/context/ServiceContext";

export const metadata: Metadata = {
  title: { default: "Sendio", template: "%s | Sendio" },
  description:
    "User-owned SMTP email platform – send transactional emails through your own credentials with Sendio.",
  icons: {
    icon: "/favicon.png",
  },
};

import { ToastProvider } from "@/context/ToastContext";
import { Toaster } from "@/components/ui/Toaster";
import QueryProvider from "@/providers/QueryProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "Inter, sans-serif" }}>
        <QueryProvider>
          <AuthProvider>
            <ServiceProvider>
              <ToastProvider>
                <Toaster />
                {children}
              </ToastProvider>
            </ServiceProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
