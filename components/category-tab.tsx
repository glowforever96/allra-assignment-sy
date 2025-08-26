import { CATEGORY_MAP } from "@/constants";
import Link from "next/link";

export default function CategoryTab({
  category,
}: {
  category: string | undefined;
}) {
  return (
    <div className="mt-8 md:mt-10 lg:mt-11">
      <div className="flex h-[50px] items-center overflow-scroll border-b border-b-line-200 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {Object.entries(CATEGORY_MAP).map(([key, value]) => {
          const isActive = (!category && key === "ALL") || category === key;
          return (
            <div className="relative" key={key}>
              <Link
                href={key === "ALL" ? "/blogs" : `/blogs?category=${key}`}
                className={`text-body-1 whitespace-nowrap py-[12px] px-3 relative ${
                  isActive
                    ? "font-semibold text-label-900"
                    : "font-normal text-label-500"
                }`}
              >
                {value}
              </Link>
              {isActive && (
                <div className="absolute inset-x-0 bottom-[-12px] h-[2px] bg-label-900" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
