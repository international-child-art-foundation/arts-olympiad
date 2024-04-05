import React from "react";
import { DashboardTabs, DashboardTabInfo } from "../../mock/DashboardTypes";

interface DashboardTabSectionProps {
  dashboardTab: DashboardTabs;
  handleTabClick: (tabIdentity: DashboardTabs) => void;
}

export const DashboardTabSection: React.FC<DashboardTabSectionProps> = ({ dashboardTab, handleTabClick }) => {
  return (
    <div className="grid p-8">
      {Object.entries(DashboardTabInfo).map(([key, title ]) => (
        <p
          key={key}
          onClick={() => handleTabClick(DashboardTabs[key as keyof typeof DashboardTabs])}
          className={`py-4 ${dashboardTab === DashboardTabs[key as keyof typeof DashboardTabs] ? "font-bold text-icaf-blue" : ""}`}>
          {title}
        </p>
      ))}
    </div>
  );
};