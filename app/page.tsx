import { redirect } from "next/navigation";

export default function Home() {
  redirect("/blogs");

  return (
    <div className="typo-display-1 text-[var(--color-primary)]">
      메인 페이지
    </div>
  );
}
