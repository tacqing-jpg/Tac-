import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CmdKDialog } from "@/components/ui/CmdKDialog";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio OS — Alex Chen",
  description: "Personal portfolio — interactive resume",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-bg-primary text-text-secondary antialiased">
        <Navbar />
        {children}
        <Footer />
        <CmdKDialog />
        <ScrollToTop />
      </body>
    </html>
  );
}
