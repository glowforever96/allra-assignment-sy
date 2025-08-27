import Image from "next/image";
import Link from "next/link";
import { DotIcon } from "lucide-react";
import { Fragment } from "react";

export default function Footer() {
  return (
    <footer>
      <div className="w-full h-[1px] bg-line-200" />
      <div className="lg:gap-20 container mx-auto px-5 flex flex-wrap-reverse items-start gap-8 py-10 md:flex-nowrap md:gap-11 lg:py-[60px] justify-between">
        <div className="mt-6 flex flex-col gap-4 md:mt-9">
          <Image
            src="/logo-gray.svg"
            alt="alla-logo"
            width={95}
            height={24}
            className="mb-4"
          />
          <div className="flex flex-wrap items-center gap-1 text-body-3 tracking-body-3 leading-body-3 text-label-700 *:hover:font-bold">
            {TAIL_LINKS.map(({ title, href }, idx) => (
              <Fragment key={title}>
                <Link
                  href={href}
                  className={`flex items-center ${idx === 2 && "font-bold"}`}
                >
                  {title}
                </Link>
                {idx !== TAIL_LINKS.length - 1 && (
                  <DotIcon className="size-4" />
                )}
              </Fragment>
            ))}
          </div>
          <div className="text-body-3 font-normal text-label-500 lg:text-body-2">
            <p>
              (주)올라핀테크 ㅣ 사업자등록번호 : 509-86-01645 ㅣ 통신판매업신고
              : 제2022-서울강남-02369호
            </p>
            <p>
              대표이사 김상수 ㅣ 주소 : 서울특별시 강남구 봉은사로 327,
              11층(논현동, 궁도빌딩)
            </p>
          </div>
          <p className="text-body-3 font-normal text-label-500">
            © 2020. Allra Fintech Corp. All Rights Reserved.
          </p>
          <div className="grid grid-cols-3 flex-wrap items-center md:grid-cols-4 lg:flex mt-3 md:mt-7">
            {LOGO_LIST.map((logo, idx) => (
              <Image
                key={idx}
                src={logo}
                alt="회사 로고"
                width={100}
                height={48}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="text-body-3 tracking-body-3 leading-body-3 font-medium text-label-700 lg:text-body-2 lg:font-semibold lg:tracking-body-2 lg:leading-body-2">
            고객센터
          </h3>
          <Link
            href="tel:1811-1463"
            className="text-display-2 font-bold text-nowrap text-primary md:text-[44px] lg:text-display-1"
          >
            1811-1463
          </Link>
          <div className="flex flex-col gap-5 text-body-3 font-medium text-label-700">
            <div className="flex flex-col gap-2">
              <h3 className="font-medium text-label-500">운영시간</h3>
              <div className="font-normal">
                <p className="flex flex-wrap gap-1">
                  <span>평일 10:00 ~ 17:00 </span>
                  <span>(점심시간 11:30 ~ 13:00)</span>
                </p>
                <p>주말, 공휴일 휴무</p>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-medium text-label-500">E-mail</h3>
              <div className="font-normal">
                <Link href="mailto:help@allra.co.kr">help@allra.co.kr</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

const TAIL_LINKS = [
  {
    title: "회사소개",
    href: "/",
  },
  {
    title: "서비스 이용약관",
    href: "/",
  },
  {
    title: "개인정보 처리방침",
    href: "/",
  },
  {
    title: "공지사항",
    href: "/",
  },
  {
    title: "FAQ",
    href: "/",
  },
  {
    title: "블로그",
    href: "/",
  },
  {
    title: "채용정보",
    href: "/",
  },
];

const LOGO_LIST = [
  "/kb-capital.svg",
  "/kb-card.svg",
  "/kiwoom-capital.svg",
  "/capital-company.svg",
  "/baby-unicorn.svg",
  "/hana-capital.svg",
  "/gisul-bozung.svg",
];
