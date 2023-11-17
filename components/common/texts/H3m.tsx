import { HTMLProps } from "react";

interface H3mProps extends HTMLProps<HTMLHeadingElement> {
  useBreakNormal?: boolean;
}

/**
 * @description pre-styled customizable h3 element
 */
export const H3m = ({ style, children, className, useBreakNormal, ...restProps }: H3mProps) => {
  // Determine which break-word class to use
  const breakClass = useBreakNormal ? "break-normal" : "break-words";

  return (
    <h3
      style={style}
      className={`${breakClass} text-xl lg:text-xl xl:text-2xl ${className}`}
      {...restProps}
    >
      {children}
      {/* this period is here for screen reader */}
      <span className="sr-only">.</span>
    </h3>
  );
};
