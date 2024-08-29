import { StaticImageData } from "next/image";
import img1 from "../../../public/home/new-hero/Illinois.webp";
import img2 from "../../../public/home/new-hero/Virginia.webp";
import img3 from "../../../public/home/new-hero/Japan.webp";

export interface IHero {
    url: StaticImageData
    name: string
    age: number
    country: string
    alt: string
}

export type HeroImageType = IHero[]


export const IHeroArray: IHero[] = [
  {url: img1, name:"Eric Liang", age: 11, country: "Illinois", alt:"Eric Liang, age 11, Illinois"},
  {url: img2, name:"Esther Kim", age: 11, country: "Virginia", alt:"Esther Kim, age 11, Virginia"},
  {url: img3, name:"Teruhito Sekine", age:12, country: "Japan", alt:"Teruhito Sekine, age 12, Japan"},
];

export const IHeroList: HeroImageType = Array(3).fill(IHeroArray).flat();