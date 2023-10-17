import React, {StaticImageData} from "next/image";
import {Pm} from "../../common/texts/Pm";
import {H3m} from "../../common/texts/H3m";
import {LazyImage} from "../../common/images/LazyImage";
import {ReactNode} from "react";

interface IProps extends React.HTMLProps<HTMLDivElement> {
  imgUrl: string | StaticImageData
  alt?: string
  heading: string
  description: string | ReactNode
}

export const GuidelineCard = ({children, className, imgUrl, alt, heading, description, ...restProps} : IProps) => {
  return (
    <article
      className={`mb-6 rounded-xl border-1 bg-white ${className}`}
      style={{boxShadow: "5px 6px 25px 4px rgba(0, 0, 0, 0.18)"}}
      {...restProps}
    >
      <LazyImage className="h-[50%] rounded-b-none border-b-1 border-black w-full" imageUrl={imgUrl} alt={alt || ""} />
      <div className="mx-4 my-4">
        <H3m className="my-2 font-semibold" >{heading}</H3m>
        <Pm className="my-2 font-light text-sm " >{description}</Pm>
        {children}
      </div>
    </article>
  );
};