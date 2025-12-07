import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// Si tu as un fichier utils pour cn, sinon tu peux retirer cette ligne et le cn() plus bas
import { cn } from "@/lib/utils"; 
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "ReputationFlow",
  description: "Gérez vos avis clients avec l'IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}