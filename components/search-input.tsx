"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchIcon, CircleXIcon } from "lucide-react";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchTerm.trim()) {
      router.push(`/blogs?term=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      router.push("/blogs");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  useEffect(() => {
    setSearchTerm(searchParams.get("term") || "");
  }, [searchParams]);

  return (
    <div className="relative">
      <SearchIcon
        width={16}
        height={16}
        className="absolute left-5 top-1/2 -translate-y-1/2 text-label-700"
      />
      <input
        className="flex rounded-md border bg-background-default ring-offset-background bg-background-default px-6 py-[12.5px] placeholder:text-body-2 focus-visible:outline-hidden focus:ring-1 focus:ring-component-dark h-[48px] border-line-200 pl-11 text-body-1 tracking-body-1 leading-body-1 placeholder:font-normal placeholder:text-label-500 w-full md:w-[400px] lg:w-[468px]"
        type="text"
        autoComplete="off"
        placeholder="검색어를 입력해주세요"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {searchTerm && (
        <button
          className="absolute right-7 top-1/2 -translate-y-1/2 inline-block cursor-pointer"
          onClick={() => setSearchTerm("")}
        >
          <CircleXIcon
            width={20}
            height={20}
            className="text-bg-default"
            fill="#d1d5db"
            stroke="currentColor"
          />
        </button>
      )}
    </div>
  );
}
