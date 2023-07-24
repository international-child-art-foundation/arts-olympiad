import { SVGProps } from "react";

export const TiktokIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <a href="https://www.tiktok.com/@internationalchildartfdn" target="_blank" rel="noopener noreferrer">
      <circle cx="20" cy="20" r="20" fill={props.fill} />
      <path
        fill="white"
        d="M24.6002 13.82C23.9166 13.0396 23.5399 12.0374 23.5402 11H20.4502V23.4C20.4263 24.071 20.143 24.7066 19.6599 25.1729C19.1768 25.6393 18.5316 25.8999 17.8602 25.9C16.4402 25.9 15.2602 24.74 15.2602 23.3C15.2602 21.58 16.9202 20.29 18.6302 20.82V17.66C15.1802 17.2 12.1602 19.88 12.1602 23.3C12.1602 26.63 14.9202 29 17.8502 29C20.9902 29 23.5402 26.45 23.5402 23.3V17.01C24.7932 17.9099 26.2975 18.3926 27.8402 18.39V15.3C27.8402 15.3 25.9602 15.39 24.6002 13.82Z"
      />
    </a>
  </svg>
);