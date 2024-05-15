import Image from "next/image";
import blueTiny from "../../public/svgs/impact-svg/blueBlob_tiny.svg";
import blueSmall from "../../public/svgs/impact-svg/blueBlob_small.svg";
import blueLarge from "../../public/svgs/impact-svg/blueBlob_large.svg";
import {AnimatedScribble} from "../../components/common/decorations/AnimatedScribble";
import { ReducePoverty } from "../../public/svgs/impact-svg/ReducePoverty";
import { Promote } from "../../public/svgs/impact-svg/Promote";
import { Bring } from "../../public/svgs/impact-svg/Bring";
import { Ensure } from "../../public/svgs/impact-svg/Ensure";
import { ReduceInequities } from "../../public/svgs/impact-svg/ReduceInequities";
import { Build } from "../../public/svgs/impact-svg/Build";
import { SubsectionLayout } from "@/app/HeaderLayout";

export const Grow = () => {
  return (
    <>
      <Image src={blueSmall} alt="" width={768} height={668} className="absolute -z-10 lg:hidden -mt-8 sm:mt-36 w-fit sm:w-full h-[668px]" />
      <Image src={blueLarge} alt="" width={1536} height={468} className="absolute -z-10 hidden lg:block mt-28 w-full 2xl:w-[1300px] h-fit" />
      <Image src={blueTiny} alt="" width={95} height={157} className="absolute -z-10 w-fit h-fit right-0 2xl:left-0 mr-[50px] mt-[300px] xsm:mt-[400px] sm:mr-[130px] sm:mt-[480px] md:mr-[200px] md:mt-[430px] lg:mr-[220px] lg:mt-[360px] xl:mr-[300px] xl:mt-[390px] mxl:mr-[320px] mxl:mt-[420px] 2xl:mt-[400px] 2xl:ml-[920px]" />
      
      <section className="mb-4 mt-32 sm:mt-56 md:mt-48 relative m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20">
        <SubsectionLayout>
          <h3 className="text-3xl font-normal leading-normal">
            Grow Creativity and Empathy to Brighten the <div className="inline-block">Future<AnimatedScribble width={210} smwidth={135} className="stroke-new-blue ml-4" /></div>
          </h3>
        </SubsectionLayout>
        <p className="text-base font-light xsm:mt-6 w-5/6 md:w-2/3 leading-normal">
          Through children's creative and empathic development, ICAF contributes to fulfilling six critical UN Social Development Goals (SDGs).  You can help extend our outreach to poorest communities.
        </p>
        <div className="grid grid-cols-2 gap-y-4 mt-8 lg:mt-10 w-5/6 md:w-2/3 mxl:w-1/2 text-xl font-semibold leading-8">
          <h4 className="col-span-2 lg:col-span-1 lg:order-1">
            <ReducePoverty /> Reduce poverty
          </h4>
          <h4 className="col-span-2 lg:col-span-1 lg:order-3">
            <Promote /> Promote good health
          </h4>
          <h4 className="col-span-2 lg:col-span-1 lg:order-5">
            <Bring /> Bring quality education
          </h4>
          <h4 className="col-span-2 lg:col-span-1 lg:order-2">
            <Ensure />Ensure gender equality
          </h4>
          <h4 className="col-span-2 lg:col-span-1 lg:order-4">
            <ReduceInequities />Reduce inequities
          </h4>
          <h4 className="col-span-2 lg:col-span-1 lg:order-6">
            <Build />Build peace in communities and the world
          </h4>
        </div>
      </section>
    </>
  );
};