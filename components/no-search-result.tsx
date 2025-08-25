import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

export default function NoSearchResult() {
  const linkData = [
    {
      text: "트렌드",
      href: "/blogs?term=트렌드",
    },
    {
      text: "올라소식",
      href: "/blogs?term=올라소식",
    },
    {
      text: "이커머스",
      href: "/blogs?term=이커머스",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[270px] lg:h-[450px]">
      <div className="flex flex-col items-center justify-center gap-7 md:gap-8">
        <Image
          className="max-md:hidden"
          src="/images/empty-box-image.webp"
          alt="빈 상자 이미지"
          width={80}
          height={80}
        />
        <Image
          className="md:hidden"
          src="/images/empty-box-image.webp"
          alt="빈 상자 이미지"
          width={42}
          height={42}
        />
        <div className="text-title-4 tracking-title-4 leading-title-4 font-medium md:text-title-3 md:tracking-title-3 md:leading-title-3">
          검색 결과가 없어요
        </div>
      </div>
      <p className="mt-3 text-body-3 tracking-body-3 leading-body-3 font-normal text-label-700 md:text-body-2 md:tracking-body-2 md:leading-body-2">
        아래와 같은 단어로 다시 검색해보세요.
      </p>
      <div className="flex flex-wrap items-baseline mt-1">
        {linkData.map((link, idx) => (
          <Fragment key={link.text}>
            <Link
              key={link.text}
              href={link.href}
              className="text-primary px-1 text-body-2 font-medium"
            >
              {link.text}
            </Link>
            {idx !== linkData.length - 1 && (
              <span className="font-normal text-label-900">,</span>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
