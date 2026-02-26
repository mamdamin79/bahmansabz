import type { Metadata } from "next";
import { GamesRouteHeader } from "./games/_components/GamesRouteHeader";
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
        <TanstackQueryProvider>
          <GamesRouteHeader />
          {children}
        </TanstackQueryProvider>
      </body>
    </html>
  );
}
