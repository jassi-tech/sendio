import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-bg-base text-text-primary">
      <Navbar />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
}
