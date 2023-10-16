import img1 from "../../../public/home/why-participate/why-participate1.webp";
import img2 from "../../../public/home/why-participate/why-participate2.webp";
import img3 from "../../../public/home/why-participate/why-participate3.webp";
import {LazyImage} from "../../common/images/LazyImage";

export const SideImages = () => {
  return (
    <figure className="hidden lg:flex relative">
      <LazyImage imageUrl={img1} className="z-10 max-w-[233px] max-h-[252px] xl:max-w-[349px] xl:max-h-[378px] absolute top-0 right-0" alt="" />
      <LazyImage imageUrl={img2} className="z-10 max-w-[207px] max-h-[265px] xl:max-w-[310px] xl:max-h-[379px] absolute top-32 right-48 xl:top:48 xl:right-64" alt="" />
      <LazyImage imageUrl={img3} className="z-10 max-w-[216px] max-h-[291px] xl:max-w-[324px] xl:max-h-[436px] absolute top-56 right-0 xl:top-72" alt="" />
    </figure>
  );
};