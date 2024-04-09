"use client";
import Header from "@/components/Header";
import { client, ssr } from "@/lib/urql";
import { cn } from "@/lib/utils";
import { UrqlProvider } from "@urql/next";
import { Inter as FontSans, Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <UrqlProvider client={client} ssr={ssr}>
          <Header />
          {children}
        </UrqlProvider>
      </body>
    </html>
  );
}
