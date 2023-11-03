import {HTMLProps} from "react";

/**
 *
 * @description pre-styled customizable h2 element
 */

export const H2m = ({style, children, className, ...restProps }: HTMLProps<HTMLHeadingElement>) => {
  return (
    <h2
      style={style}
      className={`break-words text-2xl lg:text-3xl ${className}`}
      {...restProps}
    >
      {children}
      {/* this period is here for screen reader */}
      <span className="sr-only">.</span>
    </h2>
  );
};
