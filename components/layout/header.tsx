import Image from "next/image";
import LoginSigninBtn from "./login-signin-btn";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 z-50 bg-bg-default w-full h-[60px] border-b border-line-200">
      <div className="container mx-auto h-full px-5 flex items-center justify-between">
        <Link href="/blogs">
          <Image src="/images/logo.png" alt="logo" width={90} height={60} />
        </Link>
        <LoginSigninBtn />
      </div>
    </header>
  );
}
