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
    term,
    pageNumbers,
    prevGroupFirstPage,
    nextGroupFirstPage,
    currentGroup,
    totalPages,
  } = usePagination(totalItems);

  const chevronIconClassName =
    "cursor-pointer disabled:cursor-not-allowed disabled:text-status-disable h-[40px] flex items-center justify-center";

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <div className="flex gap-2 items-center">
        <Link
          href={
            prevGroupFirstPage === 1
              ? `/blogs?${term ? `term=${term}` : ""}`
              : `?page=${prevGroupFirstPage}&${term ? `term=${term}` : ""}`
          }
        >
          <button
            disabled={currentGroup === 1}
            className={chevronIconClassName}
          >
            <ChevronsLeftIcon />
          </button>
        </Link>

        <Link
          href={
            currentPage > 1
              ? `?page=${currentPage - 1}${term ? `&term=${term}` : ""}`
              : `/blogs${term ? `?term=${term}` : ""}`
          }
        >
          <button disabled={currentPage === 1} className={chevronIconClassName}>
            <ChevronLeftIcon />
          </button>
        </Link>
      </div>
      <div className="flex items-center">
        {pageNumbers.map((page) => (
          <Link
            href={
              page === 1
                ? `/blogs${term ? `?term=${term}` : ""}`
                : `?page=${page}${term ? `&term=${term}` : ""}`
            }
            key={page}
          >
            <button
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
      <Link href={`?page=${currentPage + 1}${term ? `&term=${term}` : ""}`}>
        <button
          disabled={currentPage === totalPages}
          className={chevronIconClassName}
        >
          <ChevronRightIcon />
        </button>
      </Link>
      <Link href={`?page=${nextGroupFirstPage}${term ? `&term=${term}` : ""}`}>
        <button
          disabled={currentGroup >= Math.ceil(totalPages / MAX_VISIBLE_PAGES)}
          className={chevronIconClassName}
        >
          <ChevronsRightIcon />
        </button>
      </Link>
    </div>
  );
}
