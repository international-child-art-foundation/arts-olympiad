import {StaticImageData} from "next/image";
import GymnasticsGirl from "../../../public/impact/GymnasticsGirl.webp";
import OlympicRings from "../../../public/impact/OlympicRings.webp";
import SwimMan from "../../../public/impact/SwimMan.webp";
import PurpleEarth from "../../../public/impact/PurpleEarth.webp";
// import YellowThree from "../../../public/impact/YellowThree.png"
// import FootBall from "../../../public/impact/Football.webp";
import ColorfulButterfly from "../../../public/impact/ColorfulButterfly.webp";
import ChildrensWorld from "../../../public/impact/ChildrensWorld.webp";
import BlueRings from "../../../public/impact/BlueRings.webp";
import Tennessee from "../../../public/impact/Tennessee.webp";
import RedTennis from "../../../public/impact/RedTennis.webp";
import FlyKids from "../../../public/impact/FlyKids.webp";
import YellowTennis from "../../../public/impact/YellowTennis.webp";
import Surfing from "../../../public/impact/Surfing.webp";
import SwimGlass from "../../../public/impact/SwimGlass.webp";
import Poland from "../../../public/impact/Poland.webp";
import BlackHeart from "../../../public/impact/BlackHeart.webp";

export interface IWisdom {
  id: number
  url: StaticImageData
  alt: string
  author: string
  wisdomText: string
}

export const wisdomList: IWisdom[] = [
  {id:1, url: GymnasticsGirl, alt:"", author:"Diana Nabulsi", wisdomText:"Age 11 | Texas, USA"},
  {id:2, url: OlympicRings, alt:"", author:"Chung Kei Ting", wisdomText:"Age 10 | China"},
  {id:3, url: SwimMan, alt:"", author:"Arjaa Raghu", wisdomText:"Age 11 | Illinois, USA"},
  {id:4, url: PurpleEarth, alt:"", author:"Michael Wong", wisdomText:"Age 11 | New York, USA"},
  // {url: YellowThree, alt:"", author:"Ashling Sophia Kelly", wisdomText:"Age 12 | Arizona, USA"},
  // {id:5, url: FootBall, alt:"", author:"Isra Nadeem", wisdomText:"Age 13 | UAE"},
  {id:6, url: ColorfulButterfly, alt:"", author:"UNKNOWN NAME", wisdomText:"Age Unknown | Poland (Winner)"},
  // {url: ColorfulBike, alt:"", author:"Unknown", wisdomText:"Age Unknown | Unknown Location"},
  {id:7, url: ChildrensWorld, alt:"", author:"Children's World Mural", wisdomText:"ICAF"},
  {id:8, url: BlueRings, alt:"", author:"Deniz Tamerk", wisdomText:"Age 11 | Turkey"},
  {id:9, url: Tennessee, alt:"", author:"Zachary Cyganek", wisdomText:"Age 9 | Tennessee, USA"},
  {id:10, url: RedTennis, alt:"", author:"Wen Hui Mar", wisdomText:"Age 10 | Singapore"},
  {id:11, url: FlyKids, alt:"", author:"Jainong Qui", wisdomText:"Age 7 | China"},
  {id:12, url: YellowTennis, alt:"", author:"Trevor Yo Heng Ang", wisdomText:"Age 9 | Singapore"},
  {id:13, url: Surfing, alt:"", author:"Jeremy Simon", wisdomText:"Age 10 | Connecticut, USA"},
  {id:14, url: SwimGlass, alt:"", author:"Davika Ritcher", wisdomText:"Age 10 | Minnesota, USA"},
  {id:15, url: Poland, alt:"", author:"Patryk Jabkonka", wisdomText:"Age 8 | Poland"},
  {id:16, url: BlackHeart, alt:"", author:"Annacarolina Israel", wisdomText:"Age 11 | Brazil"},
];