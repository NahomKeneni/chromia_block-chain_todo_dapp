import type React from "react";
import type { Metadata } from "next";
import { Providers } from "@/providers";
import { cn } from "@/lib/utils";
import { MainLayout } from "@/components/layout/main-layout";

import "./globals.css";

export const metadata: Metadata = {
  title: "TODO APP",
  description: "A modern todo application with dark/light mode support",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased"
        )}
      >
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}
