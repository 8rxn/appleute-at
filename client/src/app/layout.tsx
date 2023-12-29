import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import { AuthProvider } from "@/components/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shopper Client App",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + ""}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <AuthProvider>
            <Navbar></Navbar>
            <main className="flex min-h-screen flex-col items-center justify-between pt-24 px-4 pb-16">
              {children}
            </main>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
