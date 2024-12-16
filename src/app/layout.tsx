import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AddToHomeScreenButton from "@/components/AddToHomeScreenButton";
import StoreProvider from "@/store/StoreProvider";


export const metadata: Metadata = {
  title: 'Taylor Wessing',
  description: 'Taylor Wessing',
  manifest: '/manifest.json',
  themeColor: '#f9f3f0',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body className="min-h-screen bg-back">
        <StoreProvider>
          <main>{children}</main>
        <AddToHomeScreenButton /> 
        </StoreProvider>
      </body>
    </html>
  )
}
