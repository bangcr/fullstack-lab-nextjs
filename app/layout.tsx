import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./_components/gnb/Header";
import HeaderMobile from "./_components/gnb/HeaderMobile";
import OutletContainer from "./_components/layout/OutletContainer";
import Footer from "./_components/gnb/Footer";
import localFont from "next/font/local";

const Pretendard = localFont({
  src: "../styles/fonts/PretendardVariable.woff2",
  weight: "100 900",
});

export const gmarketSansBold = localFont({
  src: "../styles/fonts/GmarketSansBold.otf",
  weight: "700",
  // variable: "--font-gmarket-bold",
});

export const gmarketSansMedium = localFont({
  src: "../styles/fonts/GmarketSansMedium.otf",
  weight: "500",
  // variable: "--font-gmarket-medium",
});

export const gmarketSansLight = localFont({
  src: "../styles/fonts/GmarketSansLight.otf",
  weight: "300",
  // variable: "--font-gmarket-light",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${Pretendard.className} ${gmarketSansBold.variable} ${gmarketSansMedium.variable} ${gmarketSansLight.variable}`}
      >
        <Header />
        <HeaderMobile />
        <OutletContainer>{children}</OutletContainer>
        <Footer />
      </body>
    </html>
  );
}
