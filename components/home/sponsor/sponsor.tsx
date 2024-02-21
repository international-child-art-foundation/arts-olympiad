import Image from "next/image";
import {H2m} from "../../common/texts/H2m";
import sponsorLogo from "../../../public/home/sponsor/icaf_sponsor_logo_large.png";
import yourLogoHere from "../../../public/home/sponsor/your-logo-here.webp";
import gymnast from "../../../public/home/sponsor/Gymnast.webp";

export const Sponsor = () => {
  return (
    <div className="relative my-16 pt-6 mb-36 md:mb-16">
      <div className="absolute inset-x-0 mx-auto h-full w-auto bg-[#E4F9EA]">
      </div>
      <section className="relative py-0 my-0 px-8 md:px-12 lg:px-16 xl:px-20 max-w-screen-2xl m-auto w-full">
        <H2m className="z-10 font-medium text-3xl md:text-4xl  my-8 font-montserrat" >Sponsors</H2m>
        <div className="block lg:flex flex-col">
          <div className="flex gap-4 max-w-80% md:max-w-[50%]">
            <Image className="w-1/2" src={sponsorLogo} alt="" width={280} height={232}/>
            <Image className="w-1/2" src={yourLogoHere} alt="" width={280} height={232}/>
          </div>
          <Image className="mx-auto lg:absolute -bottom-16 right-0 lg:max-w-[38%] max-w-[100%] w-[500px] lg:w-[50%] lg:max-w-unset" src={gymnast} alt=""/>
        </div>
      </section>
    </div>
  );
};
