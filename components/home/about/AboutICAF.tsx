import {H2m} from "../../common/texts/H2m";
import Image from "next/image";
import underline from "../../../public/svgs/underline.svg";
import icafLogo from "../../../public/svgs/Icaf-logo.svg";
import blob from "../../../public/svgs/blue-leg-down-blob.svg";
import {Pm} from "../../common/texts/Pm";
import {AboutImages} from "./AboutImages";

export const AboutICAF = () => {
  return (
    <section aria-label="about ICAF." className="relative flex flex-col px-6 md:px-12 xl:px-24 mt-36">
      <Image src={blob} alt="" width={1200} className="z-0 hidden md:block absolute -top-24 left-0" />
      <Image src={icafLogo} alt="ICAF Logo." width={153} height={89} className="md:hidden self-end" />
      <div className="z-10 md:flex flex-row justify-between mb-8">
        <article className="md:max-w-[70%] md:flex flex-col mr-10" >
          <H2m className="font-medium text-3xl md:text-4xl" >About <span className="text-dark-blue">#ICAF?</span></H2m>
          <Image src={underline} alt="" width={180} height={16} className="z-10 md:w-[290px] md:h-[28px] xl:w-[340px] xl:h-[34px] ml-16 md:ml-20 " />
          <Pm className="mt-8">
        Since 1997, the International Child Art Foundation has served as the national arts organization for American children and as the global arts organization for children worldwide.
          </Pm>
        </article>
        <Image src={icafLogo} alt="ICAF Logo." width={264} height={153} className="z-10 hidden md:block self-end" />
      </div>
      <AboutImages />
    </section>
  );
};