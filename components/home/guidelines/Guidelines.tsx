import Image from "next/image";
import img1 from "../../../public/home/guidelines/guidelines1.webp";
import img2 from "../../../public/home/guidelines/guidelines2.webp";
import img3 from "../../../public/home/guidelines/guidelines3.webp";
import blob from "../../../public/svgs/stretched-pink-blob.svg";
import {H2m} from "../../common/texts/H2m";
import {GuidelineCard} from "./GuidelineCard";
import Link from "next/link";
import vector from "../../../public/svgs/Vector.svg";
import {AnimatedScribble} from "../../common/decorations/AnimatedScribble";

export const Guidelines = () => {
  return (
    <section aria-label="Submission guidelines." className="relative px-6 md:px-12 xl:px-24 mt-36 flex flex-col">
      <Image src={blob} alt="" width={1000} className="z-0 hidden md:block absolute -top-36 left-0" />
      <H2m className="z-10 font-medium text-3xl md:text-4xl" >
        Submission Guidelines Made
        <span className="text-dark-blue relative">
          Simple
          <AnimatedScribble
            width={280}
            smwidth={180}
            className="absolute top-8 -right-8 z-10 md:w-[290px] md:h-[28px] xl:w-[340px] xl:h-[34px]"
          />
        </span>

      </H2m>
      {/*<Image*/}
      {/*  src={underline} alt=""*/}
      {/*  width={180} height={16}*/}
      {/*  className="hidden sm:block z-10 md:w-[290px] md:h-[28px] xl:w-[340px] xl:h-[34px] ml-96"*/}
      {/*/>*/}
      <figure className="z-10 mt-8 md:grid grid-cols-3 gap-6" >
        <GuidelineCard
          className="border-[#0286C3]"
          imgUrl={img1}
          heading={"How to submit"}
          description={"Follow our guide for hassle-free artwork submission."}
        >
          <Link href="https://artsolympiad.info/artwok_registration.php" className="text-main-blue text-sm lg:text-lg flex flex-row">
            Learn more here
            <Image src={vector} alt="" className="ml-4" aria-hidden />
          </Link>
        </GuidelineCard>
        <GuidelineCard
          className="border-[#168C39]"
          imgUrl={img2}
          heading={"Accepted Formats"}
          description={"We accept a variety of file formats to suit your creative process."}
        />
        <GuidelineCard
          className="border-[#EE2F4D]"
          imgUrl={img3}
          heading={"Submission Deadline"}
          description={
            <>
              Mark your calendar for
              <span className="font-bold text-[#EE2F4D]"> June 15th, 2024 </span>
              to be part of this artistic celebration.
            </>
          }
        />
      </figure>
    </section>
  );
};