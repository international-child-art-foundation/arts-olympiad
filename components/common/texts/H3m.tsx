import {HTMLProps} from "react";

/**
 *
 * @description pre-styled customizable h3 element
 */
export const H3m = ({style, children, className, ...restProps }: HTMLProps<HTMLHeadingElement>) => {
  return (
    <h3
      style={style}
      className={`break-words lg:text-xl xl:text-2xl ${className}`}
      {...restProps}
    >
      {children}
    </h3>
  );
};
