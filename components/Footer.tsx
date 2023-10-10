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
    <footer className="bg-new-blue font-body relative z-10 rounded-t-2xl mx-6 sm:mx-5 lg:mx-10 xl:mx-20 overflow-hidden">
      <div className="sm:mx-2 md:mx-32 lg:mx-6 xl:mx-14 grid grid-cols-2 gap-10 lg:grid-cols-4 xl:grid-cols-5 xl:grid-rows-1 pt-8 pb-20 px-2">
        
        <div className="space-y-3 text-sm text-neutral-white col-span-2 not-italic lg:order-1">
          <p>Join our newsletter now</p>
          <p>Subscribe to our quartly Sketches</p>
          <div className="flex items-center text-main-grey focus-within:text-gray-600">
            <input 
              type="text"
              name="email"
              placeholder="Your email address"
              autoComplete="off"
              className="h-9 w-8/12 pl-10 pr-3 broder broder-main-grey rounded-sm required">  
            </input>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="absolute pointer-events-none w-5 h-5 ml-3"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
            <a href="#" className="btn-small text-neutral-white">Sign up</a>
          </div>
        </div>

        <div className="col-span-2 lg:col-span-1 lg:order-3">
          <ol className="grid grid-cols-6 gap-6 my-2 lg:grid-cols-3">
            {icons.map((icon,i) => (
              <li key={i}>
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
              </li>
            ))}
          </ol>
        </div>

        <div className="text-sm col-span-2 lg:col-span-1 lg:order-2 text-neutral-white not-italic">
          <ol className="grid grid-cols-2 gap-y-3 lg:grid-cols-1">
            <a href="#">FAQ's</a>
            <a href="https://icaf.org/about/contact-us">Contact Us</a>
            <a href="#">Terms of use</a>
            <a href="#">Privacy policy</a>
          </ol>
        </div>

        <div className="col-span-2 lg:col-start-2 lg:order-4 xl:col-span-1">
          <div className="grid grid-cols-2 xl:grid-cols-1">
            <div className="flex">
              <a href="#" className="group btn h-12 bg-neutral-white text-new-blue"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#134380" class="w-5 h-5 inline-block mr-2 group-hover:fill-main-red group-hover:stroke-main-red"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>Donate</a>
            </div>
            <div className="flex">
              <a href="https://icaf.org/about/contact-us" className="btn h-12 text-neutral-white">Contact Us</a>
            </div>
          </div>
        </div>

        <div className="h-1 col-span-2 lg:absolute lg:bottom-0 lg:h-10 lg:left-1/4">
          <div className="font-light text-xs text-neutral-white not-italic">
            © 1997-2023 International Child Art Foundation, Post Office Box 58133, Washington, DC 20037
          </div>
        </div>

      </div>


    </footer>
  );
};

export default Footer;