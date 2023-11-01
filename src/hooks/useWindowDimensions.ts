import { useState, useEffect } from "react";

type Dimensions = {
  windowWidth: number;
  windowHeight: number;
  orientation: "landscape" | "portrait";
}

function useWindowDimensions() {
  const [dimensions, setDimensions] = useState<Dimensions>({ windowWidth: window?.innerWidth, windowHeight: window?.innerHeight, orientation: "portrait" });

  useEffect(() => {
    function handleResize() {
      setDimensions({
        windowWidth: window?.innerWidth,
        windowHeight: window?.innerHeight,
        orientation: dimensions.orientation
      });
    }
    handleResize();
    window?.addEventListener("resize", handleResize);

    return () => {
      window?.removeEventListener("resize", handleResize);
    };
  });

  const orientation = dimensions.windowWidth > dimensions.windowHeight ? "landscape" : "portrait";
  dimensions.orientation = orientation;

  return dimensions;
}

export default useWindowDimensions;