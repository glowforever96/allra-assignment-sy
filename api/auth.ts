import axiosInstance from "./axios";

export async function postBusinessNumVerify(body: { businessNumber: string }) {
  const res = await axiosInstance.post(
    "/api/auth/verify-business-number",
    body
  );
  if (res.status === 409) {
    throw new Error("ALREADY_EXISTS");
  }
  return res.data;
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
