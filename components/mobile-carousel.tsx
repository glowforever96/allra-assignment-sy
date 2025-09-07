"use client";
import { BlogsBannerData } from "@/types";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import Link from "next/link";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

export default function MobileCarousel({
  bannerData,
}: {
  bannerData: BlogsBannerData[];
}) {
  return (
    <Carousel
      className="md:hidden w-full mt-8 md:mt-10"
      opts={{
        loop: true,
      }}
      plugins={[Autoplay({ delay: 3000 })]}
    >
      <CarouselContent>
        {bannerData.map(({ id, thumbnail, title, summary }) => (
          <CarouselItem key={id} className="basis-full">
            <Link href={`/blogs/${id}`}>
              <figure className="relative aspect-[2/1] w-full overflow-hidden rounded-2xl border border-line-200">
                <Image
                  priority
                  src={thumbnail}
                  alt={`${title} | ${summary}`}
                  width={300}
                  height={150}
                  style={{ width: "100%", height: "100%" }}
                  className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                />
              </figure>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
