import React, { useState, useEffect } from "react";

/**
 * Hook for handling closing when clicking outside of a ref
 * @param {HTMLElement} ref
 * @param {boolean} initialState
 */
export const useDetectOutsideClick = (ref: React.MutableRefObject<HTMLElement | null> , initialState: boolean) => {
  const [isActive, setIsActive] = useState(initialState);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // First, check if the target is an instance of Node
      if (e.target instanceof Node) {
        if (ref?.current !== null && !ref?.current.contains(e.target)) {
          setIsActive(!isActive);
        }
      }
    };
  
    // If the item is active (ie open) then listen for clicks outside
    if (isActive) {
      window.addEventListener("click", onClick);
    }

    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [isActive, ref]);

  return [isActive, setIsActive as React.Dispatch<React.SetStateAction<boolean>>];
};