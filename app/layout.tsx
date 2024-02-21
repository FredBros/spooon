import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/src/theme/ThemeProvider";
import clsx from "clsx";
import Header from "@/src/feature/layout/Header";
import { Footer } from "@/src/feature/layout/Footer";
import "@smastrom/react-rating/style.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "spOoOn",
  description: "Bibliothèque de recettes gourmandes",
};

type LayoutProps = {
  children: React.ReactNode;
  modal?: React.ReactNode;
};

export default function RootLayout({ children, modal }: LayoutProps) {
  return (
    <html lang="en" className="h-full">
        <body className={clsx(inter.className, "bg-background h-full")}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="flex flex-col h-full">
              <Header />
              <div className="flex-1 max-w-5xl m-auto py-14 w-full">
                {children}
              </div>
              {modal}
              <Footer />
            </div>
          </ThemeProvider>
        </body>
    </html>
  );
}
