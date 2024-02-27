import React from "react";


interface TagProps {
  label: string;
  onRemove: (label: string) => void;
}

export const Tag: React.FC<TagProps> = ({ label, onRemove }) => {
  return (
    <div className="bg-blue-500 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-blue-400" onClick={() => onRemove(label)}>
      {label}
      <span className="ml-2">✕</span>
    </div>
  );
};
