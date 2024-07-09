import { Metadata } from "next";
import "./globals.css";
import { Inconsolata } from "next/font/google";

const inconsolata = Inconsolata({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PWA with Next 13",
  description: "PWA application with Next 13",
  generator: "Next.js",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inconsolata.className} p-4 text-lg font-medium bg-slate-50`}
      >
        {children}
      </body>
    </html>
  );
}
