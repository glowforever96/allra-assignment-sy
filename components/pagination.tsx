"use client";
import Link from "next/link";
import usePagination, { MAX_VISIBLE_PAGES } from "@/hooks/usePagination";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";

interface PaginationProps {
  totalItems: number;
}

export default function Pagination({ totalItems }: PaginationProps) {
  const {
    currentPage,
    pageNumbers,
    prevGroupFirstPage,
    nextGroupFirstPage,
    currentGroup,
    totalPages,
    createPageUrl,
  } = usePagination(totalItems);

  const chevronIconClassName =
    "cursor-pointer disabled:cursor-not-allowed disabled:text-status-disable h-[40px] flex items-center justify-center";

  if (!totalPages) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <div className="flex gap-2 items-center">
        <Link href={createPageUrl(prevGroupFirstPage)}>
          <button
            aria-label="이전 그룹 버튼"
            disabled={currentGroup === 1}
            className={chevronIconClassName}
          >
            <ChevronsLeftIcon />
          </button>
        </Link>

        <Link href={createPageUrl(currentPage - 1)}>
          <button
            aria-label="이전 페이지 버튼"
            disabled={currentPage === 1}
            className={chevronIconClassName}
          >
            <ChevronLeftIcon />
          </button>
        </Link>
      </div>
      <div className="flex items-center">
        {pageNumbers.map((page) => (
          <Link href={createPageUrl(page)} key={page}>
            <button
              aria-label={`${page} 페이지 버튼`}
              className={`inline-flex items-center justify-center whitespace-nowrap cursor-pointer h-[40px] px-4 text-body-2
            rounded-full font-medium text-label-700 md:size-10 hover:bg-label-100 hover:text-label-700 ${
              page === currentPage && "bg-component-alternative text-label-900"
            }`}
            >
              {page}
            </button>
          </Link>
        ))}
      </div>
      <Link href={createPageUrl(currentPage + 1)}>
        <button
          aria-label="다음 페이지 버튼"
          disabled={currentPage === totalPages}
          className={chevronIconClassName}
        >
          <ChevronRightIcon />
        </button>
      </Link>
      <Link href={createPageUrl(nextGroupFirstPage)}>
        <button
          aria-label="다음 그룹 버튼"
          disabled={currentGroup >= Math.ceil(totalPages / MAX_VISIBLE_PAGES)}
          className={chevronIconClassName}
        >
          <ChevronsRightIcon />
        </button>
      </Link>
    </div>
  );
}
