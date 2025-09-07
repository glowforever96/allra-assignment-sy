import Footer from "@/components/layout/footer";
import { ReactNode } from "react";

export default function BlogsLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-[100dvh] h-full pt-[80px]">
      <div className="container mx-auto px-5 lg:pt-[70px] md:pt-[30px] pt-[30px]">
        {children}
      </div>
      <Footer />
    </main>
  );
}
