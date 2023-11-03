import { useState, useEffect } from "react";

type Dimensions = {
  windowWidth: number;
  windowHeight: number;
  orientation: "landscape" | "portrait";
}

function useWindowDimensions() {
  const isClient = typeof window === "object"; // Check if window is defined

  const [dimensions, setDimensions] = useState<Dimensions>({
    windowWidth: 0,
    windowHeight: 0,
    orientation: "portrait",
  });

  useEffect(() => {
    if (!isClient) {
      return; // Exit early if running on the server
    }

    function handleResize() {
      setDimensions({
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        orientation:
          window.innerWidth > window.innerHeight ? "landscape" : "portrait",
      });
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isClient]);

  return dimensions;
}


export default useWindowDimensions;