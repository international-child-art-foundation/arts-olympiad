import React from "react";

interface TagProps {
  label: string;
  filterType: string; 
  onRemove: (filterType: string, label: string) => void;
}

export const Tag: React.FC<TagProps> = ({ label, filterType, onRemove }) => {
  return (
    <div className="bg-new-blue text-white px-4 py-2 rounded cursor-pointer select-none content-center align-center" onClick={() => 
    {
      onRemove(filterType, label);
    }}>
      {label}
      <span className="ml-2">✕</span>
    </div>
  );
};
