// "use client";

// import { useEffect } from "react";
// import { usePathname } from "next/navigation";

// /**
//  * @documentation: https://nextjs.org/docs/app/api-reference/functions/use-router#router-events
//  * @description keeps track of the current page in order to remove artworkSubmissionData session storage item when current page is not dashboard
//  */
// export function NavigationEvents() {
//   const pathname = usePathname();

//   useEffect(() => {
//     // Normalize pathname to remove leading slash
//     const normalizedPath = pathname.startsWith("/") ? pathname.slice(1) : pathname;
//     // Check if the current page is part of the dashboard
//     if (!normalizedPath.startsWith("dashboard")) {
//       // if not - remove the artwork submission session storage item
//       sessionStorage.removeItem("artworkSubmissionData");
//     }
//   }, [pathname]);
  
//   return null;
// }