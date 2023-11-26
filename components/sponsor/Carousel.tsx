"use client";
import { useState } from "react";
import Image from "next/image";
import globleIcon from "../../public/svgs/sponsor-svg/globle-icon.svg";
import bulbIcon from "../../public/svgs/sponsor-svg/bulb-icon.svg";
import medalIcon from "../../public/svgs/sponsor-svg/medal-icon.svg";

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
      <div className="z-20 mt-28 relative lg:hidden m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20">
        <Image src={medalIcon} alt="" width={100} height={100} className="z-0 absolute -top-12 left-1/2 transform -translate-x-1/2 w-[100px] h-[100px] md:hidden" />
        <div className="bg-light-pink pt-20 rounded-2xl h-fit md:pt-8 ">
          <div className="mx-5%">
            <h3 className="text-center font-medium text-3xl pb-10 md:hidden">Celebrate the Olympics!</h3>
            <div className="flex justify-center">
              <Image src={medalIcon} alt="" width={46} height={46} className="w-[46px] h-[46px] mr-4 hidden md:block" />
              <span className="font-medium text-3xl pb-4 hidden md:block mt-1">
                Celebrate the Olympics!
              </span> 
            </div>
            <ul className="mx-5% list-disc font-extralight text-lg leading-loose mb-24 md:mb-8">
              <li className="pb-1">
                Promote Olympism in your company and the Olympic values of excellence, friendship, and respect.
              </li>
              <li className="pb-1">
                Deepen employee engagement by inviting their children's participation in #MyFavoriteSport and providing exciting volunteer opportunities in Paris and Washington, D.C.
              </li>
              <li className="pb-6">
                Help fulfill Baron de Coubertin's vision of the Olympics as a global showcase of human excellence in art and sports.
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="z-20 relative lg:hidden m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20">
        <Image src={bulbIcon} alt="" width={100} height={100} className="z-0 absolute -top-12 left-1/2 transform -translate-x-1/2 w-[100px] h-[100px] md:hidden" />
        <div className="bg-baby-blue pt-20 rounded-2xl h-fit md:pt-8">
          <div className="mx-5%">
            <h3 className="text-center font-medium text-3xl pb-10 md:hidden">Brighten the Future!</h3>
            <div className="flex justify-center">
              <Image src={bulbIcon} alt="" width={46} height={46} className="w-[46px] h-[46px] mr-4 hidden md:block" />
              <span className="font-medium text-3xl pb-4 hidden md:block mt-1">
                Brighten the Future!
              </span> 
            </div>
            <ul className="mx-5% list-disc font-extralight text-lg leading-loose mb-24 md:mb-8">
              <li className="pb-1">
                Engage creative youth worldwide—a key demographic for long-term business growth.
              </li>
              <li className="pb-1">
                Deepen your company's global emotional branding that motivates young people to become your brand ambassadors.
              </li>
              <li className="pb-6">
                Grow your audience with social media posts of children's masterpieces on Olympic sports in the countdown to the Paris Olympics.
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="z-20 relative lg:hidden m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20">
        <Image src={globleIcon} alt="" width={100} height={100} className="z-0 absolute -top-12 left-1/2 transform -translate-x-1/2 w-[100px] h-[100px] md:hidden" />
        <div className="bg-light-green pt-20 rounded-2xl h-fit md:pt-8">
          <div className="mx-5%">
            <h3 className="text-center font-medium text-3xl pb-1 md:hidden">Make your mark on</h3> 
            <h3 className="text-center font-medium text-3xl pb-10 md:hidden">The National Mall!</h3> 
            <div className="flex justify-center">
              <Image src={globleIcon} alt="" width={46} height={46} className="w-[46px] h-[46px] mr-4 hidden md:block" />
              <span className="font-medium text-3xl pb-4 hidden md:block mt-1">
                Make your mark on The National Mall!
              </span> 
            </div>
            
            <ul className="mx-5% list-disc font-extralight text-lg leading-loose mb-24 md:mb-36">
              <li className="pb-1">
                Join the World Children's Festival—a celebration of creativity, diversity, and unity—with your company's "Pavilion," where creative activities and empathy training are held.
              </li>
              <li className="pb-1">
                Invite your CEO to deliver a personal "I Have a Dream" address from The National Mall.
              </li>
              <li className="pb-6">
                Gain major network exposure at the press conference where the winners are announced.
              </li>
            </ul>
          </div>
        </div>
      </div>



      <div className="realtive z-20 pt-28 pb-44 hidden lg:block m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20">
        <section className="relative">
          <div></div>
          <div className="max-w-lg mx-auto relative">
            <input id="article-01" type="checkbox" name="slider" className="sr-only peer/01" checked={isChecked1} onClick={checkHandler1}/>
            <input id="article-02" type="checkbox" name="slider" className="sr-only peer/02" checked={isChecked2} onClick={checkHandler2}/>
            <input id="article-03" type="checkbox" name="slider" className="sr-only peer/03" checked={isChecked3} onClick={checkHandler3}/>

            <div className="
              absolute inset-0 scale-[83.75%] z-20 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]                    
              peer-checked/01:relative
              peer-checked/01:z-50
              peer-checked/01:translate-x-0
              peer-checked/01:scale-100
              peer-checked/01:[&>label]:pointer-events-none
              peer-checked/02:-translate-x-64
              peer-checked/02:scale-[83.75%]
              peer-checked/02:z-40
              peer-checked/03:translate-x-64
              peer-checked/03:z-30
            ">
              <label className="absolute inset-0" htmlFor="article-01"><span className="sr-only"></span></label>
              <article className="bg-light-green p-6 rounded-2xl shadow-2xl">
                <div className="mx-5%">
                  <Image src={globleIcon} alt="" width={100} height={100} className="absolute left-1/2 transform -translate-x-1/2 w-[100px] h-[100px] -top-12" />
                  <h3 className="text-center font-medium text-3xl pt-10 pb-2">Make your mark on</h3> 
                  <h3 className="text-center font-medium text-3xl pb-2">The National Mall!</h3>                         
                  <ul className="mx-5% list-disc font-extralight text-lg leading-loose my-4">
                    <li className="pb-1">
                      Join the World Children's Festival—a celebration of creativity, diversity, and unity—with your company's "Pavilion," where creative activities and empathy training are held.
                    </li>
                    <li className="pb-1">
                      Invite your CEO to deliver a personal "I Have a Dream" address from The National Mall.
                    </li>
                    <li className="pb-4">
                      Gain major network exposure at the press conference where the winners are announced.
                    </li>
                  </ul>
                </div>
              </article>
            </div>

            <div className="
              absolute inset-0 scale-[83.75%] z-20 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]                        
              peer-checked/01:translate-x-64
              peer-checked/01:scale-[83.75%]
              peer-checked/01:z-40
              peer-checked/02:relative
              peer-checked/02:z-50
              peer-checked/02:translate-x-0
              peer-checked/02:scale-100
              peer-checked/02:[&>label]:pointer-events-none
              peer-checked/03:-translate-x-64
              peer-checked/03:scale-[83.75%]
              peer-checked/03:z-40              
            ">
              <label className="absolute inset-0" htmlFor="article-02"><span className="sr-only"></span></label>
              <article className="bg-baby-blue p-6 rounded-2xl shadow-2xl">
                <div className="mx-5%">
                  <Image src={bulbIcon} alt="" width={100} height={100} className="absolute left-1/2 transform -translate-x-1/2 w-[100px] h-[100px] -top-12" />
                  <h3 className="text-center font-medium text-3xl pt-14">Brighten the Future!</h3>
                  <ul className="mx-5% list-disc font-extralight text-lg leading-loose my-10">
                    <li className="pb-1">
                      Engage creative youth worldwide—a key demographic for long-term business growth.
                    </li>
                    <li className="pb-1">
                      Deepen your company's global emotional branding that motivates young people to become your brand ambassadors.
                    </li>
                    <li className="pb-16">
                      Grow your audience with social media posts of children's masterpieces on Olympic sports in the countdown to the Paris Olympics.
                    </li>
                  </ul>
                </div>
              </article>
            </div>

            <div className="
              absolute inset-0 scale-[83.75%] z-20 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
              peer-checked/01:-translate-x-64
              peer-checked/01:z-30
              peer-checked/02:translate-x-64
              peer-checked/02:scale-[83.75%]
              peer-checked/02:z-40
              peer-checked/03:relative
              peer-checked/03:z-50
              peer-checked/03:translate-x-0
              peer-checked/03:scale-100
              peer-checked/03:[&>label]:pointer-events-none
            ">
              <label className="absolute inset-0" htmlFor="article-03"><span className="sr-only"></span></label>
              <article className="bg-light-pink p-6 rounded-2xl shadow-2xl">
                <div className="mx-5%">
                  <Image src={medalIcon} alt="" width={100} height={100} className="absolute left-1/2 transform -translate-x-1/2 w-[100px] h-[100px] -top-12" />
                  <h3 className="text-center font-medium text-3xl py-10">Celebrate the Olympics!</h3>
                  <ul className="mx-5% list-disc font-extralight text-lg leading-loose">
                    <li className="pb-1">
                      Promote Olympism in your company and the Olympic values of excellence, friendship, and respect.
                    </li>
                    <li className="pb-1">
                      Deepen employee engagement by inviting their children's participation in #MyFavoriteSport and providing exciting volunteer opportunities in Paris and Washington, D.C.
                    </li>
                    <li className="pb-6">
                      Help fulfill Baron de Coubertin's vision of the Olympics as a global showcase of human excellence in art and sports.
                    </li>
                  </ul>
                </div>
              </article>
            </div>  
            
          </div>
        </section>

      </div>
    </>
  );
};