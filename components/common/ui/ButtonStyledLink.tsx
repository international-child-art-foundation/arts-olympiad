import Link, { LinkProps } from "next/link";

interface ButtonStyledLinkProps extends LinkProps {
  className?: string;
  children?: React.ReactNode
}

export const ButtonStyledLink = ({children, className,  ...restProps}: ButtonStyledLinkProps) => {
  return (
    <Link
      target="_blank"
      className={`${className} w-full rounded-lg h-14 flex items-center justify-center bg-dark-blue text-neutral-white font-normal`}
      {...restProps}
    >
      {children}
    </Link>
  );
};
