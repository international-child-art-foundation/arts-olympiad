"use client";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useGlobalContext } from "@/app/GlobalContext";

const pageview = (GA_MEASUREMENT_ID: string | undefined, url: string) => {
  if (GA_MEASUREMENT_ID && window.gtag) {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

export default function GoogleAnalytics({ GA_MEASUREMENT_ID }: { GA_MEASUREMENT_ID: string | undefined }) {
  const { isCookieConsentAcquired } = useGlobalContext();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + (searchParams?.toString() ?? "");
    pageview(GA_MEASUREMENT_ID, url);
  }, [pathname, searchParams, GA_MEASUREMENT_ID]);

  if (!GA_MEASUREMENT_ID) {
    return null; // Don't render anything if GA_MEASUREMENT_ID is not found
  }

  // String parsing issues in below tag resolved by these variables
  const granted = "'granted'";
  const denied = "'denied'";

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag("js", new Date());

          gtag("consent", "default", { "analytics_storage": ${isCookieConsentAcquired ? granted : denied }});
          gtag("config", "${GA_MEASUREMENT_ID}", {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}