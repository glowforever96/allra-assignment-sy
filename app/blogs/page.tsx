import { getBlogs, getBlogsBanner } from "@/api/blogs";
import TopBanner from "@/components/top-banner";
import BlogList from "@/components/blog-list";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; term?: string }>;
}) {
  const { page, term } = await searchParams;

  const [bannerData, blogData] = await Promise.all([
    getBlogsBanner(),
    getBlogs({ page: Number(page) ?? 1, term }),
  ]);

  console.log("blogData:", blogData);

  return (
    <section className="flex flex-col pb-13">
      <div className="flex flex-col">
        <h2
          className="text-title-3 font-bold text-label-800 md:text-title-2 lg:text-title-1 tracking-title-3 leading-title-3
          md:tracking-title-2 lg:tracking-title-1 md:leading-title-2 lg:leading-title-1"
        >
          블로그
        </h2>
        <TopBanner bannerData={bannerData} />
        <BlogList blogData={blogData} />
      </div>
    </section>
  );
}
