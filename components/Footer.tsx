import Image from "next/image";
import Link from "next/link";
import ICAFLogo from "../public/svgs/icaf-logo-transparent.svg";
import { InstagramIcon } from "./svgs/InstagramIcon";
import { FacebookIcon } from "./svgs/FacebookIcon";
import { TwitterIcon } from "./svgs/TwitterIcon";
import { YoutubeIcon } from "./svgs/YoutubeIcon";
import { TiktokIcon } from "./svgs/TiktokIcon";
import { LinkedinIcon } from "./svgs/LinkedinIcon";
import { PinterestIcon } from "./svgs/PinterestIcon";

const icons = [
  { SVGcomponent: InstagramIcon, altText:"Visit the International Child Art Foundation's Instagram page", href:"https://www.instagram.com/intlchildartfoundation/"},
  { SVGcomponent: FacebookIcon, altText:"Visit the International Child Art Foundation's Facebook page", href:"https://www.facebook.com/ICAF.org",},
  { SVGcomponent: TwitterIcon, altText:"Visit the International Child Art Foundation's Twitter page", href:"https://www.twitter.com/ICAF_org"},
  { SVGcomponent: YoutubeIcon, altText:"Visit the International Child Art Foundation's Youtube page", href:"https://www.youtube.com/channel/UCvvipwdFEaNnTSv0EIhznaQ"},
  { SVGcomponent: TiktokIcon, altText:"Visit the International Child Art Foundation's Tiktok page", href:"https://www.tiktok.com/@internationalchildartfdn"},
  { SVGcomponent: LinkedinIcon, altText:"Visit the International Child Art Foundation's Linkedin page", href:"https://www.linkedin.com/company/international-child-art-foundation"},
  { SVGcomponent: PinterestIcon, altText:"Visit the International Child Art Foundation's Pinterest page", href:"https://www.pinterest.com/icaf/"},
];

// Custom box shadows added to apply the effects of "shadow-md" with a negative offset-y
const Footer = () => {
  return (
    <footer className="relative z-10 flex justify-center w-full shadow-[0_-4px_6px_-2px_rgba(0,0,0,0.1)] shadow-[0_-2px_4px_-2px_rgba(0,0,0,0.1)]">
      <div className="grid py-20 grid-col-1 lg:grid-cols-2 justify-center px-2 w-full max-w-7xl">
        <div className="flex justify-center items-center">
          <Image className="mr-2 lg:mr-12 hidden lg:block" width={163} src={ICAFLogo} alt="ICAF logo"/>
          <Image className="mr-2 lg:mr-12 lg:hidden" width={111} src={ICAFLogo} alt="ICAF logo"/>
          <address className="font-normal text-sm md:font-medium lg:text-lg not-italic">
            <Link href="http://www.icaf.org/" target="_blank" className="underline"> International Child Art Foundation </Link> <br />
            2549 Virginia Avenue, NW <br />
            Washington, DC 20037
          </address>
        </div>
        <div >
          <ol className="flex justify-between lg:justify-center lg:space-x-3 mt-9 lg:mt-0">
            {icons.map((icon,i) => (
              <li key={i}>
                <Link
                  aria-label={icon.altText}
                  href={icon.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <icon.SVGcomponent 
                    className="fill-neutral-black hover:fill-main-blue"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </footer>
  );
};

export default Footer;