import type { Metadata } from "next";
import "./globals.css";
import { TanstackQueryProvider } from "./providers";

export const metadata: Metadata = {
  title: "RAWG Front-end",
  description: "Next.js storefront with Tailwind and TypeScript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <TanstackQueryProvider>{children}</TanstackQueryProvider>
      </body>
    </html>
  );
}
