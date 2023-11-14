import {ReactNode} from "react";
import {H3m} from "../common/texts/H3m";
import {Pm} from "../common/texts/Pm";
import {H2m} from "../common/texts/H2m";

interface IProps {
  className?: string
  isOpen: boolean
  setIsOpen: (i: number) => void
  color: string
  number: number
  header: string
  paragraph: string | ReactNode
  images: ReactNode
}

export const AccordeonCard = ({className, isOpen, setIsOpen, color, number, header, paragraph, images}: IProps) => {

  return (
    <article
      style={{backgroundColor: color}}
      className={`${className} flex flex-row justify-between min-h-[650px] min-w-[80px] cursor-pointer`}
      onClick={() => setIsOpen(number)}
    >
      <div className="flex flex-col justify-between min-w-[80px] p-6">
        <Pm className="font-bold text-center">0{number}</Pm>
        <H3m style={{writingMode: "vertical-lr", transform: "rotate(180deg)"}}>{header}</H3m>
      </div>

      {
        isOpen &&
        <div className="p-12">
          <H2m>{header}</H2m>
          <Pm className="my-12">{paragraph}</Pm>
          {images}
        </div>
      }

    </article>
  );
};