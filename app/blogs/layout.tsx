import { ReactNode } from "react";

export default function BlogsLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-[100dvh] h-full pt-[80px]">
      <div className="container mx-auto px-5">{children}</div>
    </main>
  );
}
