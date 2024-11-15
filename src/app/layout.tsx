import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { ThemeProvider } from "@/contexts/themeContext/theme-provider";
import { TRPCReactProvider } from "@/trpc/react";
import IsServerAuthed from "./_components/auth/IsServerAuthed";

export const metadata: Metadata = {
  title: "KanZone",
  description:
    "The ultimate tool to scam people. Or simply get paid for your services.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TRPCReactProvider>
            <IsServerAuthed>
              <Header />
              {children}
              <Footer />
            </IsServerAuthed>
          </TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
