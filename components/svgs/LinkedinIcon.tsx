import { SVGProps } from "react";
import Link from "next/link";

export const LinkedinIcon = (props: SVGProps<SVGSVGElement>) => (
  <Link href="https://www.linkedin.com/company/international-child-art-foundation/" target="_blank" rel="noopener noreferrer">
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-labelledby="linkedin"  {...props}>
      <title id="linkedin"> Visit the International Child Art Foundation's Linkedin page</title>
      <circle cx="20" cy="20" r="20" fill={props.fill} />
      <path
        fill="white"
        d="M27 11C27.5304 11 28.0391 11.2107 28.4142 11.5858C28.7893 11.9609 29 12.4696 29 13V27C29 27.5304 28.7893 28.0391 28.4142 28.4142C28.0391 28.7893 27.5304 29 27 29H13C12.4696 29 11.9609 28.7893 11.5858 28.4142C11.2107 28.0391 11 27.5304 11 27V13C11 12.4696 11.2107 11.9609 11.5858 11.5858C11.9609 11.2107 12.4696 11 13 11H27ZM26.5 26.5V21.2C26.5 20.3354 26.1565 19.5062 25.5452 18.8948C24.9338 18.2835 24.1046 17.94 23.24 17.94C22.39 17.94 21.4 18.46 20.92 19.24V18.13H18.13V26.5H20.92V21.57C20.92 20.8 21.54 20.17 22.31 20.17C22.6813 20.17 23.0374 20.3175 23.2999 20.5801C23.5625 20.8426 23.71 21.1987 23.71 21.57V26.5H26.5ZM14.88 16.56C15.3256 16.56 15.7529 16.383 16.0679 16.0679C16.383 15.7529 16.56 15.3256 16.56 14.88C16.56 13.95 15.81 13.19 14.88 13.19C14.4318 13.19 14.0019 13.3681 13.685 13.685C13.3681 14.0019 13.19 14.4318 13.19 14.88C13.19 15.81 13.95 16.56 14.88 16.56ZM16.27 26.5V18.13H13.5V26.5H16.27Z"
      />
    </svg>
  </Link>
);