import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Navbar } from "@/components/Navbar";
import { AIChatWidget } from "@/components/AIChatWidget";

export const metadata: Metadata = {
  title: "سوقX | SouqX - منصة التجارة الإلكترونية",
  description: "منصة التجارة الإلكترونية الرائدة في منطقة الشرق الأوسط وشمال أفريقيا",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body>
        <Providers>
          <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            <main>{children}</main>
            <AIChatWidget />
          </div>
        </Providers>
      </body>
    </html>
  );
}
