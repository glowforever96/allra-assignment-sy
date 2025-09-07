import Image from "next/image";
import Link from "next/link";
import { getMe } from "@/actions/getMe";
import LogoutBtn from "./logout-btn";
import LoginSignupBtn from "./login-signup-btn";

export default async function Header() {
  const user = await getMe();

  return (
    <header className="fixed top-0 left-0 z-50 bg-bg-default w-full h-[60px] border-b border-line-200">
      <div className="container mx-auto h-full px-5 flex items-center justify-between">
        <Link href="/blogs">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={90}
            height={60}
            priority
            style={{ width: "auto", height: "auto" }}
          />
        </Link>
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-body-14 font-bold">{user.companyName}님</span>{" "}
            <LogoutBtn />
          </div>
        ) : (
          <LoginSignupBtn />
        )}
      </div>
    </header>
  );
}
