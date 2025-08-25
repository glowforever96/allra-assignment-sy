import { BlogsBannerData } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function TopBanner({
  bannerData,
}: {
  bannerData: BlogsBannerData[];
}) {
  return (
    <div className="hidden md:flex w-full gap-6 mt-8 md:mt-10">
      {bannerData.map(({ id, thumbnail, title, summary }) => (
        <Link key={id} href={`/blogs/${id}`} className="flex-1">
          <figure className="relative aspect-[2/1] w-full overflow-hidden rounded-2xl border border-line-200">
            <Image
              fill
              src={thumbnail}
              alt={`${title} | ${summary}`}
              priority
              className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </figure>
        </Link>
      ))}
    </div>
  );
}
