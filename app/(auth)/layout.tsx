import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-[100dvh] flex justify-center pt-[80px] h-full">
      <div className="w-full max-w-lg pt-[80px] px-5 pb-10">{children}</div>
    </main>
  );
}
