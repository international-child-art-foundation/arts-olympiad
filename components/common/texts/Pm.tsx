import {HTMLProps} from "react";

/**
 *
 * @description pre-styled customizable p element
 */
export const Pm = ({style, children, className, ...restProps }: HTMLProps<HTMLParagraphElement>) => {
  return (
    <p
      style={style}
      className={`break-words lg:text-xl xl:text-2xl ${className}`}
      {...restProps}
    >
      {children}
    </p>
  );
};
