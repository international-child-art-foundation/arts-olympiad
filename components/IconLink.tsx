import { ReactNode } from "react";
import Link from "next/link";


interface IconLinkProps {
  altText: string;
  href: string;
  target: string;
  rel: string;
  children: ReactNode;
}

const IconLink: React.FC<IconLinkProps> = ({altText, href, target, rel, children}) => {
  return (
    <Link
      aria-label={altText}
      href={href}
      target={target}
      rel={rel}
    >
      {children}
    </Link>
  );
};
export default IconLink;