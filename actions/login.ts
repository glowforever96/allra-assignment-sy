/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(_: any, formData: FormData) {
  const businessNumber = formData.get("businessNumber")?.toString();
  const password = formData.get("password")?.toString();

  if (!businessNumber?.trim() || businessNumber.length !== 10) {
    return {
      INVALID: "사업자등록번호 10자리를 입력해 주세요.",
    };
  }

  const res = await fetch(
    "https://allra-front-assignment.vercel.app/api/auth/login",
    {
      method: "POST",
      body: JSON.stringify({
        businessNumber,
        password,
      }),
    }
  );
  const data = await res.json();

  if (data.errorCode === "NOT_FOUND") {
    return {
      NOT_FOUND: data.errorMessage,
    };
  }
  if (res.status === 200) {
    const cookieStore = cookies();
    const isProduction = process.env.NODE_ENV === "production";

    const now = Math.floor(Date.now() / 1000);

    (await cookieStore).set("accessToken", data.accessToken, {
      httpOnly: isProduction,
      secure: isProduction,
      maxAge: data.accessTokenExpiresIn - now,
      path: "/",
    });
    (await cookieStore).set("refreshToken", data.refreshToken, {
      httpOnly: isProduction,
      secure: isProduction,
      maxAge: data.refreshTokenExpiresIn - now,
      path: "/",
    });
    (await cookieStore).set(
      "accessTokenExpiresIn",
      String(data.accessTokenExpiresIn),
      {
        path: "/",
      }
    );
    redirect("/");
  }
}
