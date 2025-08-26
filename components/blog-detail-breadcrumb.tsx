import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { Category } from "@/types";
import { CATEGORY_MAP } from "@/constants";

interface BlogDetailBreadcrumbProps {
  category: Category;
}

export default function BlogDetailBreadcrumb({
  category,
}: BlogDetailBreadcrumbProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link
              href="/blogs"
              className="flex items-center gap-1 text-title-4 text-label-700 tracking-title-4 leading-title-4"
            >
              블로그
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator size="5" />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link
              href={`/blogs?category=${category}`}
              className="flex items-center gap-1 text-title-4 text-label-700 tracking-title-4 leading-title-4"
            >
              {CATEGORY_MAP[category]}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
