import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Noto_Sans, Rubik_Mono_One } from "next/font/google";
// import { ModeToggle } from "@/components/ModeToggle";
import localFont from 'next/font/local'
import BackGroundStyling from "@/components/BackgroundStyling";

export const metadata: Metadata = {
  title: "Phrase Factory",
  description:
    "Create a solution to a prompt based on given words | Phrase Factory",
};

const noto = Noto_Sans({
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

const OpenDyslexic = localFont({
  src: [
    {
      path: './fonts/OpenDyslexic-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/OpenDyslexic-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: './fonts/OpenDyslexic-Bold-Italic.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: "--font-dyslexic"
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${noto.variable} ${rubik.variable} ${OpenDyslexic.variable} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <BackGroundStyling>

              <Header />
              
                <main 
                  className={`flex-grow flex flex-col items-center w-full mb-4 mt-24`}
                >
                  {children}
                </main>

              <Footer />

            </BackGroundStyling>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
