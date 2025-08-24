"use client";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import useSignupForm from "@/hooks/useSignupForm";
import { Label } from "./ui/label";
import { useProgressStore } from "@/store/useProgressStore";
import { handleNumberOnlyInput } from "@/lib/input";

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
    businessNumError,
    isBusinessNumVerified,
    handleBusinessNumVerify,
    handleBlur,
    watch,
    onSubmitSignup,
  } = useSignupForm();

  const { steps } = useProgressStore();

  return (
    <form
      onSubmit={handleSubmit(onSubmitSignup)}
      className="flex flex-col w-full gap-5"
    >
      <div className="space-y-2 w-full flex flex-col">
        <Label htmlFor="businessNumber">사업자등록번호 (ID)</Label>
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              {...register("businessNumber")}
              id="businessNumber"
              placeholder="- 제외 10자리 입력"
              onInput={(e) =>
                !touchedFields.businessNumber
                  ? handleNumberOnlyInput(e, 10)
                  : undefined
              }
              onBlur={(e) => handleBlur(e, "businessNumber")}
              error={businessNumError || errors.businessNumber?.message}
              disabled={isBusinessNumVerified}
              isVerified={isBusinessNumVerified}
              isBusinessNumInput
              success={
                isBusinessNumVerified
                  ? "사업자등록번호 확인이 완료되었어요."
                  : undefined
              }
            />
          </div>
          <Button
            variant="outline"
            size="lg"
            className="h-[48px]"
            onClick={(e) => {
              e.preventDefault();
              handleBusinessNumVerify();
            }}
            disabled={
              isBusinessNumVerified ||
              !watch("businessNumber") ||
              watch("businessNumber")?.length !== 10
            }
          >
            인증하기
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">비밀번호</Label>
        <div className="flex flex-col gap-2">
          <Input
            id="password"
            isPasswordInput
            {...register("password")}
            placeholder="8~15자리 영문, 숫자, 특수문자 조합 입력"
            error={errors.password?.message}
          />
          <Input
            {...register("confirmPassword")}
            isPasswordInput
            placeholder="8~15자리 영문, 숫자, 특수문자 조합 재입력"
            error={errors.confirmPassword?.message}
            success={
              steps.password && steps.confirmPassword
                ? "사용 가능한 비밀번호에요."
                : undefined
            }
          />
        </div>
      </div>
      {isBusinessNumVerified && (
        <>
          <div className="space-y-2">
            <Label htmlFor="companyName">기업명</Label>
            <Input
              id="companyName"
              {...register("companyName")}
              placeholder="기업명을 입력해주세요"
              error={errors.companyName?.message}
              disabled={isBusinessNumVerified}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="userName">대표자</Label>
            <Input
              id="userName"
              {...register("userName")}
              placeholder="사업자등록증에 기재된 대표자명 입력"
              error={errors.userName?.message}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="birthDate">대표자 생년월일</Label>
            <Input
              id="birthDate"
              {...register("birthDate")}
              placeholder="생년월일 8자리 입력 (19900101)"
              onInput={(e) => handleNumberOnlyInput(e, 8)}
              error={errors.birthDate?.message}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">대표자 휴대폰 번호</Label>
            <Input
              id="phone"
              {...register("phone")}
              placeholder="계약서 송부를 위해 꼭 본인정보 입력"
              onInput={
                !touchedFields.phone
                  ? (e) => handleNumberOnlyInput(e, 11)
                  : undefined
              }
              onBlur={(e) => handleBlur(e, "phone")}
              error={errors.phone?.message}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">대표자 이메일</Label>
            <Input
              id="email"
              {...register("email")}
              type="email"
              placeholder="이메일 입력"
              error={errors.email?.message}
            />
          </div>
        </>
      )}
      <Button disabled={!isValid || !isBusinessNumVerified}>가입하기</Button>
    </form>
  );
}
