import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Noto_Serif, Rubik_Mono_One } from "next/font/google";
import { ModeToggle } from "@/components/ModeToggle";

export const metadata: Metadata = {
  title: "Word Prompter",
  description:
    "Create a solution to a prompt based on given words | Word Prompter",
};

const noto = Noto_Serif({
  subsets: ["latin"],
  style: "normal",
  weight: "400",
  variable: "--font-noto",
});

const rubik = Rubik_Mono_One({
  subsets: ["latin"],
  style: "normal",
  weight: "400",
  variable: "--font-rubik",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${noto.variable} ${rubik.variable} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="absolute top-4 right-4 z-10">
              <ModeToggle />
            </div>
            <Header />
            <main className="flex flex-col justify-center items-center w-full">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
