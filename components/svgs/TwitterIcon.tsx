import { SVGProps } from "react";

export const TwitterIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <a href="https://www.twitter.com/ICAF_org" target="_blank" rel="noopener noreferrer">
      <circle cx="20" cy="20" r="20" fill={props.fill} />
      <path
        fill="white"
        d="M30.1618 13.6559C29.3984 13.9936 28.5888 14.2154 27.7598 14.3139C28.6336 13.7914 29.2875 12.9689 29.5998 11.9999C28.7798 12.4879 27.8808 12.8299 26.9438 13.0149C26.3144 12.3415 25.4802 11.8949 24.5708 11.7445C23.6614 11.5941 22.7277 11.7484 21.9151 12.1834C21.1024 12.6183 20.4562 13.3096 20.0769 14.1497C19.6976 14.9898 19.6066 15.9317 19.8178 16.8289C18.1549 16.7456 16.5281 16.3134 15.0431 15.5606C13.5581 14.8077 12.2479 13.751 11.1978 12.4589C10.8261 13.0974 10.6308 13.8232 10.6318 14.5619C10.6318 16.0119 11.3698 17.2929 12.4918 18.0429C11.8278 18.022 11.1784 17.8427 10.5978 17.5199V17.5719C10.598 18.5376 10.9322 19.4735 11.5437 20.221C12.1551 20.9684 13.0063 21.4814 13.9528 21.6729C13.3364 21.84 12.6901 21.8646 12.0628 21.7449C12.3297 22.5762 12.8498 23.3031 13.5504 23.824C14.251 24.3449 15.0969 24.6337 15.9698 24.6499C15.1023 25.3313 14.109 25.8349 13.0467 26.1321C11.9844 26.4293 10.8739 26.5142 9.77881 26.3819C11.6905 27.6114 13.9159 28.264 16.1888 28.2619C23.8818 28.2619 28.0888 21.8889 28.0888 16.3619C28.0888 16.1819 28.0838 15.9999 28.0758 15.8219C28.8947 15.2301 29.6014 14.4969 30.1628 13.6569L30.1618 13.6559Z"
      />
    </a>
  </svg>
);