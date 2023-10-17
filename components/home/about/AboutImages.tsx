"use client";

import useWindowDimensions from "@/hooks/useWindowDimensions";
import {ImageCarousel} from "../image-carousel/ImageCarousel";
import {aboutImages} from "../../../mock/aboutimages";
import {LazyImage} from "../../common/images/LazyImage";

export const AboutImages = () => {

  const {width} = useWindowDimensions();

  return (
    <div className="mt-8 z-10">
      {
        width <= 768 ?

          <ImageCarousel aria-label="Photos from our events" images={aboutImages} />

          :

          <figure aria-label="Photos from our events" className="z-10 grid grid-cols-3 grid-rows-3 gap-6">
            <LazyImage className="col-span-3 row-span-2"  imageUrl={aboutImages[0].url} alt={aboutImages[0].alt} />
            <LazyImage className="" imageUrl={aboutImages[1].url} alt={aboutImages[1].alt} />
            <LazyImage className="" imageUrl={aboutImages[2].url} alt={aboutImages[2].alt} />
            <LazyImage className="" imageUrl={aboutImages[3].url} alt={aboutImages[3].alt} />
          </figure>
      }
    </div>
  );
};
