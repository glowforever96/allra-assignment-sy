"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();
  return (
    <div className="flex h-screen items-center justify-center pt-13 flex-col">
      <h1 className="mb-3 text-label-700 text-title-3 tracking-title-3 leading-title-3 font-semibold md:text-display-3 md:font-semibold md:leading-display-3 md:tracking-display-3">
        존재하지 않는 페이지입니다.
      </h1>
      <Button onClick={() => router.replace("/blogs")}>
        메인으로 돌아가기
      </Button>
    </div>
  );
}
