import { SVGProps } from "react";
import Link from "next/link";

export const FacebookIcon = (props: SVGProps<SVGSVGElement>) => (
  <Link href="https://www.facebook.com/ICAF.org" target="_blank" rel="noopener noreferrer">
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-labelledby="facebook" {...props}>
      <title id="facebook"> Visit the International Child Art Foundation's Facebook page</title>
      <circle cx="20" cy="20" r="20" fill={props.fill} />
      <path
        fill="white"
        d="M22 21.5H24.5L25.5 17.5H22V15.5C22 14.47 22 13.5 24 13.5H25.5V10.14C25.174 10.097 23.943 10 22.643 10C19.928 10 18 11.657 18 14.7V17.5H15V21.5H18V30H22V21.5Z"
      />
    </svg>
  </Link>
);