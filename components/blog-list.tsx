import Link from "next/link";
import Image from "next/image";
import Pagination from "./pagination";

import { formatTime } from "@/lib/time";
import { BlogResponse } from "@/types";
import NoSearchResult from "./no-search-result";

interface BlogListProps {
  blogData: BlogResponse;
  searchValue?: string;
}

export default function BlogList({ blogData, searchValue }: BlogListProps) {
  const { list, totalCount } = blogData;

  return (
    <>
      <section className="mt-9 md:mt-10">
        {searchValue && (
          <p className="mb-8 text-body-3 font-medium text-label-500 tracking-body-3 leading-body-3">
            &apos;{searchValue}&apos;에 대한 {totalCount}개의 검색결과
          </p>
        )}
        <div className="grid grid-cols-1 gap-x-8 gap-y-9 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((blog) => (
            <Link key={blog.id} href={`/blogs/${blog.id}`}>
              <div className="flex flex-col gap-4">
                <figure className="relative aspect-[2/1] w-full overflow-hidden rounded-2xl">
                  <Image
                    sizes="(max-width: 768px) 100vw, 50vw"
                    src={blog.thumbnail}
                    alt={blog.title}
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                  />
                </figure>
                <div className="flex flex-col gap-1">
                  <p className="text-body-3 font-medium text-secondary-400 tracking-body-3 leading-body-3">
                    {blog.category}
                  </p>
                  <h3 className="line-clamp-2 text-title-4 font-medium tracking-title-4 leading-title-4">
                    {blog.title}
                  </h3>
                  <span className="mt-2 text-body-3 text-label-500 tracking-body-3 leading-body-3">
                    {formatTime(blog.createdAt)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <Pagination totalItems={totalCount} />
      {totalCount === 0 && <NoSearchResult />}
    </>
  );
}
