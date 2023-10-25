import {H2m} from "../../common/texts/H2m";
import Image from "next/image";
import arrow from "../../../public/home/wisdom/right-inclined-arrow.svg";
import {WisdomCarousel} from "./WisdomCarousel";

export const Wisdom = () => {

  return (
    <section className="px-6 md:px-12 xl:px-24 mt-44 flex flex-col">
      <div className="self-center flex items-center justify-center">
        <H2m className="text-center inline-block relative mb-6">
          The Art of Living: Wisdom from <span className="inline-block relative font-bold text-dark-blue">Visionary Thinkers</span>
          <Image
            width={80}
            src={arrow}
            alt="Arrow pointing down."
            className="hidden md:block z-50 absolute top-10 -right-20"
          />
        </H2m>
        <Image width={30} src={arrow} alt=" Arrow pointing down." className="block md:hidden ml-2" />
      </div>
      <WisdomCarousel />

    </section>
  );

  // <section className="px-6 md:px-12 xl:px-24 mt-44 flex flex-col">
  //   <div className="self-center">
  //     <H2m className="text-center inline-block relative">
  //       The Art of Living: Wisdom from <span className="inline-block relative font-bold text-dark-blue">Visionary Thinkers</span>
  //       <Image width={60} src={arrow} alt="Arrow pointing down." className="absolute top-10 -right-20" />
  //     </H2m>
  //   </div>
  //   <WisdomCarousel />
  //
  // </section>

};