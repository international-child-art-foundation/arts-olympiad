import { SVGProps } from "react";

export const LoginIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth="1" 
    stroke="currentColor" 
    className="w-5 h-5 inline-block mr-1 mt-1 ml-1"
    {...props}
  >
    <path
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M7.97578 15.7008V15.0008H14.2008C14.4008 15.0008 14.5841 14.9174 14.7508 14.7508C14.9174 14.5841 15.0008 14.4008 15.0008 14.2008V1.80078C15.0008 1.60078 14.9174 1.41745 14.7508 1.25078C14.5841 1.08411 14.4008 1.00078 14.2008 1.00078H7.97578V0.300781H14.2008C14.6341 0.300781 14.9924 0.442448 15.2758 0.725781C15.5591 1.00911 15.7008 1.36745 15.7008 1.80078V14.2008C15.7008 14.6341 15.5591 14.9924 15.2758 15.2758C14.9924 15.5591 14.6341 15.7008 14.2008 15.7008H7.97578ZM7.65078 11.1008L7.15078 10.6008L9.40078 8.35078H0.300781V7.65078H9.40078L7.15078 5.40078L7.65078 4.90078L10.7508 8.00078L7.65078 11.1008Z"
    />
  </svg>
);
