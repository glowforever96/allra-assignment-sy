"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Link2Icon } from "lucide-react";
import useClipboard from "@/hooks/useClipboard";

export default function BlogDetailButtons() {
  const router = useRouter();
  const { handleCopy } = useClipboard();

  return (
    <div className="flex items-center justify-center gap-4 md:gap-6 mt-7 md:mt-10 lg:mt-14">
      <Button variant="secondary" onClick={() => router.back()}>
        목록으로 돌아가기
      </Button>
      <Button variant="outline" onClick={handleCopy}>
        <Link2Icon />
        공유하기
      </Button>
    </div>
  );
}
