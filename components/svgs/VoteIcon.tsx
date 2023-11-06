import { SVGProps } from "react";

export const VoteIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth="1" 
    stroke="currentColor" 
    className="w-5 h-5 inline-block mr-1 mt-1"
    {...props}
  >
    <path
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M0.224609 13.2008V11.9008C0.224609 11.4008 0.345443 11.0216 0.587109 10.7633C0.828776 10.5049 1.12461 10.2841 1.47461 10.1008C2.32461 9.66745 3.12461 9.34245 3.87461 9.12578C4.62461 8.90911 5.64128 8.80078 6.92461 8.80078C7.42461 8.80078 7.85378 8.81328 8.21211 8.83828C8.57044 8.86328 8.87461 8.90078 9.12461 8.95078L8.47461 9.60078C8.29128 9.56745 8.06211 9.54245 7.78711 9.52578C7.51211 9.50911 7.22461 9.50078 6.92461 9.50078C5.74128 9.50078 4.74544 9.61745 3.93711 9.85078C3.12878 10.0841 2.42461 10.3674 1.82461 10.7008C1.47461 10.8841 1.23711 11.0674 1.11211 11.2508C0.987109 11.4341 0.924609 11.6508 0.924609 11.9008V12.5008H6.67461L7.37461 13.2008H0.224609ZM12.2246 14.5008L9.67461 11.9508L10.1746 11.4508L12.2246 13.5008L17.2746 8.45078L17.7746 8.95078L12.2246 14.5008ZM6.92461 6.20078C6.18211 6.20078 5.54648 5.93641 5.01774 5.40766C4.48899 4.87891 4.22461 4.24328 4.22461 3.50078C4.22461 2.75828 4.48899 2.12266 5.01774 1.59391C5.54648 1.06516 6.18211 0.800781 6.92461 0.800781C7.66711 0.800781 8.30274 1.06516 8.83148 1.59391C9.36024 2.12266 9.62461 2.75828 9.62461 3.50078C9.62461 4.24328 9.36024 4.87891 8.83148 5.40766C8.30274 5.93641 7.66711 6.20078 6.92461 6.20078ZM6.92461 5.50078C7.47461 5.50078 7.94544 5.30495 8.33711 4.91328C8.72878 4.52161 8.92461 4.05078 8.92461 3.50078C8.92461 2.95078 8.72878 2.47995 8.33711 2.08828C7.94544 1.69661 7.47461 1.50078 6.92461 1.50078C6.37461 1.50078 5.90378 1.69661 5.51211 2.08828C5.12044 2.47995 4.92461 2.95078 4.92461 3.50078C4.92461 4.05078 5.12044 4.52161 5.51211 4.91328C5.90378 5.30495 6.37461 5.50078 6.92461 5.50078Z"
    />
  </svg>
);