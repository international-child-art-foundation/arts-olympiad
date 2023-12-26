"use client";
import { useState } from "react";
import Image from "next/image";
import purpleBlob from "../../public/svgs/impact-svg/purpleBlob.svg";
import purpleBG from "../../public/svgs/impact-svg/purpleBG.svg";
import greenBlob from "../../public/svgs/impact-svg/greenBlob.svg";
import blueBlob from "../../public/svgs/impact-svg/blueBlob.svg";
import yellowDots from "../../public/svgs/impact-svg/yellowDots.svg";
import childArt from "../../public/svgs/impact-svg/childArt.svg";
import blub from "../../public/svgs/impact-svg/blub.svg";

export const Carousel = () => {
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(true);

  const checkHandler1 = () => {
    if (!isChecked1){
      setIsChecked1(true);
      setIsChecked2(false);
      setIsChecked3(false);
    }
  };

  const checkHandler2 = () => {
    if (!isChecked2){
      setIsChecked2(true);
      setIsChecked1(false);
      setIsChecked3(false);
    }
  };

  const checkHandler3 = () => {
    if (!isChecked3){
      setIsChecked3(true);
      setIsChecked1(false);
      setIsChecked2(false);
    }
  };

  return (
    <>
      <Image src={purpleBG} alt="" width={1536} height={432} className="absolute -z-10 w-full md:w-4/5 lg:w-1/2 mxl:w-2/5 h-fit mt-28" />
      <h2 className="text-3xl font-normal md:text-[42px] md:font-medium mt-48 z-10 max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20">
        Elevating Youth Voices
      </h2>
      <p className="mt-4 text-base font-light md:text-lg md:font-normal z-10 max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20">
        Showcasing Children’s Talents
      </p>

      <div className="realtive z-20 pt-8 pb-44 m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20">
        <section className="relative hidden lg:block">
          <div className="lg:max-w-md xl:max-w-lg 2xl:max-w-xl mx-auto relative">
            <input id="article-01" type="checkbox" name="slider" className="sr-only peer/01" checked={isChecked1} onClick={checkHandler1}/>
            <input id="article-02" type="checkbox" name="slider" className="sr-only peer/02" checked={isChecked2} onClick={checkHandler2}/>
            <input id="article-03" type="checkbox" name="slider" className="sr-only peer/03" checked={isChecked3} onClick={checkHandler3}/>

            <div className="
              absolute inset-0 scale-[67%] z-10 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]                    
              peer-checked/01:relative
              peer-checked/01:z-30
              peer-checked/01:translate-x-0
              peer-checked/01:scale-100
              peer-checked/01:[&>label]:pointer-events-none
              peer-checked/02:-translate-x-64
              peer-checked/02:scale-[67%]
              peer-checked/02:z-10
              peer-checked/03:translate-x-64
              peer-checked/03:z-10
            ">
              <label className="absolute inset-0" htmlFor="article-01"><span className="sr-only"></span></label>
              <article className="bg-baby-blue p-6 rounded-2xl shadow-2xl">
                <Image src={blueBlob} alt="" width={1536} height={432} className="absolute z-0 w-fit h-fit -mt-6 -ml-6 pointer-events-none rounded-2xl " />
                <div className="relative mx-10% pointer-events-none">
                  <h3 className="font-semibold text-2xl mt-14">
                    World Children’s Festival
                  </h3>                      
                  <p className="text-base my-6">
                    Learn more about the World Children’s Festival,  the World Children’s Award, and our research and publications promoting STEAMS education that integrates Arts and Sports with STEM disciplines.
                  </p>
                  <div className="mb-20">
                    <a href="#" className="w-fit h-fit border rounded text-center py-3 px-4 text-xs font-normal cursor-pointer bg-new-blue text-neutral-white"> 
                      Learn More
                    </a>
                  </div>
                  <Image src={blub} alt="" width={1536} height={432} className="absolute z-10 w-1/4 -mt-28 ml-60 pointer-events-none" />
                </div>
              </article>
            </div>

            <div className="
              absolute inset-0 scale-[67%] z-10 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]                        
              peer-checked/01:translate-x-64
              peer-checked/01:scale-[67%]
              peer-checked/01:z-10
              peer-checked/02:relative
              peer-checked/02:z-30
              peer-checked/02:translate-x-0
              peer-checked/02:scale-100
              peer-checked/02:[&>label]:pointer-events-none
              peer-checked/03:-translate-x-64
              peer-checked/03:scale-[67%]
              peer-checked/03:z-10              
            ">
              <label className="absolute inset-0" htmlFor="article-02"><span className="sr-only"></span></label>
              <article className="bg-light-green p-3 rounded-2xl shadow-2xl">
                <Image src={greenBlob} alt="" width={1536} height={432} className="absolute z-0 w-fit h-fit -mt-3 -ml-3 pointer-events-none" />
                <div className="relative mx-10% pointer-events-none">
                  <h3 className="font-semibold text-2xl mt-14">
                    Broaden Horizons with Art
                  </h3>
                  <p className="text-base my-8">
                    Use teaching materials from ChildArt magazine to enrich your curriculum and introduce students to the power of art in understanding cultural diversity and global issues.
                  </p>
                  <div className="mb-20">
                    <a href="https://www.icaf.org/mission/arts-olympiad" className="w-fit h-fit border rounded text-center py-3 px-4 text-xs font-normal cursor-pointer bg-new-blue text-neutral-white"> 
                      Access Supplements
                    </a>
                  </div>
                </div>
              </article>
            </div>

            <div className="
              absolute inset-0 scale-[67%] z-10 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
              peer-checked/01:-translate-x-64
              peer-checked/01:z-10
              peer-checked/02:translate-x-64
              peer-checked/02:scale-[67%]
              peer-checked/02:z-10
              peer-checked/03:relative
              peer-checked/03:z-30
              peer-checked/03:translate-x-0
              peer-checked/03:scale-100
              peer-checked/03:[&>label]:pointer-events-none
            ">
              <label className="absolute inset-0" htmlFor="article-03"><span className="sr-only"></span></label>
              <article className="bg-[#FFEA8B] p-3 rounded-2xl shadow-2xl">
                <Image src={yellowDots} alt="" width={1536} height={432} className="absolute z-0 w-fit h-fit -mt-3 -ml-3 pointer-events-none" />
                <div className="relative mx-10% pointer-events-none">
                  <h3 className="font-semibold text-2xl mt-14">
                    ChildArt Magazine’s Teaching Supplements
                  </h3>
                  <p className="text-base my-8">
                    ICAF offers a range of programs and initiatives that harness the power of art and creativity to positively impact children's lives.
                  </p>
                  <div className="mb-20">
                    <a href="https://www.icaf.org/mission/childart-magazine" className="w-fit h-fit border rounded text-center py-3 px-4 text-xs font-normal cursor-pointer bg-new-blue text-neutral-white"> 
                      Subscribe
                    </a>
                  </div>
                  <Image src={childArt} alt="" width={1536} height={432} className="absolute z-10 w-3/5 -mt-28 ml-32 pointer-events-none" />
                </div>
              </article>
            </div>  
            
          </div>
        </section>
        
        <section className="overflow-hidden lg:hidden z-20 m-auto max-w-screen-2xl ">
          
          <article className="bg-light-green p-3 rounded-2xl">
            <Image src={greenBlob} alt="" width={1536} height={432} className="absolute z-0 w-fit h-1/3 -mt-3 -ml-3" />
            <div className="relative mx-5%">
              <h3 className="font-semibold text-2xl mt-10">
                Broaden Horizons with Art
              </h3>
              <p className="text-base mt-6 w-11/12">
                Use teaching materials from ChildArt magazine to enrich your curriculum and introduce students to the power of art in understanding cultural diversity and global issues.
              </p>
              <div className="mt-8 mb-12">
                <a href="https://www.icaf.org/mission/arts-olympiad" className="w-fit h-fit border rounded text-center py-3 px-4 text-xs font-normal cursor-pointer bg-new-blue text-neutral-white"> 
                  Access Supplements
                </a>
              </div>
            </div>
          </article>

          <article className="bg-baby-blue p-3 rounded-2xl mt-10">
            <Image src={blueBlob} alt="" width={1536} height={432} className="absolute z-0 w-fit h-fit -mt-3 -ml-3 rounded-2xl" />
            <div className="relative mx-5%">
              <h3 className="font-semibold text-2xl mt-10">
                World Children’s Festival
              </h3>                      
              <p className="text-base mt-6 w-11/12">
                Learn more about the World Children’s Festival,  the World Children’s Award, and our research and publications promoting STEAMS education that integrates Arts and Sports with STEM disciplines.
              </p>
              <div className="mt-8 mb-12">
                <a href="#" className="w-fit h-fit border rounded text-center py-3 px-4 text-xs font-normal cursor-pointer bg-new-blue text-neutral-white"> 
                  Learn More
                </a>
              </div>
              <Image src={blub} alt="" width={1536} height={432} className="absolute z-10 w-1/5 md:w-1/6 -bottom-4 sm:-bottom-8 md:-bottom-12 right-0" />
            </div>
          </article>

          <article className="bg-[#FFEA8B] p-3 rounded-2xl mt-10">
            <Image src={yellowDots} alt="" width={1536} height={432} className="absolute z-0 w-fit h-1/4 -mt-3 -ml-3" />
            <div className="relative mx-5%">
              <h3 className="font-semibold text-2xl mt-10">
                ChildArt Magazine’s Teaching Supplements
              </h3>
              <p className="text-base mt-6 w-11/12">
                ICAF offers a range of programs and initiatives that harness the power of art and creativity to positively impact children's lives.
              </p>
              <div className="mt-8 mb-12">
                <a href="https://www.icaf.org/mission/childart-magazine" className="w-fit h-fit border rounded text-center py-3 px-4 text-xs font-normal cursor-pointer bg-new-blue text-neutral-white"> 
                  Subscribe
                </a>
              </div>
              <Image src={childArt} alt="" width={1536} height={432} className="absolute z-10 w-3/5 -mt-28 ml-32 md:-mt-32 md:ml-48" />
            </div>
          </article>
        </section>

      </div>

      <Image src={purpleBlob} alt="" width={1536} height={432} className="absolute -z-10 -mt-52 sm:-mt-80 lg:-mt-96 right-0 w-1/4 h-fit" />
    </>
  );
};