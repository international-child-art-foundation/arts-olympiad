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

          <ImageCarousel images={aboutImages} />

          :

          <figure className="z-10 grid grid-cols-3 grid-rows-2 gap-6 ">
            <LazyImage width={730} height={230} className="col-span-3" imageUrl={aboutImages[0].url} alt={aboutImages[0].alt} />
            <LazyImage width={230} height={240} className="" imageUrl={aboutImages[1].url} alt={aboutImages[1].alt} />
            <LazyImage width={230} height={240} className="" imageUrl={aboutImages[2].url} alt={aboutImages[2].alt} />
            <LazyImage width={230} height={240} className="" imageUrl={aboutImages[3].url} alt={aboutImages[3].alt} />
          </figure>
      }
    </div>
  );
};
