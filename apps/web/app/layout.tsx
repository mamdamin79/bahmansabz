import type { Metadata } from "next";
import { Header } from "./_components/header";

export const metadata: Metadata = {
  title: "Bahmansabz",
  description: "A modern web application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
