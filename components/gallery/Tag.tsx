import React from "react";

interface TagProps {
  label: string;
  filterType: string; 
  onRemove: (filterType: string, label: string) => void;
  dropdownActive: boolean;
}

export const Tag: React.FC<TagProps> = ({ label, filterType, onRemove, dropdownActive }) => {
  return (
    <div className="bg-new-blue text-white px-4 py-2 rounded cursor-pointer select-none content-center align-center" onClick={() => 
    {
      if (dropdownActive) {
        onRemove(filterType, label);
      }
    }}>
      {label}
      {dropdownActive && <span className="ml-2">✕</span>}
    </div>
  );
};
