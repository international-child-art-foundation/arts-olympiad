import Link from "next/link";
import { InstagramIcon } from "./svgs/InstagramIcon";
import { FacebookIcon } from "./svgs/FacebookIcon";
import { TwitterIcon } from "./svgs/TwitterIcon";
import { YoutubeIcon } from "./svgs/YoutubeIcon";
import { LinkedinIcon } from "./svgs/LinkedinIcon";
import { PinterestIcon } from "./svgs/PinterestIcon";
import { EmailIcon } from "./svgs/EmailIcon";
import { HeartIcon } from "./svgs/HeartIcon";

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
      <div className="sm:mx-5% md:mx-auto md:max-w-sm lg:max-w-full flex flex-wrap gap-y-10 pt-12 pb-10 pl-2 pr-2 ml:pl-8 mr:pr-8 justify-around">
        
        <div className="space-y-3 sm:w-full lg:w-2/5 max-w-sm xl:w-30% text-sm text-neutral-white col-span-2 lg:order-1 lg:col-span-3">
          <p>Join our newsletter here</p>
          <div className="flex flex-wrap gap-1 items-center text-main-grey focus-within:text-gray-600">
            <div className="flex flex-auto">
              <input 
                type="text"
                name="email"
                placeholder="Your email address"
                autoComplete="off"
                className="h-10 min-w-min	flex-1 flex-grow w-full tracking-wide md:w-auto pl-10 pr-3 border border-main-grey rounded-md required">  
              </input>
              <EmailIcon />
            </div>
            <a href="#" className="h-fit md:flex-1 border-neutral-white whitespace-nowrap border rounded text-center py-2 px-3 text-sm cursor-pointer tracking-wide w-full md:w-auto text-neutral-white">Sign up</a>
          </div>
        </div>

        <div className="sm:w-full lg:max-w-fit lg:w-1/5 xl:w-1/5 lg:order-3">
          <ol className="grid lg:place-items-center lg:gap-3 lg:gap-x-6 my-2 lg:grid-cols-3 grid-flow-col lg:grid-flow-row justify-between w-full">
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

        <div className="text-sm sm:w-full lg:order-2 lg:w-1/4 lg:pl-11 xl:w-1/5 xl:pl-0 xl:w-auto text-neutral-white">
          <ol className="grid grid-cols-2 gap-y-5 lg:gap-y-3 lg:grid-cols-1">
            <div className="break-words"><a href="#">FAQ's</a></div>
            <div className="break-words"><a href="https://icaf.org/about/contact-us">Contact Us</a></div>
            <div className="break-words"><a href="#">Terms of use</a></div>
            <div className="break-words"><a href="#">Privacy policy</a></div>
          </ol>
        </div> 

        <div className="flex flex-wrap lg:justify-center lg:gap-9 sm:w-full lg:order-4 xl:w-auto xl:flex-col xl:gap-5"> 
          <div className="w-1/2 lg:w-auto">
            <div className="flex flex-col w-auto sm:items-left lg:items-center">
              <a href="#" className="group w-32 xl:w-32 h-fit border-neutral-white border rounded text-center py-3 px-5 text-sm cursor-pointer tracking-wide bg-neutral-white text-new-blue">
                <HeartIcon />
                Donate
              </a>
            </div>
          </div>
          <div className="w-1/2 lg:w-auto">
            <div className="flex flex-col w-auto sm:items-left lg:items-center">
              <a href="https://icaf.org/about/contact-us" className="w-32 h-fit border-neutral-white border rounded text-center py-3 px-6 text-sm cursor-pointer tracking-wide text-neutral-white">Contact Us</a>
            </div>
          </div> 
        </div> 

        <div className="bg-new-blue order-5 xl:mx-80 md:max-w-sm lg:max-w-full grid grid-cols-1 place-items-center font-light text-xs text-neutral-white">
          © 1997-2023 International Child Art Foundation, Post Office Box 58133, Washington, DC 20037
        </div>
      </div>
    </footer>
  );
};

export default Footer;