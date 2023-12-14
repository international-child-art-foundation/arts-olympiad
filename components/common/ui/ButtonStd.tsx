import {ButtonHTMLAttributes, DetailedHTMLProps} from "react";

/**
 *
 * @description pre-styled html button element
 */

interface ButtonStyledLinkProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  className?: string;
  children?: React.ReactNode
  borderColor?: string
  backGroundColor?: string
  textColor?: string
}

export const ButtonStd = ({children, className, borderColor, textColor, backGroundColor,  ...restProps}: ButtonStyledLinkProps) => {
  return (
    <button
      className={`${className} px-6 rounded-lg h-14 flex items-center justify-center bg-${backGroundColor || "dark-blue"} border-1 border-${borderColor || "dark-blue"} text-${textColor || "neutral-white"} font-normal text-center`}
      {...restProps}
    >
      {children}
    </button>
  );
};
