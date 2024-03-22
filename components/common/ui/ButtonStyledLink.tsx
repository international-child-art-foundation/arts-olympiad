import Link, { LinkProps } from "next/link";

interface ButtonStyledLinkProps extends LinkProps {
  target?: string
  className?: string
  children?: React.ReactNode
  borderColor?: string
  backGroundColor?: string
  textColor?: string
}

export const ButtonStyledLink = ({children, className, borderColor, textColor, backGroundColor, target,  ...restProps}: ButtonStyledLinkProps) => {
  return (
    <Link
      target={target || "_blank"}
      className={`${className} leading-5 px-6 rounded-lg h-14 flex items-center justify-center bg-${backGroundColor || "dark-blue"} border-1 border-${borderColor || "dark-blue"} text-${textColor || "neutral-white"} font-normal text-center`}
      {...restProps}
    >
      {children}
      <span className="sr-only">.</span>
    </Link>
  );
};
