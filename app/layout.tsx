import type { Metadata } from "next";
import { StatusBar } from "@/components/layout/StatusBar";
import { Dock } from "@/components/layout/Dock";
import { StarField } from "@/components/effects/StarField";
import { CmdKDialog } from "@/components/ui/CmdKDialog";
import "./globals.css";

export const metadata: Metadata = {
  title: "Space OS — Portfolio",
  description: "Personal portfolio — Space OS desktop experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className="dark">
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
        <StarField />
        <StatusBar />
        <main className="relative z-10 pt-12 pb-28 min-h-screen">
          {children}
        </main>
        <Dock />
        <CmdKDialog />
      </body>
    </html>
  );
}
