"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useActionState } from "react";
import { loginAction } from "@/actions/login";
import { handleNumberOnlyInput } from "@/lib/input";
import useSaveLocalStroage from "@/hooks/useSaveLocalStroage";

export default function SigninForm() {
  const [state, formAction, isPending] = useActionState(loginAction, null);
  const {
    businessNumber,
    isSaveId,
    handleBusinessNumberChange,
    handleToggleSaveId,
  } = useSaveLocalStroage();

  return (
    <>
      <form className="w-full flex flex-col gap-5 mt-6" action={formAction}>
        <div className="space-y-2 w-full flex flex-col">
          <Label>사업자등록번호 (ID로 사용돼요)</Label>
          <Input
            placeholder="- 제외 10자리 입력"
            name="businessNumber"
            value={businessNumber}
            onChange={handleBusinessNumberChange}
            onInput={(e) => handleNumberOnlyInput(e, 10)}
            error={state?.INVALID}
          />
        </div>
        <div className="space-y-2 w-full flex flex-col">
          <Label>비밀번호</Label>
          <Input
            placeholder="비밀번호를 입력해주세요."
            isPasswordInput
            name="password"
          />
          {state?.NOT_FOUND && (
            <p className="text-caption-1 text-status-error font-medium">
              {state.NOT_FOUND}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="check-save-id"
            className="size-5"
            checked={isSaveId}
            onCheckedChange={handleToggleSaveId}
          />
          <label
            className="text-label-700 text-body-3 leading-body-3 tracking-body-3 font-medium"
            htmlFor="check-save-id"
          >
            아이디 저장
          </label>
        </div>
        <Button disabled={isPending}>로그인</Button>
      </form>
      <Button variant="outline" className="mt-2" asChild>
        <Link href="/sign-up">회원가입</Link>
      </Button>
    </>
  );
}
