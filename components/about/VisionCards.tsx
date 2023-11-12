import {VisionCard} from "./VisionCard";
import Image from "next/image";
import {H2m} from "../common/texts/H2m";
import {AnimatedScribble} from "../common/decorations/AnimatedScribble";

export const VisionCards = () => {
  return (
    <section
      aria-label="Our Vision and Our Goal"
      className="mt-36 relative flex flex-col px-8 md:px-12 lg:px-16 xl:px-20 mt-36 max-w-screen-2xl m-auto"
    >
      <article className=" text-center md:flex flex-col mr-10" >
        <H2m className="font-medium text-3xl md:text-4xl" >Our Vision & Our <span className="relative text-dark-blue">Goal
          <AnimatedScribble width={180} className="absolute -bottom-6 -right-20" />
        </span>

        </H2m>
      </article>

      <div className="flex flex-nowrap flex-col lg:flex-row justify-between mt-12">
        <VisionCard
          icon="/svgs/history.svg"
          heading="Beginning"
          description="Incorporated in the District of Columbia in 1997, the International Child Art Foundation (ICAF) is a 501(c)(3) nonprofit organization with federal tax number 52-2032649. "
          color="#FFF5AD"
          texture={
            <Image src="/svgs/blobs/beginning-blob.svg" className="w-[60%] absolute bottom-0 left-0 opacity-80" alt="" width={0} height={0}/>
          }
        />
        <VisionCard
          icon="/svgs/ads_click.svg"
          heading="Mission"
          description="Our mission is to serve the world’s children as their global arts organization, and one of our flagship programs is MyFavoriteSport."
          color="#F9E4EE"
          texture={
            <div className=" w-full absolute bottom-0 left-0">
              <Image src="/svgs/blobs/mission-blob.svg" className="w-[30%]" alt="" width={0} height={0}/>
              <div className="flex flex-row">
                <Image src="/svgs/blobs/mission-blob.svg" className="w-[30%]" alt="" width={0} height={0}/>
                <Image src="/svgs/blobs/mission-blob.svg" className="w-[30%]" alt="" width={0} height={0}/>
              </div>
            </div>
          }
        />
        <VisionCard
          icon="/svgs/diversity_1.svg"
          heading="The #MyFavoriteSport Program"
          description="This initiative was brought to life by ICAF. This program was born out of our belief in the power of art and creativity to inspire and unite young people for a prosperous, sustainable, and peaceful future."
          color="#CCEBFF"
          texture={
            <Image src="/svgs/blobs/blue-scar-blob.svg" className="w-[80%] absolute bottom-0 left-0 " alt="" width={0} height={0}/>
          }
        />
      </div>

    </section>
  );
};