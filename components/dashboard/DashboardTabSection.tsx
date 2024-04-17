import React, { useRef, useState } from "react";
import { DashboardTabs, DashboardTabInfo } from "../../mock/DashboardTypes";

interface DashboardTabSectionProps {
  dashboardTab: DashboardTabs;
  handleTabClick: (tabIdentity: DashboardTabs) => void;
}

export const DashboardTabSection: React.FC<DashboardTabSectionProps> = ({ dashboardTab, handleTabClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const startDragging = (e: React.MouseEvent) => {
    if (ref.current) {
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
      className="flex md:flex-col flex-row md:py-8 md:px-8  sm:place-content-evenly hide-scrollbar px-4 md:px-0"
      style={{
        overflowX: "auto",
        boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.05)",
        clipPath: "inset(-10px -10px -10px 10px)",
        userSelect: "none",
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onMouseDown={startDragging}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
      onMouseMove={whileDragging}
    >
      {Object.entries(DashboardTabInfo).map(([key, title]) => (
        <div className="px-4 md:px-0" key={key}
          onClick={() => handleTabClick(DashboardTabs[key as keyof typeof DashboardTabs])}
        >
          <div className={`py-4 md:my-4 md:py-2 max-w-fit cursor-pointer ${dashboardTab === DashboardTabs[key as keyof typeof DashboardTabs] ? "border-new-blue border-b-4" : ""}`}>
            <p
              className={` whitespace-nowrap ${dashboardTab === DashboardTabs[key as keyof typeof DashboardTabs] ? "font-bold text-new-blue" : ""}`}>
              {title}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
