import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layout/header";
import SignupSuccessDialog from "@/components/signup-sucess-dialog";
import { Toaster } from "@/components/ui/sonner";

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
});

export const metadata: Metadata = {
  title: "올라 핀테크 프론트 과제 | 권순용",
  description: "올라 핀테크 프론트 과제입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pretendard.className} min-h-[100dvh]`}>
        <Header />
        {children}
        <SignupSuccessDialog />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
