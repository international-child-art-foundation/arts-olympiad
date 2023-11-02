import {StaticImageData} from "next/image";
import mandela from "../public/home/wisdom/mandela.png";
import angelou from "../public/home/wisdom/angelou.png";
import proust from "../public/home/wisdom/proust.png";

export interface IWisdom {
  url: StaticImageData
  alt: string
  author: string
  wisdomText: string
}

export const wisdomList: IWisdom[] = [
  {url: mandela, alt:"", author:"Nelson Mandela", wisdomText:"Sport has the power to change the world. It has the power to inspire. It has the power to unite people in a way that little else does. It speaks to youth in a language they understand. Sport can create hope where once there was only despair."},
  {url: angelou, alt:"", author:"Maya Angelou", wisdomText:"Find some beautiful art and admire it, and realize that that was created by human beings just like you, no more human, no less."},
  {url: proust, alt:"", author:"Marcel Proust", wisdomText:"Through art alone are we able to emerge from ourselves to know what another person sees."},
];