import z from "zod";

export const signupSchema = z
  .object({
    businessNumber: z
      .string()
      .min(10, "사업자등록번호 10자리를 입력해 주세요."),
    password: z
      .string()
      .regex(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/,
        "8~15자리 영문, 숫자, 특수문자로 조합하여 입력해주세요."
      ),
    confirmPassword: z
      .string()
      .regex(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/,
        "8~15자리 영문, 숫자, 특수문자로 조합하여 입력해주세요."
      ),
    companyName: z.string().min(1, "기업명을 입력해주세요."),
    userName: z.string().min(1, "대표자명을 입력해주세요."),
    birthDate: z
      .string()
      .regex(/^\d{8}$/, "생년월일은 YYYYMMDD 형식입니다.")
      .refine((value) => {
        const year = parseInt(value.substring(0, 4));
        const month = parseInt(value.substring(4, 6));
        const day = parseInt(value.substring(6, 8));

        const date = new Date(year, month - 1, day);
        return (
          date.getFullYear() === year &&
          date.getMonth() === month - 1 &&
          date.getDate() === day
        );
      }, "생년월일이 올바르지 않거나 미래 날짜입니다."),
    phone: z
      .string()
      .min(1, "휴대폰번호를 입력해주세요")
      .regex(/^010\d{8}$/, "전화번호는 01012345678 형식입니다"),
    email: z.email("이메일 형식이 올바르지 않습니다"),
  })
  .refine((data: SignupFormData) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export type SignupFormData = z.infer<typeof signupSchema>;
