import "./globals.css";
import Navbar from "@/components/Navbar";
import I18nProvider from "@/components/I18nProvider";
import { SessionProvider } from "next-auth/react";

export const metadata = {
  title: "FoodApp",
  description: "Online Food Ordering",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <SessionProvider>
          <I18nProvider>
            <Navbar />
            <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
          </I18nProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
