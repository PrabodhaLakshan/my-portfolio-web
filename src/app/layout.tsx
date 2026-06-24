import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Providers } from "@/components/common/providers";
import { MouseSpotlight } from "@/components/common/mouse-spotlight";
import { AnimatedBackground } from "@/components/common/animated-background";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata: Metadata = {
  title: "W.M. Prabodha Lakshan | Portfolio",
  description: "IT undergraduate and full-stack developer portfolio.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <Providers>
          <AnimatedBackground />
          <MouseSpotlight />
          {children}
        </Providers>
      </body>
    </html>
  );
}
