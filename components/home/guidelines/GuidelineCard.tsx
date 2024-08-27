import React, { StaticImageData } from "next/image";
import { LazyImage } from "../../common/images/LazyImage";
import { H3m } from "../../common/texts/H3m";
import { Pm } from "../../common/texts/Pm";
import Link from "next/link";

interface IProps extends React.HTMLProps<HTMLDivElement> {
  imgUrl: string | StaticImageData;
  alt?: string;
  heading: string;
  description: string[];
  button?: string[];
  isActive: boolean;
  gradientStrength: number | undefined;
}

export const GuidelineCard = ({
  className,
  imgUrl,
  alt,
  heading,
  description,
  button,
  isActive,
  gradientStrength = 0.2,
  ...restProps
}: IProps) => {

  const baseAnimationStyle = {
    opacity: 0,
    transition: "opacity 0.3s ease-out 0.2s",
  };

  const activeAnimationStyle = {
    transform: "translateY(0)",
    opacity: 1,
  };

  const baseTitleAnimationStyle = {
    transition: "opacity 0.3s ease-out"
  };

  const activeTitleAnimationStyle = {
    transition: "opacity 0.2s ease-out 0.2s"
  };

  return (
    <article
      className={`rounded-xl overflow-hidden relative text-white min-w-[140px] ${className}`}
      style={{ boxShadow: "5px 6px 25px 4px rgba(0, 0, 0, 0.18)" }}
      {...restProps}
    >
      <LazyImage className="object-cover rounded-b-none border-b-1 border-black w-full -z-20" imageUrl={imgUrl} alt={alt || ""} />
      <div
        className="absolute bottom-0 w-full h-full z-0"
        style={{ background: `linear-gradient(to top, rgba(0, 0, 0, ${gradientStrength}), rgba(0, 0, 0, 0))` }}
      ></div>
      <div
        style={isActive ? { ...baseAnimationStyle, ...activeAnimationStyle } : baseAnimationStyle}
        className={"div-textholder p-6 absolute bottom-0 min-w-full max-w-[450px] lg:max-w-[unset] w-full flex flex-col gap-6 "}
      >
        <H3m className="font-semibold grid-card-header break-normal">{heading}</H3m>
        {description && description.map((item, index) => {
          return (
            <Pm key={index} className="font-light font-sans text-sm min-w-[100%]">
              {item}
            </Pm>
          );
        })}

        {button && (
          <div className="inline-flex box-border grow-0 rounded">
            <Link className="bg-white text-new-blue px-4 py-3 box-border rounded" href={button[1]}>
              {button[0]}
            </Link>
          </div>
        )}
      </div>
      <div
        className={`${isActive ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"} p-6 absolute bottom-0 w-full`}
        style={isActive ? { ...baseTitleAnimationStyle } : { ...activeTitleAnimationStyle }}
      >
        <H3m className="font-semibold grid-card-header break-normal">{heading}</H3m>
      </div>
    </article>
  );
};