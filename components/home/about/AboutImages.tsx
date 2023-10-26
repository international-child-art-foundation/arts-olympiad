"use client";

import useWindowDimensions from "@/hooks/useWindowDimensions";
import {ImageCarousel} from "../image-carousel/ImageCarousel";
import {aboutImages} from "../../../mock/aboutImages";
import {LazyImage} from "../../common/images/LazyImage";

export const AboutImages = () => {

  const {width} = useWindowDimensions();

  return (
    <div className="mt-8 z-10">
      {
        width <= 768 ?

          <ImageCarousel objectCover={true} height={180} aria-label="Photos from our events." images={aboutImages} />

          :

          <figure aria-label="Photos from our events." className="z-10 grid grid-cols-3 grid-rows-2 gap-6">
            <LazyImage className="col-span-3 object-cover h-[230px] lg:h-[320px] xl:h-[400px] 2xl:h-[450px]"  imageUrl={aboutImages[0].url} alt={aboutImages[0].alt} />
            <LazyImage className="object-cover h-[230px] lg:h-[320px] xl:h-[400px] 2xl:h-[450px]" imageUrl={aboutImages[1].url} alt={aboutImages[1].alt} />
            <LazyImage className="object-cover h-[230px] lg:h-[320px] xl:h-[400px] 2xl:h-[450px]" imageUrl={aboutImages[2].url} alt={aboutImages[2].alt} />
            <LazyImage className="object-cover h-[230px] lg:h-[320px] xl:h-[400px] 2xl:h-[450px]" imageUrl={aboutImages[3].url} alt={aboutImages[3].alt} />
          </figure>
      }
    </div>
  );
};
