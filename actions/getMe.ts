"use server";
import { cookies } from "next/headers";

const BASE_URL = "https://allra-front-assignment.vercel.app/api/auth";

export async function getMe() {
  const cookieStore = cookies();

  const accessToken = (await cookieStore).get("accessToken")?.value;
  if (!accessToken) {
    return null;
  }
  // 내 정보 요청 (accessToken 유효시)
  const res = await fetch(`${BASE_URL}/me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (res.ok) {
    const data = await res.json();
    return data;
  }
}
