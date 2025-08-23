import axiosInstance from "./axios";

export async function postBusinessNumVerify(body: { businessNumber: string }) {
  const { data } = await axiosInstance.post(
    "/api/auth/verify-business-number",
    body
  );
  return data;
}

type SignupFormData = {
  businessNumber: string;
  userName: string;
  password: string;
  companyName: string;
  phone: string;
  email: string;
  partnerId: string;
  birthDate: string;
  isMarketingConsent: boolean;
  businessNumberVerifyToken: string;
};

export async function postSignup(body: SignupFormData) {
  const { data } = await axiosInstance.post("/api/auth/register", body);
  return data;
}
