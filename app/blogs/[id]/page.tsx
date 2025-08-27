import { getAllBlogs, getBlogDetail, getBlogs } from "@/api/blogs";
import BlogDetailBreadcrumb from "@/components/blog-detail-breadcrumb";
import { formatTime } from "@/lib/time";
import { notFound } from "next/navigation";

import DOMPurify from "isomorphic-dompurify";
import BlogDetailButtons from "@/components/blog-detail-buttons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blogDetail = await getBlogDetail({ id });

  if (!blogDetail) return null;
  return {
    title: blogDetail.title,
    description: blogDetail.summary,
    openGraph: {
      title: blogDetail.title,
      description: blogDetail.summary,
      images: [blogDetail.thumbnail],
    },
  };
}

export const generateStaticParams = async () => {
  // 블로그 데이터가 많지 않아 전체 데이터를 가져와 빌드시 미리 SSG 생성해도 괜찮겠다고 판단
  const { totalCount } = await getBlogs({ page: 1 });
  const allBlogs = await getAllBlogs({ pageSize: totalCount });

  return allBlogs.list.map(({ id }) => ({
    id: id.toString(),
  }));
};

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blogDetail = await getBlogDetail({ id });

  if (!blogDetail) {
    notFound();
  }

  const cleanedContent = DOMPurify.sanitize(blogDetail.content);

  return (
    <section className="max-md:container pb-13">
      <article>
        <div className="mx-auto max-w-[48rem]">
          <BlogDetailBreadcrumb category={blogDetail.category} />
          <h2 className="mt-5 text-title-3 tracking-title-3 leading-title-3 font-bold md:text-display-2 md:font-semibold md:leading-display-2 md:tracking-display-2">
            {blogDetail.title}
          </h2>
          <p className="mt-1 text-body-3 text-label-500 tracking-body-3 leading-body-3 md:text-title-4 md:tracking-title-4 md:leading-title-4">
            {formatTime(blogDetail.createdAt)}
          </p>
          <div
            className="mx-auto mt-7 md:mt-10 lg:mt-14"
            dangerouslySetInnerHTML={{ __html: cleanedContent }}
          ></div>
        </div>
      </article>
      <BlogDetailButtons />
    </section>
  );
}
