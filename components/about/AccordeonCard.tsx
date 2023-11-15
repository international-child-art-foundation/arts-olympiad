import {ReactNode} from "react";
import {H3m} from "../common/texts/H3m";
import {H2m} from "../common/texts/H2m";
import useWindowDimensions from "@/hooks/useWindowDimensions";
// import "../../src/styles/accordeon.css";

interface IProps {
  className?: string
  isOpen: boolean
  setIsOpen: (i: number) => void
  color: string
  number: number
  header: string
  paragraph: ReactNode
  images: ReactNode
}

export const AccordeonCard = ({className, isOpen, setIsOpen, color, number, header, paragraph, images}: IProps) => {

  const {windowWidth} = useWindowDimensions();
  const displayhorizontally = windowWidth >= 1024;

  return (
    <article
      style={{backgroundColor: color}}
      className={`
      ${
    isOpen && displayhorizontally ? "slide-in" : !isOpen && displayhorizontally ? "slide-out" :
      isOpen && !displayhorizontally ? "slide-up" : !isOpen && !displayhorizontally && "slide-down"
    }
      ${className} flex flex-col 
      min-h-[85px]
      lg:flex-row lg:min-w-[85px] 
      cursor-pointer
      `}
      onClick={() => setIsOpen(number)}
    >
      <div
        className="flex flex-row lg:flex-col lg:justify-between min-w-[80px] p-6"
      >
        <H3m className="font-bold text-center mr-6 lg:mr-0">0{number}</H3m>
        <H3m
          className={!displayhorizontally ? "font-semibold" : ""}
          style={{writingMode: displayhorizontally ? "vertical-lr": "horizontal-tb", transform: displayhorizontally ? "rotate(180deg)" : ""}}
        >
          {header}
        </H3m>
      </div>

      { isOpen &&
        <div
          className={`${isOpen ? "content-in" : "content-out"} flex flex-col p-12`}
        >
          {
            displayhorizontally &&
            <H2m>{header}</H2m>
          }
          {paragraph}
          {images}
        </div>
      }

    </article>
  );
};