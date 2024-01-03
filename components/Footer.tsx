import Link from "next/link";
import { InstagramIcon } from "./svgs/InstagramIcon";
import { FacebookIcon } from "./svgs/FacebookIcon";
import { TwitterIcon } from "./svgs/TwitterIcon";
import { YoutubeIcon } from "./svgs/YoutubeIcon";
import { LinkedinIcon } from "./svgs/LinkedinIcon";
import { PinterestIcon } from "./svgs/PinterestIcon";
import { EmailIcon } from "./svgs/EmailIcon";
// import { HeartIcon } from "./svgs/HeartIcon";

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
    <footer className="bg-new-blue font-body relative w-full mx-auto">
      <div className="mx-5% sm:mx-auto sm:max-w-sm md:max-w-full lg:max-w-screen-2xl flex flex-wrap gap-y-10 pt-12 pb-10 px-8 md:px-12 lg:px-16 xl:px-20 justify-between">
        
        <div className="space-y-3 w-full md:w-2/5 max-w-sm lg:w-30% text-sm text-neutral-white col-span-2 md:order-1 md:col-span-3">
          <p>Join our newsletter here</p>
          <div className="flex flex-wrap gap-1 items-center text-main-grey focus-within:text-gray-600">
            <div className="flex flex-auto">
              <input 
                type="text"
                name="email"
                placeholder="Your email address"
                autoComplete="off"
                className="h-10 min-w-min	flex-1 flex-grow w-full tracking-wide sm:w-auto pl-10 pr-3 border border-main-grey rounded-md required">  
              </input>
              <EmailIcon />
            </div>
            <a href="#" className="h-fit sm:flex-1 border-neutral-white whitespace-nowrap border rounded text-center py-2 px-3 text-sm cursor-pointer tracking-wide w-full sm:w-auto text-neutral-white">Sign up</a>
          </div>
        </div>

        <div className="w-full max-w-sm md:max-w-fit md:w-1/5 lg:w-1/5 md:order-3">
          <ol className="grid md:place-items-center md:gap-3 md:gap-x-6 my-2 md:grid-cols-3 grid-flow-col md:grid-flow-row justify-between w-full">
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

        <div className="text-sm w-full max-w-sm md:order-2 md:w-1/4 md:pl-11 lg:w-1/5 lg:pl-0 lg:w-auto text-neutral-white">
          <ol className="grid grid-cols-2 gap-y-5 md:gap-y-3 md:grid-cols-1">
            <div className="break-words"><Link href="/faq">FAQ's</Link></div>
            <div className="break-words"><a href="https://icaf.org/about/contact-us">Contact Us</a></div>
            <div className="break-words"><a href="#">Terms of use</a></div>
            <div className="break-words"><a href="#">Privacy policy</a></div>
          </ol>
        </div> 

        <div className="flex flex-wrap max-w-sm md:max-w-full md:justify-center md:gap-9 w-full md:order-4 lg:w-auto lg:flex-col lg:gap-5"> 
          <div className="w-1/2 md:w-auto">
            <div className="flex flex-col w-auto items-left md:items-center">
              {/* <a href="#" className="group w-32 lg:w-32 h-fit border-neutral-white border rounded text-center py-3 px-5 text-sm cursor-pointer tracking-wide bg-neutral-white text-new-blue">
                <HeartIcon />
                Donate
              </a> */}
              <a href="#" className="group w-32 lg:w-32 h-fit border-neutral-white border rounded text-center py-3 px-5 text-sm cursor-pointer tracking-wide bg-neutral-white text-new-blue">
                Donate
              </a>
              <div className="heart-white me-auto my-2"></div>
            </div>
          </div>
          <div className="w-1/2 md:w-auto">
            <div className="flex flex-col w-auto items-left md:items-center">
              <a href="https://icaf.org/about/contact-us" className="w-32 h-fit border-neutral-white border rounded text-center py-3 px-6 text-sm cursor-pointer tracking-wide text-neutral-white">Contact Us</a>
            </div>
          </div> 
        </div> 

        <div className="bg-new-blue order-5 lg:mx-80 max-w-sm md:max-w-full md:w-screen grid grid-cols-1 place-items-center font-light text-xs text-neutral-white">
          © 1997-2023 International Child Art Foundation | 2549 Virginia Avenue, NW, Washington, DC 20037, USA
        </div>
      </div>
    </footer>
  );
};

export default Footer;