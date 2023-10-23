import {H2m} from "../../common/texts/H2m";
import Image from "next/image";
import arrow from "../../../public/home/wisdom/right-inclined-arrow.svg";
import {WisdomCarousel} from "./WisdomCarousel";

export const Wisdom = () => {
  return (
    <section className="relative px-6 md:px-12 xl:px-24 mt-44 flex flex-col">
      <div className="self-center">
        <H2m className="text-center inline-block relative">
        The Art of Living: Wisdom from <span className="inline-block relative font-bold text-dark-blue">Visionary Thinkers</span>
          <Image width={60} src={arrow} alt="Arrow pointing down." className="absolute top-10 -right-20" />
        </H2m>
      </div>
      <WisdomCarousel />

    </section>
  );
};