import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Battplus - Energy Storage News and Analysis",
  description: "The latest in grid-scale and distributed energy storage.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning> 
      <body className={`${roboto.className} bg-gray-100 dark:bg-gray-900`}>
        <Header />
        <main className="py-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
