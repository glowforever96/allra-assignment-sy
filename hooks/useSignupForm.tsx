import { SignupFormData, signupSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useBusinessNumVerify from "./queries/useBusinessNumVerify";
import { useProgressStore } from "@/store/useProgressStore";
import useSignup from "./queries/useSignup";
import { useAlertStore } from "@/store/useAlert";

function useSignupForm() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors, isValid, touchedFields },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "all",
  });
  const watchedValues = watch();
  const { mutate: businessNumVerify } = useBusinessNumVerify();
  const { mutate: signup } = useSignup();
  const { updateStep } = useProgressStore();
  const { setIsOpen } = useAlertStore();

  const [isBusinessNumVerified, setIsBusinessNumVerified] = useState(false);
  const [businessNumberVerifyToken, setBusinessNumbeVerifyToken] = useState("");
  const [businessNumError, setBusinessNumError] = useState("");

  const handleBusinessNumVerify = async () => {
    const businessNumber = getValues("businessNumber");
    businessNumVerify(
      { businessNumber },
      {
        onSuccess: ({ company, owner, businessNumberVerifyToken }) => {
          setValue("companyName", company ?? "");
          setValue("userName", owner ?? "");
          setBusinessNumbeVerifyToken(businessNumberVerifyToken);
          setIsBusinessNumVerified(true);
          setBusinessNumError("");
        },
        onError: () => {
          setBusinessNumError("이미 등록된 사업자등록번호입니다.");
        },
      }
    );
  };

  const onSubmitSignup = (data: SignupFormData) => {
    signup(
      {
        ...data,
        businessNumberVerifyToken,
        partnerId: Date.now().toString(),
        isMarketingConsent: true,
      },
      {
        onSuccess: () => {
          setIsOpen(true);
        },
      }
    );
  };

  // 사업자 등록번호, 휴대폰 번호 입력 후 blur 시 자동 포맷팅 함수
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement>,
    type: "businessNumber" | "phone"
  ) => {
    const value = e.target.value;
    if (value && value.trim() !== "") {
      let formattedString = "";

      if (type === "businessNumber" && value.length === 10) {
        formattedString = `${value.slice(0, 3)}-${value.slice(
          3,
          5
        )}-${value.slice(5)}`;
        e.target.value = formattedString;
      } else if (type === "phone" && value.length === 11) {
        formattedString = `${value.slice(0, 3)}-${value.slice(
          3,
          7
        )}-${value.slice(7)}`;
        e.target.value = formattedString;
      }
    }
  };

  useEffect(() => {
    updateStep("businessNumber", isBusinessNumVerified);
  }, [isBusinessNumVerified, updateStep]);

  useEffect(() => {
    const isPasswordValid = !!watchedValues.password && !errors.password;
    updateStep("password", isPasswordValid);
  }, [watchedValues.password, errors.password, updateStep]);

  useEffect(() => {
    const isConfirmPasswordValid =
      !!watchedValues.confirmPassword && !errors.confirmPassword;
    updateStep("confirmPassword", isConfirmPasswordValid);
  }, [watchedValues.confirmPassword, errors.confirmPassword, updateStep]);

  useEffect(() => {
    const isCompanyNameValid =
      !!watchedValues.companyName && !errors.companyName;
    updateStep("companyName", isCompanyNameValid);
  }, [watchedValues.companyName, errors.companyName, updateStep]);

  useEffect(() => {
    const isUserNameValid = !!watchedValues.userName && !errors.userName;
    updateStep("userName", isUserNameValid);
  }, [watchedValues.userName, errors.userName, updateStep]);

  useEffect(() => {
    const isBirthDateValid = !!watchedValues.birthDate && !errors.birthDate;
    updateStep("birthDate", isBirthDateValid);
  }, [watchedValues.birthDate, errors.birthDate, updateStep]);

  useEffect(() => {
    const isPhoneValid = !!watchedValues.phone && !errors.phone;
    updateStep("phone", isPhoneValid);
  }, [watchedValues.phone, errors.phone, updateStep]);

  useEffect(() => {
    const isEmailValid = !!watchedValues.email && !errors.email;
    updateStep("email", isEmailValid);
  }, [watchedValues.email, errors.email, updateStep]);

  useEffect(() => {
    if (businessNumError) {
      setBusinessNumError("");
    }
  }, [businessNumError, watchedValues.businessNumber]);

  return {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, touchedFields },
    businessNumError,
    isBusinessNumVerified,
    handleBusinessNumVerify,
    handleBlur,
    onSubmitSignup,
  };
}

export default useSignupForm;
