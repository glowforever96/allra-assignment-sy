import { BlogsBannerData } from "@/types";

export async function getBlogsBanner(): Promise<BlogsBannerData[]> {
  const res = await fetch(
    "https://allra-front-assignment.vercel.app/api/blogs/banners",
    {
      cache: "force-cache", // 정적 배너 데이터이기 때문에 1시간 마다 재검증
      next: { revalidate: 3600 },
    }
  );
  return res.json();
}
