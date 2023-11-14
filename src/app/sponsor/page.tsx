import Image from "next/image";
import hashtag from "../../../public/home/hashtag.svg";
import yellowBGmobile from "../../../public/svgs/sponsor-yellowBG-mobile.svg";
import yellowBGipad from "../../../public/svgs/sponsor-yellowBG-ipad.svg";
import yellowBGtablet from "../../../public/svgs/sponsor-yellowBG-tablet.svg";
import yellowBGsmall from "../../../public/svgs/sponsor-yellowBG-small.svg";
import yellowBGlarge from "../../../public/svgs/sponsor-yellowBG-large.svg";
import yellowBlob from "../../../public/svgs/sponsor-yellowblob.svg";
import orangeBlob from "../../../public/svgs/sponsor-orangeblob.svg";
import greenBlob from "../../../public/svgs/sponsor-greenblob.svg";
import blueBG from "../../../public/svgs/sponsor-blueblob.svg";
import blueBGmobile from "../../../public/svgs/sponsor-blueblob-mobile.svg";
import globleIcon from "../../../public/svgs/globle-icon.svg";
import bulbIcon from "../../../public/svgs/bulb-icon.svg";
import medalIcon from "../../../public/svgs/medal-icon.svg";
import icafLogo from "../../../public/svgs/Icaf-logo.svg";
import { DownIcon } from "../../../components/svgs/DownIcon2";
import { UpIcon } from "../../../components/svgs/UpIcon2";
import { HeartIconWhite } from "../../../components/svgs/HeartIconWhite";

import {H2m} from "../../../components/common/texts/H2m";
import {AnimatedScribble} from "../../../components/common/decorations/AnimatedScribbleOrange";


export default function sponsorPage() {
  return (
    <div className="relative bg-neutral-white max-w-screen-2xl z-0 overflow-hidden mx-auto">
      <Image src={yellowBGmobile} alt="" width={767} height={446} className="absolute sm:hidden -top" />
      <Image src={yellowBGipad} alt="" width={1023} height={333} className="absolute hidden sm:block lg:hidden -top" />
      <Image src={yellowBGtablet} alt="" width={1279} height={377} className="absolute hidden lg:block xl:hidden -top" />
      <Image src={yellowBGsmall} alt="" width={1536} height={432} className="absolute hidden xl:block 2xl:hidden -top w-full" />
      <Image src={yellowBGlarge} alt="" width={1536} height={432} className="absolute hidden 2xl:block -top w-full" />
      
      <div className="grid grid-cols-2 px-5% mx-auto z-20 relative mt-10">

        <div className="col-span-2 sm:col-span-1 md:mt-8">
          <h1 className="flex-col z-20 font-semibold mb-4 text-4xl xl:text-5xl">
            Sponsor
          </h1>
          <div className="z-20 flex flex-row align-center mb-8">
            <Image src={hashtag} alt="" width={32} height={32}  />
            <h1 className="z-20 break-words font-semibold text-3xl xsm:text-4xl lg:text-5xl xl:text-6xl">
                MyFavoriteSport<span className="sr-only">.</span>
            </h1>
          </div>
          <div className="w-auto mb-8 z-20">
            <h2 className="z-20 font-light text-lg lg:w-4/5 mxl:w-1/2">
                Engage creative youth worldwide — a critical demographic for your company's global emotional branding and sustained growth.
            </h2>
          </div>
        </div>

        <div className="col-span-2 mx-auto z-20 sm:col-span-1 sm:ml-10 sm:mt-10 lg:ml-0">            
          <Image src="/photo-sponsor.png" width = {390} height = {271} className="w-full rounded-full shadow-[8px_18px_0_-6px_rgba(251,178,46,1)]" alt="photo" />
        </div>
      </div>

      <h2 className="px-5% xl:px-10% mx-auto font-extralight text-lg leading-loose pt-24 sm:pt-40">
        The global art contest <span className="font-semibold">#MyFavoriteSport</span> begins in <span className="font-semibold">March 2024</span> at an interactive exhibition in Paris, where young visitors produce and upload their artwork and share it with family and friends to get their votes.
      </h2>
      
      <h2 className="px-5% xl:px-10% mx-auto font-extralight text-lg leading-loose mt-10 mb-5 xl:mb-10">
        Over the next three months, this "Create & Share" activity will spread worldwide and can go viral, engaging millions. The winners selected by public votes will be announced on July 1st at a press conference at the National Mall across the U.S. Capitol during the 7th World Children's Festival. With your support, the gold, silver, and bronze winners will attend the Paris Olympics.
      </h2>



      <div className="relative mb-80">
        <Image src={blueBGmobile} alt="" width={685} height={737} className="z-0 absolute w-full h-max sm:hidden " />

        <Image src={blueBG} alt="" width={685} height={737} className="z-0 absolute hidden sm:block w-full h-max md:w-5/6 mxl:w-3/4 mb-10" />
                    
        <div className="z-10 mx-5% pt-28 xsm:block sm:hidden">
          <H2m className="absolute font-medium text-3xl" >The Sponsorship</H2m>
          <H2m className="absolute font-medium text-3xl mt-10" >Advantage</H2m>
          <AnimatedScribble width={280} smwidth={180} className="absolute mt-20 ml-6" />
        </div>

        <div className="z-10 pt-12 mx-5% xl:mx-10% sm:pt-20 md:pt-28 hidden sm:block">
          <H2m className="absolute font-medium text-3xl md:text-4xl" >The Sponsorship Advantage</H2m>
          <AnimatedScribble width={280} smwidth={180} className="absolute mt-10 ml-72 md:ml-68 lg:ml-60" />
        </div>

        <div className="absolute mt-24 h-[100px] sm:h-[50px] sm:mt-16 mx-3% xl:mx-8% w-[6px] bg-main-orange "></div>
        <div className="absolute mt-32 sm:mt-16 sm:pl-4 mx-5% xl:mx-10% text-lg font-semibold text-new-blue">
            People don’t just want to be spectators.
        </div>
        <div className="absolute mt-48 xsm:mt-40 sm:pl-4 ml-36 sm:mt-24 sm:mx-5% xl:mx-10% text-sm fond-thin text-new-blue">
            — Paris 2024 CEO Étienne Thobois
        </div>
      </div>

      <div className="relative lg:hidden">
        <Image src={medalIcon} alt="" width={100} height={100} className="z-0 absolute -top-12 left-1/2 transform -translate-x-1/2 w-[100px] h-[100px] md:hidden" />
        <div className="bg-light-pink pt-20 mx-5% rounded-2xl w-11/12 h-fit md:pt-8 ">
          <div className="mx-5%">
            <h3 className="text-center font-medium text-3xl pb-10 md:hidden">Celebrate the Olympics!</h3>
            <div className="flex justify-center">
              <Image src={medalIcon} alt="" width={46} height={46} className="w-[46px] h-[46px] mr-4 hidden md:block " />
              <span className="font-medium text-3xl pb-4 hidden md:block mt-1">
                Celebrate the Olympics!
              </span> 
            </div>
            <ul className="mx-5% list-disc font-extralight text-lg leading-loose mb-28">
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

      <div className="relative lg:hidden">
        <Image src={bulbIcon} alt="" width={100} height={100} className="z-0 absolute -top-12 left-1/2 transform -translate-x-1/2 w-[100px] h-[100px] md:hidden" />
        <div className="bg-baby-blue pt-20 mx-5% rounded-2xl w-11/12 h-fit md:pt-8">
          <div className="mx-5%">
            <h3 className="text-center font-medium text-3xl pb-10 md:hidden">Brighten the Future!</h3>
            <div className="flex justify-center">
              <Image src={bulbIcon} alt="" width={46} height={46} className="w-[46px] h-[46px] mr-4 hidden md:block" />
              <span className="font-medium text-3xl pb-4 hidden md:block mt-1">
                Brighten the Future!
              </span> 
            </div>
            <ul className="mx-5% list-disc font-extralight text-lg leading-loose mb-28">
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

      <div className="relative lg:hidden">
        <Image src={globleIcon} alt="" width={100} height={100} className="z-0 absolute -top-12 left-1/2 transform -translate-x-1/2 w-[100px] h-[100px] md:hidden" />
        <div className="bg-light-green pt-20 mx-5% rounded-2xl w-11/12 h-fit md:pt-8">
          <div className="mx-5%">
            <h3 className="text-center font-medium text-3xl pb-1 md:hidden">Make your mark on</h3> 
            <h3 className="text-center font-medium text-3xl pb-10 md:hidden">The National Mall!</h3> 
            <div className="flex justify-center">
              <Image src={globleIcon} alt="" width={46} height={46} className="w-[46px] h-[46px] mr-4 hidden md:block" />
              <span className="font-medium text-3xl pb-4 hidden md:block mt-1">
                Make your mark on The National Mall!
              </span> 
            </div>
            
            <ul className="mx-5% list-disc font-extralight text-lg leading-loose mb-28">
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

      <div className="pb-10 hidden lg:block">
        <section className="relative">
          <div className="max-w-lg mx-auto relative">
            <input id="article-01" type="radio" name="slider" className="sr-only peer/01" />
            <input id="article-02" type="radio" name="slider" className="sr-only peer/02" checked/>
            <input id="article-03" type="radio" name="slider" className="sr-only peer/03" />

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
              <label className="absolute inset-0" for="article-01"><span className="sr-only"></span></label>
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
              absolute inset-0 scale-[67.5%] z-20 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]                        
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
              <label className="absolute inset-0" for="article-02"><span className="sr-only"></span></label>
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
              <label className="absolute inset-0" for="article-03"><span className="sr-only"></span></label>
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
            
          </div>
        </section>
      </div>

      <div className="relative">
        <Image src={yellowBlob} alt="" width={442} height={417} className="absolute z-0 right-0 w-2/3 sm:w-1/2 lg:w-1/3 mb-10 -top-36" />
      </div>

      <div className="grid grid-cols-1 gap-y-6">
        <div className="group">
          <div className="mx-auto w-11/12 pt-6 pb-6 px-4 relative bg-baby-blue rounded-2xl group-focus-within:pb-10 group-focus-within:mb-28 group-focus-within:sm:mb-20 group-focus-within:lg:mb-12">
            <button className="w-full text-lg font-semibold text-neutral-black inline-flex">
              How can I be a sponsor?
              <DownIcon />
              <UpIcon />
            </button>
            <nav tabIndex={0} className="bg-baby-blue invisible rounded-b-2xl w-full absolute left-0 transition-all opacity-0 group-focus-within:visible group-focus-within:opacity-100 top-16">
              <p className="pt-2 px-4 font-extralight text-lg leading-loose mb-6">
                To explore sponsorship opportunities and learn about the unique benefits, please contact us.
              </p>
            </nav>
          </div>
        </div>

        <div className="group">
          <div className="mx-auto w-11/12 pt-6 pb-6 px-4 relative bg-baby-blue rounded-2xl group-focus-within:pb-10 group-focus-within:mb-48 group-focus-within:sm:mb-28 group-focus-within:lg:mb-20">
            <button className="w-full text-lg font-semibold text-neutral-black inline-flex">
              What are the benefits? 
              <DownIcon />
              <UpIcon />
            </button>
            <nav tabIndex={0} className="bg-baby-blue invisible rounded-b-2xl w-full absolute left-0 transition-all opacity-0 group-focus-within:visible group-focus-within:opacity-100 top-16">
              <p className="pt-2 px-4 font-extralight text-lg leading-loose mb-6">
                As a sponsor, you will gain visibility and recognition among our audience.  You will also have the opportunity to support young artists to contribute to a meaningful cause. 
              </p>
            </nav>
          </div>
        </div>

        <div className="group">
          <div className="mx-auto w-11/12 pt-6 pb-6 px-4 relative bg-baby-blue rounded-2xl group-focus-within:pb-10 group-focus-within:mb-20 group-focus-within:sm:mb-10">
            <button className="w-full text-lg font-semibold text-neutral-black inline-flex">
              Can I partner with you?
              <DownIcon />
              <UpIcon />
            </button>
            <nav tabIndex={0} className="bg-baby-blue invisible rounded-b-2xl w-full absolute left-0 transition-all opacity-0 group-focus-within:visible group-focus-within:opacity-100 top-16">
              <p className="pt-2 px-4 font-extralight text-lg leading-loose mb-6">
                Please contact us to explore collaboration opportunities. 
              </p>
            </nav>
          </div>
        </div>

        <div className="group">
          <div className="mx-auto w-11/12 pt-6 pb-6 px-4 relative bg-baby-blue rounded-2xl group-focus-within:pb-10 group-focus-within:mb-56 group-focus-within:sm:mb-28 group-focus-within:lg:mb-20">
            <button className="w-full text-lg font-semibold text-neutral-black inline-flex">
              How does sponsorship work?
              <DownIcon />
              <UpIcon />
            </button>
            <nav tabIndex={0} className="bg-baby-blue invisible rounded-b-2xl w-full absolute left-0 transition-all opacity-0 group-focus-within:visible group-focus-within:opacity-100 top-16">
              <p className="pt-2 px-4 font-extralight text-lg leading-loose mb-6">
                Sponsorship involves providing financial support to our charity and the at competition.  In return, sponsors receive various benefits such as brand exposure and recognition.
              </p>
            </nav>
          </div>
        </div>

        <div className="group mb-36">
          <div className="mx-auto w-11/12 pt-6 pb-6 px-4 relative bg-baby-blue rounded-2xl group-focus-within:pb-10 group-focus-within:mb-16 group-focus-within:lg:mb-36">
            <button className="w-full text-lg font-semibold text-neutral-black inline-flex">
              Can I donate instead?
              <DownIcon />
              <UpIcon />
            </button>
            <nav tabIndex={0} className="bg-baby-blue invisible rounded-b-2xl w-full absolute left-0 transition-all opacity-0 group-focus-within:visible group-focus-within:opacity-100 top-16 px-4">
              <p className="pt-2 font-extralight text-lg leading-loose mb-6">
                Absolutely! If you prefer to make a donation instead of becoming a sponsor, we appreciate your support. Visit our donation page to contribute. 
              </p>
              <a href="https://icaf.org/donate" className="group mb-6 w-fit h-fit border-neutral-white border rounded text-center py-3 px-4 text-sm cursor-pointer tracking-wide bg-new-blue text-neutral-white hidden md:block">
                <HeartIconWhite />
                Donate
              </a>
    
            </nav>
          </div>
        </div>
      </div>



      <div className="relative mb-[800px] xsm:mb-[700px] md:mb-[600px]">
        <Image src={orangeBlob} alt="" width={442} height={417} className="absolute z-0 left-0 w-1/2 sm:w-1/3 mb-10" />
        <div className="absolute left-1/2 transform -translate-x-1/2 grid grid-cols-1 gap-y-6">
          <h2 className="text-center font-medium text-3xl">Contact Us</h2>
          <h3 className="text-center font-extralight text-lg leading-loose">Still have questions? Get in touch with us.</h3>    
          <a href="https://icaf.org/about/contact-us" className="mx-auto inline-flex w-fit h-fit bg-new-blue rounded text-center py-4 px-6 text-sm cursor-pointer tracking-wide text-neutral-white">Contact us here</a>
        </div>
        <Image src={greenBlob} alt="" width={442} height={417} className="absolute z-0 right-0 w-1/2 sm:w-1/3 mb-10 -top-20" />
      </div>



      <div className="absolute bottom-0 bg-baby-blue w-full h-fit">
        <div className="grid grid-cols-1 gap-y-6 md:grid-cols-3 md:grid-rows-3">
          <div className="mx-auto mt-10 font-medium text-2xl md:text-3xl col-span-1 md:col-span-2 order-1 md:mx-5%">
            Want to get involved?
          </div>
          <div className="mx-5% font-thin text-lg order-2 col-span-1 md:col-span-2">
            All of ICAF’s programs, festivals, and exhibitions are offered free of charge and are made possible through the support of empathic donors and creative sponsors.
          </div>
          <Image src={icafLogo} alt="ICAF Logo." className="mx-auto my-auto w-1/2 h-fit order-3 md:w-11/12 md:order-1 md:col-start-3 md:col-end-3 md:row-span-3" />
          <a href="#" className="mb-10 mx-auto inline-flex w-fit h-fit bg-new-blue rounded text-center py-4 px-6 text-sm cursor-pointer tracking-wide text-neutral-white order-4 md:col-span-2 md:mx-5%">Learn more about becoming a sponsor</a>
        </div>
      </div>


    </div>

  );
}