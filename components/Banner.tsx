import Image from "next/image";
import icafLogo from "../public/svgs/Icaf-logo.svg";

interface BannerProps {
  backgroundColor: string;
  title: string;
  description: string;
  buttons: {
    href: string;
    text: string;
    icon: JSX.Element;
    className?: string;
  }[];
}

export const Banner = (props: BannerProps) => {
  return (
    <>
      <div className={`relative bottom-0 z-30 bg-${props.backgroundColor} w-screen h-fit`}>
        <div className="grid grid-cols-1 gap-y-6 md:grid-cols-3 m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20 py-6" >
          <div className="col-span-1 md:col-span-2 order-2 md:order-1">
            <div className="mx-auto mt-10 font-medium text-2xl md:text-3xl">
              {props.title}
            </div>
            <div className="mx-auto text-lg mt-4">
              {props.description}
            </div>
          </div>

          {/* Image: First on small screens, second on larger screens */}
          <Image src={icafLogo} alt="ICAF Logo" className="mx-auto my-auto w-1/2 h-fit order-1 md:order-2 md:w-11/12 md:col-start-3 md:col-end-3 md:row-span-3" />
          
          <div className="mx-auto mb-8 md:mx-0 h-auto order-3 flex flex-nowrap justify-start w-full items-baseline">
            {props.buttons && Array.isArray(props.buttons) && props.buttons.map((button, index) => (
              <a key={index} href={button.href} className={`${button.className} py-4 px-6`}>
                {button.icon}
                {button.text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};