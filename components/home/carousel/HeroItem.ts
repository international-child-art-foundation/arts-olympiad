import { StaticImageData } from 'next/image'
import img1 from "../../../public/home/new-hero/Illinois.png"
import img2 from "../../../public/home/new-hero/Virginia.png"
import img3 from "../../../public/home/new-hero/Japan.png"

export interface IHero {
    url: StaticImageData
    name: string
    age: number
    country: string
    alt: string
}


const IHeroArray: IHero[] = [
    {url: img1, name:"Eric Liang", age: 11, country: "Illinois", alt:"Eric Liang, age 11, Illinois"},
    {url: img2, name:"Esther Kim", age: 11, country: "Virginia", alt:"Esther Kim, age 11, Virginia"},
    {url: img3, name:"Teruhito Sekine", age:12, country: "Japan", alt:"Teruhito Sekine, age 12, Japan"},   
]

export const IHeroList: IHero[] = Array(3).fill(IHeroArray).flat()