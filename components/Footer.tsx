import Image from "next/image";
import Link from "next/link";
import { InstagramIcon } from "./svgs/InstagramIcon";
import { FacebookIcon } from "./svgs/FacebookIcon";
import { TwitterIcon } from "./svgs/TwitterIcon";
import { YoutubeIcon } from "./svgs/YoutubeIcon";
import { LinkedinIcon } from "./svgs/LinkedinIcon";
import { PinterestIcon } from "./svgs/PinterestIcon";

const icons = [
  { SVGcomponent: FacebookIcon, altText:"Visit the International Child Art Foundation's Facebook page", href:"https://www.facebook.com/ICAF.org"},
  { SVGcomponent: InstagramIcon, altText:"Visit the International Child Art Foundation's Instagram page", href:"https://www.instagram.com/intlchildartfoundation/"},
  { SVGcomponent: YoutubeIcon, altText:"Visit the International Child Art Foundation's Youtube page", href:"https://www.youtube.com/channel/UCvvipwdFEaNnTSv0EIhznaQ"},
  { SVGcomponent: TwitterIcon, altText:"Visit the International Child Art Foundation's Twitter page", href:"https://www.twitter.com/ICAF_org"},
  { SVGcomponent: PinterestIcon, altText:"Visit the International Child Art Foundation's Pinterest page", href:"https://www.pinterest.com/icaf/"},
  { SVGcomponent: LinkedinIcon, altText:"Visit the International Child Art Foundation's Linkedin page", href:"https://www.linkedin.com/company/international-child-art-foundation"},
];

// Custom box shadows added to apply the effects of "shadow-md" with a negative offset-y
const Footer = () => {
  return (
    <footer className="bg-new-blue font-body relative w-full max-w-[1600px] mx-auto">
      <div className="sm:mx-5% md:mx-auto md:max-w-sm lg:max-w-full flex flex-wrap gap-x-6 gap-y-10 pt-8 pb-10">
        
        <div className="space-y-3 sm:w-full lg:w-2/5 xl:w-30% text-sm text-neutral-white col-span-2 lg:order-1 lg:col-span-3 lg:ml-5%">
          <p>Join our newsletter now</p>
          <div className="flex flex-wrap gap-1 items-center text-main-grey focus-within:text-gray-600">
            <div className="flex">
              <input 
                type="text"
                name="email"
                placeholder="Your email address"
                autoComplete="off"
                className="h-9 w-72 md:w-fit pl-10 pr-3 broder broder-main-grey rounded-sm required">  
              </input>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="absolute pointer-events-none w-5 h-5 ml-3 mt-2"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
            </div>
            <a href="#" className="h-fit border-neutral-white border rounded text-center py-2 px-3 text-sm cursor-pointer tracking-wide w-72 md:w-fit text-neutral-white">Sign up</a>
          </div>
        </div>

        <div className="sm:w-full lg:w-1/4 xl:w-1/5 lg:order-3">
          <ol className="grid grid-cols-6 lg:place-items-center lg:lg:gap-3 my-2 lg:grid-cols-3">
            {icons.map((icon,i) => (
              <div key={i}>
                <Link
                  aria-label={icon.altText}
                  href={icon.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <icon.SVGcomponent 
                    className="fill-neutral-white"  
                    aria-hidden="true"
                  />
                </Link>
              </div>
            ))}
          </ol>
        </div>

        <div className="text-sm sm:w-full lg:w-1/5 lg:order-2 xl:w-1/6 xl:pl-5 text-neutral-white">
          <ol className="grid grid-cols-2 gap-y-5 lg:gap-y-3 lg:grid-cols-1">
            <div><a href="#">FAQ's</a></div>
            <div><a href="https://icaf.org/about/contact-us">Contact Us</a></div>
            <div><a href="#">Terms of use</a></div>
            <div><a href="#">Privacy policy</a></div>
          </ol>
        </div> 

        <div className="flex flex-wrap gap-10 lg:justify-center sm:w-full lg:order-4 xl:w-1/6 xl:flex-col xl:gap-5"> 
          <div className="flex flex-col sm:items-left lg:items-center">
            <a href="#" className="group w-fit h-fit border-neutral-white border rounded text-center py-3 px-4 text-sm cursor-pointer tracking-wide bg-neutral-white text-new-blue"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#134380" className="w-4 h-4 inline-block mr-1 mb-1 group-hover:fill-main-red group-hover:stroke-main-red"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>Donate</a>
          </div>
          <div className="flex flex-col sm:items-left lg:items-center">
            <a href="https://icaf.org/about/contact-us" className="w-fit h-fit border-neutral-white border rounded text-center py-3 px-4 text-sm cursor-pointer tracking-wide text-neutral-white">Contact Us</a>
          </div>
        </div> 

      </div>

      <div className="w-full">
        <div className="bg-new-blue pb-4 sm:mx-5% md:mx-auto md:max-w-sm lg:max-w-full grid grid-cols-1 place-items-center font-light text-xs text-neutral-white">
          © 1997-2023 International Child Art Foundation, Post Office Box 58133, Washington, DC 20037
        </div>
      </div>

    </footer>
  );
};

export default Footer;