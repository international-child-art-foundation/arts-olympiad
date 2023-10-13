import { useState, useEffect } from "react";

type Dimensions = {
  width: number;
  height: number;
  orientation: "landscape" | "portrait";
}

function useWindowDimensions() {
  const [dimensions, setDimensions] = useState<Dimensions>({ width: window?.innerWidth, height: window?.innerHeight, orientation: "portrait" });

  useEffect(() => {
    function handleResize() {
      setDimensions({
        width: window?.innerWidth,
        height: window?.innerHeight,
        orientation: dimensions.orientation
      });
    }
    handleResize();
    window?.addEventListener("resize", handleResize);

    return () => {
      window?.removeEventListener("resize", handleResize);
    };
  }, []);

  const orientation = dimensions.width > dimensions.height ? "landscape" : "portrait";
  dimensions.orientation = orientation;

  return dimensions;
}

export default useWindowDimensions;