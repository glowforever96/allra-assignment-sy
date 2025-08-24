"use server";
import { cookies } from "next/headers";

export async function logout() {
  const cookieStore = cookies();

  (await cookieStore).delete("accessToken");
  (await cookieStore).delete("refreshToken");
  (await cookieStore).delete("accessTokenExpiresIn");
}
