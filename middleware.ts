import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const accessTokenExpiresIn = Number(
    request.cookies.get("accessTokenExpiresIn")?.value || 0
  );
  const now = Math.floor(Date.now() / 1000);

  if (refreshToken && (!accessToken || accessTokenExpiresIn - now < 10)) {
    try {
      const response = await fetch(
        "https://allra-front-assignment.vercel.app/api/auth/refresh-token",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const res = NextResponse.next();

        res.cookies.set("accessToken", data.accessToken, {
          httpOnly: process.env.NODE_ENV === "production",
          secure: process.env.NODE_ENV === "production",
          maxAge: data.accessTokenExpiresIn - now,
          path: "/",
        });
        res.cookies.set("refreshToken", data.refreshToken, {
          httpOnly: process.env.NODE_ENV === "production",
          secure: process.env.NODE_ENV === "production",
          maxAge: data.refreshTokenExpiresIn - now,
          path: "/",
        });
        res.cookies.set(
          "accessTokenExpiresIn",
          String(data.accessTokenExpiresIn),
          {
            path: "/",
          }
        );

        return res;
      }
    } catch (error) {
      console.error("토큰 갱신 실패:", error);
    }
  }
  // 토큰 갱신 필요하지 않은 경우 정상 요청 처리
  return NextResponse.next();
}
