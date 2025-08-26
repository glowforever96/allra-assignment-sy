import { BlogDetail, BlogResponse, BlogsBannerData } from "@/types";

const revalidate = 3600; // 정적 데이터는 1시간 마다 재검증

export async function getBlogsBanner(): Promise<BlogsBannerData[]> {
  const res = await fetch(
    "https://allra-front-assignment.vercel.app/api/blogs/banners",
    {
      cache: "force-cache",
      next: { revalidate },
    }
  );
  return res.json();
}

export async function getBlogs({
  page,
  term,
  category,
}: {
  page: number;
  term?: string;
  category?: string;
}): Promise<BlogResponse> {
  const searchParams = new URLSearchParams();

  if (page) searchParams.set("page", page.toString());
  if (term) searchParams.set("term", term);
  if (category) searchParams.set("category", category);

  const res = await fetch(
    `https://allra-front-assignment.vercel.app/api/blogs?pageSize=12&${searchParams.toString()}${
      category ? `&category=${category}` : ""
    }`,
    {
      // 검색어가 있다면 캐시 전략 사용하지 않음, 요청시마다 최신 결과 반영
      cache: term ? "no-store" : "force-cache",
      next: term ? undefined : { revalidate },
    }
  );
  return res.json();
}

export async function getBlogDetail({
  id,
}: {
  id: string;
}): Promise<BlogDetail> {
  const res = await fetch(
    `https://allra-front-assignment.vercel.app/api/blogs/${id}`,
    {
      cache: "force-cache",
      next: { revalidate },
    }
  );
  return res.json();
}

export async function getAllBlogs({
  pageSize,
}: {
  pageSize: number;
}): Promise<BlogResponse> {
  const res = await fetch(
    `https://allra-front-assignment.vercel.app/api/blogs?pageSize=${pageSize}`,
    {
      cache: "force-cache",
      next: { revalidate },
    }
  );
  return res.json();
}
