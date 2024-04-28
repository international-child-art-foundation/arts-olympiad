import {StaticImageData} from "next/image";
import GymnasticsGirl from "../../../public/impact/GymnasticsGirl.png";
import OlympicRings from "../../../public/impact/OlympicRings.png";
import SwimMan from "../../../public/impact/SwimMan.png";
import PurpleEarth from "../../../public/impact/PurpleEarth.png";
// import YellowThree from "../../../public/impact/YellowThree.png"
import FootBall from "../../../public/impact/FootBall.png";
import ColorfulButterfly from "../../../public/impact/ColorfulButterfly.png";
import ColorfulBike from "../../../public/impact/ColorfulBike.png";
import ChildrensWorld from "../../../public/impact/ChildrensWorld.png";
import BlueRings from "../../../public/impact/BlueRings.png";
import Tennessee from "../../../public/impact/Tennessee.png";
import RedTennis from "../../../public/impact/RedTennis.png";
import FlyKids from "../../../public/impact/FlyKids.png";
import YellowTennis from "../../../public/impact/YellowTennis.png";
import Surfing from "../../../public/impact/Surfing.png";
import SwimGlass from "../../../public/impact/SwimGlass.png";
import Poland from "../../../public/impact/Poland.png";
import BlackHeart from "../../../public/impact/BlackHeart.png";

export interface IWisdom {
  url: StaticImageData
  alt: string
  author: string
  wisdomText: string
}

export const wisdomList: IWisdom[] = [
  {url: GymnasticsGirl, alt:"", author:"Diana Nabulsi", wisdomText:"Age 11 | Texas, USA"},
  {url: OlympicRings, alt:"", author:"Chung Kei Ting", wisdomText:"Age 10 | China"},
  {url: SwimMan, alt:"", author:"Arjaa Raghu", wisdomText:"Age 11 | Illinois, USA"},
  {url: PurpleEarth, alt:"", author:"Michael Wong", wisdomText:"Age 11 | New York, USA"},
  // {url: YellowThree, alt:"", author:"Ashling Sophia Kelly", wisdomText:"Age 12 | Arizona, USA"},
  {url: FootBall, alt:"", author:"Isra Nadeem", wisdomText:"Age 13 | UAE"},
  {url: ColorfulButterfly, alt:"", author:"UNKNOWN NAME", wisdomText:"Age Unknown | Poland (Winner)"},
  {url: ColorfulBike, alt:"", author:"Unknown", wisdomText:"Age Unknown | Unknown Location"},
  {url: ChildrensWorld, alt:"", author:"Children's World Mural", wisdomText:"ICAF"},
  {url: BlueRings, alt:"", author:"Deniz Tamerk", wisdomText:"Age 11 | Turkey"},
  {url: Tennessee, alt:"", author:"Zachary Cyganek", wisdomText:"Age 9 | Tennessee, USA"},
  {url: RedTennis, alt:"", author:"Wen Hui Mar", wisdomText:"Age 10 | Singapore"},
  {url: FlyKids, alt:"", author:"Jainong Qui", wisdomText:"Age 7 | China"},
  {url: YellowTennis, alt:"", author:"Trevor Yo Heng Ang", wisdomText:"Age 9 | Singapore"},
  {url: Surfing, alt:"", author:"Jeremy Simon", wisdomText:"Age 10 | Connecticut, USA"},
  {url: SwimGlass, alt:"", author:"Davika Ritcher", wisdomText:"Age 10 | Minnesota, USA"},
  {url: Poland, alt:"", author:"Patryk Jabkonka", wisdomText:"Age 8 | Poland"},
  {url: BlackHeart, alt:"", author:"Annacarolina Israel", wisdomText:"Age 11 | Brazil"},
];