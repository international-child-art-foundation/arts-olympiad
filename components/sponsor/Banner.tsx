import Image from "next/image";
import icafLogo from "../../public/svgs/Icaf-logo.svg";

interface BannerProps {
  backgroundColor: string;
  title: string;
  description: string;
  buttons: {
    href: string;
    text: string;
    className?: string;
  }[];
}

export const Banner = (props: BannerProps) => {
  return (
    <>
      <div className={`relative bottom-0 z-30 bg-${props.backgroundColor} w-screen h-fit`}>
        <div className="grid grid-cols-1 gap-y-6 md:grid-cols-3 md:grid-rows-3 m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20">
          <div className="mx-auto mt-10 font-medium text-2xl md:text-3xl col-span-1 md:col-span-2 md:ml-0 order-1">
            {props.title}
          </div>
          <div className="mx-auto text-lg order-2 col-span-1 md:col-span-2 md:ml-0">
            {props.description}
          </div>
          <Image src={icafLogo} alt="ICAF Logo" className="mx-auto my-auto w-1/2 h-fit order-3 md:w-11/12 md:order-1 md:col-start-3 md:col-end-3 md:row-span-3" />
          
          <div className={"mx-auto md:mx-0 order-4 mb-10 flex flex-wrap justify-between w-80"}>
            {props.buttons && Array.isArray(props.buttons) && props.buttons.map((button, index) => (
              <a key={index} href={button.href} className={`${button.className} py-4 px-6`}>
                {button.text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};