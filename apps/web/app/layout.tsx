import type { Metadata } from "next";
import { Header } from "./_components/Header";
import Provider from "./provider";

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
    <html lang="en" suppressHydrationWarning>
      <body>
        <Provider>
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  );
}
