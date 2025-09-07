"use client";
import PolicyForm from "@/components/policy-form";
import ProgessBar from "@/components/progress-bar";
import SignupForm from "@/components/signup-form";
import { Button } from "@/components/ui/button";
import usePolicyForm from "@/hooks/usePolicyForm";
import { useProgressStore } from "@/store/useProgressStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function SignupPage() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            staleTime: 20 * 1000,
          },
          mutations: {
            retry: false,
          },
        },
      })
  );
  const policyForm = usePolicyForm();
  const { resetProgress } = useProgressStore();

  useEffect(() => {
    return () => {
      resetProgress();
    };
  }, [resetProgress]);

  return (
    <QueryClientProvider client={queryClient}>
      <section className="flex flex-col w-full">
        <h1
          className="text-center text-label-900 text-title-2 leading-title-2 tracking-title-2
        sm:text-display-2 sm:leading-display-2 sm:tracking-display-2"
        >
          지금 회원가입하면 <br />
          <span className="font-bold">수수료 지원금 3만원 지급!</span>
        </h1>
        <ProgessBar />
        {policyForm.signupStep === 1 ? (
          <>
            <PolicyForm {...policyForm} />
            <Button
              className="mt-12"
              disabled={!policyForm.isRequiredChecked}
              onClick={policyForm.handleClickNext}
            >
              다음
            </Button>
          </>
        ) : (
          <SignupForm />
        )}
      </section>
    </QueryClientProvider>
  );
}
