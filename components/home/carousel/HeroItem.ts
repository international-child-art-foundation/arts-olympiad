import { StaticImageData } from "next/image";
import img1 from "../../../public/home/new-hero/Texas (Diana Nabulsi, 11).webp";
import img2 from "../../../public/home/new-hero/ARJAA Raghu (11, Illinois).webp";
import img3 from "../../../public/home/new-hero/Denys Kovalchuk (12, Ukraine).webp";
import img4 from "../../../public/home/new-hero/ESTHER Kim (11, Virginia).webp";
import img5 from "../../../public/home/new-hero/Kristina Gechevska (age 11) Bulgaria.webp";

export interface IHero {
  url: StaticImageData;
  name: string;
  age: number;
  title?: string;
  country?: string;
  alt: string;
  positionClass?: string;
}

export type HeroImageType = IHero[];

export const IHeroArray: IHero[] = [
  {
    url: img1,
    name: "Diana Nabulsi",
    age: 11,
    country: "Texas, United States",
    alt: "",
    positionClass: "object-[center_80%]",
  },
  {
    url: img2,
    name: "Arjaa Raghu",
    age: 11,
    country: "Illinois, United States",
    alt: "",
    positionClass: "object-center",
  },
  {
    url: img3,
    name: "Denys Kovalchuk",
    age: 12,
    country: "Ukraine",
    alt: "",
    positionClass: "object-top",
  },
  {
    url: img4,
    name: "Esther Kim",
    age: 11,
    country: "Virginia, United States",
    alt: "",
    positionClass: "object-top",
  },
  {
    url: img5,
    name: "Kristina Gechevska",
    age: 11,
    country: "Bulgaria",
    alt: "",
  },
];

export const IHeroList: HeroImageType = Array(3).fill(IHeroArray).flat();
