import { StaticImageData } from "next/image";
import img1 from "../../../public/home/new-hero/Georgia.webp";
import img2 from "../../../public/home/new-hero/Arizona.webp";
import img3 from "../../../public/home/new-hero/Virginia.webp";

export interface IHero {
  url: StaticImageData;
  name: string;
  age: number;
  country: string;
  alt: string;
}

export type HeroImageType = IHero[];

export const IHeroArray: IHero[] = [
  {
    url: img1,
    name: "Natalia Luo",
    age: 9,
    country: "Georgia",
    alt: "Natalia Luo, age 9, Georgia",
  },
  {
    url: img2,
    name: "Aishling Kelly",
    age: 11,
    country: "Arizona",
    alt: "Aishling Kelly, age 11, Arizona",
  },
  {
    url: img3,
    name: "Esther Kim",
    age: 11,
    country: "Virginia",
    alt: "Esther Kim, age 11, Virginia",
  },
];

export const IHeroList: HeroImageType = Array(3).fill(IHeroArray).flat();
