import { getBlogs, getBlogsBanner } from "@/api/blogs";
import TopBanner from "@/components/top-banner";
import BlogList from "@/components/blog-list";
import SearchInput from "@/components/search-input";
import CategoryTab from "@/components/category-tab";
import { notFound } from "next/navigation";
import { Category } from "@/types";
import MobileCarousel from "@/components/mobile-carousel";

const VALID_CATEGORIES: Category[] = [
  "TREND",
  "TIP",
  "NEWS",
  "GUIDE",
  "EXPERIENCE",
];

type SearchParams = {
  page?: string;
  term?: string;
  category?: string;
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { page, term, category } = await searchParams;
  const pageNumber = Number(page);

  if (page && (isNaN(pageNumber) || pageNumber < 1)) {
    notFound();
  }

  if (category && !VALID_CATEGORIES.includes(category as Category)) {
    notFound();
  }

  const [bannerData, blogData] = await Promise.all([
    getBlogsBanner(),
    getBlogs({ page: pageNumber || 1, term, category }),
  ]);

  return (
    <section className="flex flex-col pb-13">
      <div className="flex flex-col">
        <div className="flex flex-col gap-6 md:flex-row md:justify-between">
          <h2
            className="text-title-3 font-bold text-label-800 md:text-title-2 lg:text-title-1 tracking-title-3 leading-title-3
            md:tracking-title-2 lg:tracking-title-1 md:leading-title-2 lg:leading-title-1"
          >
            블로그
          </h2>
          <SearchInput />
        </div>
        <MobileCarousel bannerData={bannerData} />
        {!term && <TopBanner bannerData={bannerData} />}
        <CategoryTab category={category} />
        <BlogList blogData={blogData} searchValue={term} />
      </div>
    </section>
  );
}
