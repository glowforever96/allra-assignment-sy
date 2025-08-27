import SigninBreadcrumb from "@/components/signin-breadcrumb";
import SigninForm from "@/components/signin-form";

export default function SigninPage() {
  return (
    <section className="flex flex-col w-full">
      <div className="fixed top-[61px] left-0 w-full h-[40px] bg-label-100 z-60">
        <div className="container mx-auto h-full px-5 flex items-center justify-end">
          <SigninBreadcrumb />
        </div>
      </div>
      <h1 className="text-title-2 font-medium tracking-title-2 leading-title-2">
        로그인
      </h1>
      <SigninForm />
    </section>
  );
}
