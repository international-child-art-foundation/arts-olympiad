import {StaticImageData} from "next/image";
import GymnasticsGirl from "../public/impact/GymnasticsGirl.png";
import OlympicRings from "../public/impact/OlympicRings.png";
import SwimMan from "../public/impact/SwimMan.png";
import PurpleEarth from "../public/impact/PurpleEarth.png";
// import YellowThree from "../public/impact/YellowThree.png"
import FootBall from "../public/impact/FootBall.png";
import ColorfulButterfly from "../public/impact/ColorfulButterfly.png";
import ColorfulBike from "../public/impact/ColorfulBike.png";
import ChildrensWorld from "../public/impact/ChildrensWorld.png";
import BlueRings from "../public/impact/BlueRings.png";
import Tennessee from "../public/impact/Tennessee.png";
import RedTennis from "../public/impact/RedTennis.png";
import FlyKids from "../public/impact/FlyKids.png";
import YellowTennis from "../public/impact/YellowTennis.png";
import Surfing from "../public/impact/Surfing.png";
import SwimGlass from "../public/impact/SwimGlass.png";
import Poland from "../public/impact/Poland.png";
import BlackHeart from "../public/impact/BlackHeart.png";

interface ArtistShowcaseItemInterface {
  url: StaticImageData
  alt: string
  author: string | undefined;
  age: number | undefined;
  location: string | undefined;
}

export const artistShowcaseList: ArtistShowcaseItemInterface[] = [
  {url: GymnasticsGirl, alt:"", author:"Diana Nabulsi", age:11, location:"Texas, USA"},
  {url: OlympicRings, alt:"", author:"Chung Kei Ting", age:10, location:"China"},
  {url: SwimMan, alt:"", author:"Arjaa Raghu", age:11, location:"Illinois, USA"},
  {url: PurpleEarth, alt:"", author:"Michael Wong", age:11, location:"New York, USA"},
  // {url: YellowThree, alt:"", author:"Ashling Sophia Kelly", wisdomText:"Age 12 | Arizona, USA"},
  {url: FootBall, alt:"", author:"Isra Nadeem", age:13, location:"Age 13 | UAE"},
  {url: ColorfulButterfly, alt:"", author:undefined, age:undefined, location:"Poland"},
  {url: ColorfulBike, alt:"", author:undefined, age:undefined, location:undefined},
  {url: ChildrensWorld, alt:"", author:"Children's World Mural", age:undefined, location:"ICAF"},
  {url: BlueRings, alt:"", author:"Deniz Tamerk", age:11, location:"Turkey"},
  {url: Tennessee, alt:"", author:"Zachary Cyganek", age:9, location:"Tennessee, USA"},
  {url: RedTennis, alt:"", author:"Wen Hui Mar", age:10, location:"Singapore"},
  {url: FlyKids, alt:"", author:"Jainong Qui", age:7, location:"China"},
  {url: YellowTennis, alt:"", author:"Trevor Yo Heng Ang", age:9, location:"Singapore"},
  {url: Surfing, alt:"", author:"Jeremy Simon", age:10, location:"Connecticut, USA"},
  {url: SwimGlass, alt:"", author:"Davika Ritcher", age:10, location:"Minnesota, USA"},
  {url: Poland, alt:"", author:"Patryk Jabkonka", age:8, location:"Poland"},
  {url: BlackHeart, alt:"", author:"Annacarolina Israel", age:11, location:"Brazil"},
];