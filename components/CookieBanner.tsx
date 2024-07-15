"use client";
import { useGlobalContext } from "@/app/GlobalContext";

export default function CookieBanner() {
  const { setGlobalCookieConsentValue, cookieBannerVisible, setCookieBannerVisible } = useGlobalContext();

  const handleUserCookieResponse = (consentValue: boolean) => {
    setGlobalCookieConsentValue(consentValue);
    setCookieBannerVisible(false);
  };

  return (
    cookieBannerVisible && (
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 text-center z-[25]">
        <span onClick={() => setCookieBannerVisible(false)} className="absolute top-0 right-0 text-5xl font-light p-4 cursor-pointer active:scale-90">&times;</span>
        
        <p className="mb-4 max-w-[90%] w-[800px] mx-auto">
        Hey there!
        </p>
        <p className="mb-4 max-w-[90%] w-[800px] mx-auto">
        🍪 We use cookies to enable you to log in. 
        We also have optional cookies which help us learn more about the behavior and location of our users so we can continue to improve our worldwide competition.
        </p>
        <p className="mb-4 max-w-[90%] w-[800px] mx-auto">
        You can choose to accept or deny these optional cookies. 
        And don't worry, you can change your cookie settings anytime by clicking the Cookie Settings button at the bottom of the page. 
        </p>

        <div className="flex m-auto justify-center">
          <button
            onClick={() => handleUserCookieResponse(true)}
            className="bg-new-blue text-white py-1 px-3 ml-2 rounded w-[200px]"
          >
            Accept
          </button>
          <button
            onClick={() => handleUserCookieResponse(false)}
            className="bg-new-blue text-white py-1 px-3 ml-2 rounded w-[200px]"
          >
            Deny
          </button>
        </div>
      </div>
    )
  );
}

