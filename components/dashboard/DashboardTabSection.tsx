import React, { useRef, useState, useEffect } from "react";
import { DashboardTabs, dashboardTypeStringConversions } from "../../mock/DashboardTypes";

interface DashboardTabSectionProps {
  dashboardTab: DashboardTabs;
  handleTabClick: (tabIdentity: DashboardTabs) => void;
}

export const DashboardTabSection: React.FC<DashboardTabSectionProps> = ({ dashboardTab, handleTabClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isDraggable, setIsDraggable] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const handleResize = () => {
      setIsDraggable(mediaQuery.matches);
    };
    mediaQuery.addEventListener("change", handleResize);
    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);  

  const startDragging = (e: React.MouseEvent) => {
    if (isDraggable && ref.current) {
      setIsDragging(true);
      setStartX(e.pageX - ref.current.offsetLeft);
      setScrollLeft(ref.current.scrollLeft);
    }
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  const whileDragging = (e: React.MouseEvent) => {
    if (!isDragging || !ref.current) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - startX) * 0.5; //scroll-speed
    ref.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div ref={ref} 
      className="flex md:flex-col flex-row md:py-8 md:px-8  sm:place-content-evenly md:place-content-baseline hide-scrollbar px-4 md:px-0"
      style={{
        overflowX: "auto",
        boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.05)",
        clipPath: "inset(-10px -10px -10px 10px)",
        userSelect: "none",
        cursor: isDragging && isDraggable ? "grabbing" : (isDraggable ? "grab" : "auto"),
      }}
      onMouseDown={startDragging}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
      onMouseMove={whileDragging}
    >
      {Object.entries(dashboardTypeStringConversions).map(([key, {display}]) => (
        <div className="px-4 md:px-0" key={key}
          onClick={() => handleTabClick(key as DashboardTabs)}
        >
          <div className={`py-4 md:my-4 md:py-2 max-w-fit cursor-pointer ${dashboardTab === key ? "border-new-blue border-b-4" : ""}`}>
            <p
              className={` whitespace-nowrap ${dashboardTab === key ? "font-bold text-new-blue" : ""}`}>
              {display}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
