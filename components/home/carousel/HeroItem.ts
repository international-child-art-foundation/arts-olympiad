import { StaticImageData } from "next/image";
import img1 from "../../../public/home/new-hero/Joseph Dexo Yowom, 11, Ghana, UNITY.webp";
import img2 from "../../../public/home/new-hero/Theo Hector Grosso, 11, MESSI IS THE BEST.webp";
import img3 from "../../../public/home/new-hero/Julia Alvarez Ramirez, 8, Texas, USA, GOAL.webp";
import img4 from "../../../public/home/new-hero/Anouk Thunder, 11, Germany, FOOTBALL UNIVERSE.webp";

export interface IHero {
  url: StaticImageData;
  name: string;
  age: number;
  title?: string;
  country?: string;
  alt: string;
}

export type HeroImageType = IHero[];

export const IHeroArray: IHero[] = [
  {
    url: img1,
    name: "Joseph Dexo Yowom",
    age: 11,
    country: "Ghana",
    title: "Unity",
    alt: "",
  },
  {
    url: img2,
    name: "Theo Hector Grosso",
    age: 11,
    title: "Messi is the Best!",
    alt: "",
  },
  {
    url: img3,
    name: "Julia Alvarez Ramirez",
    age: 8,
    country: "Texas, USA",
    title: "GOAL!",
    alt: "",
  },
  {
    url: img4,
    name: "Anouk Thunder",
    age: 11,
    country: "Germany",
    title: "Football Universe",
    alt: "",
  },
];

export const IHeroList: HeroImageType = Array(3).fill(IHeroArray).flat();
