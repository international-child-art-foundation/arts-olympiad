import {ButtonHTMLAttributes, DetailedHTMLProps} from "react";


/**
 *
 * @description pre-styled html button element
 */
export const ButtonStd = ({children, className,  ...restProps}: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
  return (
    <button
      className={`${className} w-full rounded-lg h-14 flex items-center justify-center bg-dark-blue text-neutral-white font-normal`}
      {...restProps}
    >
      {children}
    </button>
  );
};
