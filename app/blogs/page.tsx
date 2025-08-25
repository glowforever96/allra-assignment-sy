import { getBlogsBanner } from "@/api/blogs";
import TopBanner from "@/components/top-banner";

export default async function BlogPage() {
  const bannerData = await getBlogsBanner();

  return (
    <section className="flex flex-col">
      <div className="flex flex-col">
        <h2
          className="text-title-3 font-bold text-label-800 md:text-title-2 lg:text-title-1 tracking-title-3 leading-title-3
          md:tracking-title-2 lg:tracking-title-1 md:leading-title-2 lg:leading-title-1"
        >
          블로그
        </h2>
        <TopBanner bannerData={bannerData} />
      </div>
    </section>
  );
}
