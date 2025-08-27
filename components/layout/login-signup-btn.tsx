"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

export default function LoginSignupBtn() {
  const pathname = usePathname();

  if (pathname === "/sign-in" || pathname === "/sign-up") {
    return null;
  }
  return (
    <>
      <div className="items-center gap-3 hidden md:flex">
        <Button asChild size="sm" variant="outline" className="font-normal">
          <Link href="/sign-up">회원가입</Link>
        </Button>
        <Button asChild size="sm" variant="secondary" className="font-normal">
          <Link href="/sign-in">로그인</Link>
        </Button>
      </div>
      <div className="md:hidden">
        <Button asChild size="sm" variant="outline" className="font-normal">
          <Link href="/sign-in">로그인/회원가입</Link>
        </Button>
      </div>
    </>
  );
}
