import { InstagramIcon, FacebookIcon, TwitterIcon, YoutubeIcon,TiktokIcon,LinkedinIcon,PinterestIcon } from "./SocialSvgComponents";

const svgIcons = [
  { name: "instagram", link: "https://www.instagram.com", SVGcomponent: InstagramIcon },
  { name: "facebook", link: "https://www.facebook.com", SVGcomponent: FacebookIcon },
  { name: "twitter", link: "https://www.twitter.com", SVGcomponent: TwitterIcon },
  { name: "youtube", link: "https://www.youtube.com", SVGcomponent: YoutubeIcon },
  { name: "tiktok", link: "https://www.tiktok.com", SVGcomponent: TiktokIcon },
  { name: "linkedin", link: "https://www.linkedin.com", SVGcomponent: LinkedinIcon },
  { name: "pinterest", link: "https://www.pinterest.com", SVGcomponent: PinterestIcon },
];

const SocialIcons = () => {
  return (
    <>
      {svgIcons.map((icon) => (
        <a 
          className="inline-block px-3" 
          key={icon.name} 
          href={icon.link} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <icon.SVGcomponent className="fill-neutral-black hover:fill-main-blue"/>
        </a>
      ))}
    </>
  );
};
export default SocialIcons;