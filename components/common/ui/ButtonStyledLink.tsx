import Link, { LinkProps } from "next/link";

interface ButtonStyledLinkProps extends LinkProps {
  className?: string;
  children?: React.ReactNode
}

export const ButtonStyledLink = ({children, className,  ...restProps}: ButtonStyledLinkProps) => {
  return (
    <Link
      target="_blank"
      className={`${className} px-6 w-full rounded-lg h-14 flex items-center justify-center bg-dark-blue text-neutral-white font-normal text-center`}
      {...restProps}
    >
      {children}
    </Link>
  );
};
