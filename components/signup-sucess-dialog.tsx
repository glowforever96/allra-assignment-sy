"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useAlertStore } from "@/store/useAlert";

export default function SignupSuccessDialog() {
  const { isOpen, setIsOpen } = useAlertStore();
  const router = useRouter();

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="w-[75%] flex flex-col items-center !max-w-[360px]">
        <AlertDialogHeader>
          <AlertDialogTitle>올라 가입을 환영합니다 🎉</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className="text-center">
          이제 첫 정산을 신청해보세요!
          <br />
          정산금을 <span className="text-primary">30초만에 조회</span>하고,{" "}
          <span className="text-primary">바로 신청</span>할 수 있어요.
        </AlertDialogDescription>
        <AlertDialogFooter className="flex w-full !flex-col gap-2">
          <Button
            onClick={() => {
              setIsOpen(false);
              router.push("/");
            }}
          >
            정산금 조회하기
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
