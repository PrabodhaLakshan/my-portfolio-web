import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/common/providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "W.M. Prabodha Lakshan | Portfolio",
  description: "Cyber security undergraduate and full-stack developer portfolio.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
