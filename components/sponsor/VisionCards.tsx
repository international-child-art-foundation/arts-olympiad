import {VisionCard} from "./VisionCard";
import Image from "next/image";


export const VisionCards = () => {
  return (
    <section
      aria-label="Our Vision and Our Goal"
      className="mt-36 relative flex flex-col px-8 md:px-12 lg:px-16 xl:px-20 mt-36 max-w-screen-2xl m-auto"
    >
      {/* <article className=" text-center md:flex flex-col mr-10" >
        <H2m className="font-medium text-3xl md:text-4xl" >Our Vision & Our <span className="relative text-dark-blue">Goal
          <AnimatedScribble width={180} className="absolute -bottom-6 -right-20 stroke-new-blue" />
        </span>

        </H2m>
      </article> */}

      <div className="flex flex-nowrap flex-col lg:flex-row justify-between mt-12">
        <VisionCard
          icon="/sponsor/purpleParis.svg"
          heading="Paris"
          description="The #MyFavoriteSport global art contest on Olympic sports launched on April 14th from an art exhibition in Paris will inspire young visitors to create their own artworks, upload them, and share with family and friends to gather votes."
          color="#F9E4EE"

          texture={
            <div className=" w-full absolute bottom-0 left-0 select-none pointer-events-none">
              <Image src="/svgs/blobs/mission-blob.svg" className="w-[30%]" alt="" width={0} height={0}/>
              <div className="flex flex-row">
                <Image src="/svgs/blobs/mission-blob.svg" className="w-[30%]" alt="" width={0} height={0}/>
                <Image src="/svgs/blobs/mission-blob.svg" className="w-[30%]" alt="" width={0} height={0}/>
              </div>
            </div>
          }
        />
        <VisionCard
          icon="/sponsor/GreenEarth.svg"
          heading="Global"
          description="The ensuing online contest will spread worldwide and could go viral, engaging millions of young artists and voters of all ages."
          color="#E4F9EA"
          texture={
            <Image src="/svgs/blobs/beginning-blob.svg" className="w-[60%] absolute bottom-0 left-0 opacity-40 select-none pointer-events-none" alt="" width={0} height={0}/>
          }
        />
        <VisionCard
          icon="/sponsor/BlueDC.svg"
          heading="Washington, D.C."
          description="The gold, silver, and bronze winners selected by public votes will be announced on June 30th at the 7th World Children’s Festival on The National Mall. The winners will get to attend the Paris Olympics, thanks to our sponsors."
          color="#CCEBFF"
          texture={
            <Image src="/svgs/blobs/blue-scar-blob.svg" className="w-[80%] absolute bottom-0 left-0 select-none pointer-events-none" alt="" width={0} height={0}/>
          }
        />
      </div>

    </section>
  );
};