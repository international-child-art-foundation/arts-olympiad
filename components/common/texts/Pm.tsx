import {HTMLProps} from "react";

/**
 *
 * @description pre-styled customizable p element
 */
export const Pm = ({style, children, className, ...restProps }: HTMLProps<HTMLParagraphElement>) => {
  return (
    <p
      style={style}
      className={`break-words lg:text-lg xl:text-xl cursor-text ${className}`}
      {...restProps}
    >
      {children}
      {/* this period is here for screen reader */}
      <span className="sr-only">.</span>
    </p>
  );
};
