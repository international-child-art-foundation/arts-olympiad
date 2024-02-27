import React from "react";
import { Tag } from "./Tag"; 


interface TagListProps {
  paramsObj: Record<string, string[]>;
  updateFilters: (updatedParams: Record<string, string[]>) => void;
}

export const TagList: React.FC<TagListProps> = ({ paramsObj, updateFilters }) => {
  // Function to handle removing a tag
  const removeTag = (label: string) => {
    const updatedParams = { ...paramsObj };

    Object.keys(updatedParams).forEach(key => {
      updatedParams[key] = updatedParams[key].filter(value => value !== label);
      if (updatedParams[key].length === 0) {
        delete updatedParams[key];
      }
    });

    // Update filters here, possibly updating the URL search params
    updateFilters(updatedParams);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {Object.keys(paramsObj).map(key =>
        paramsObj[key].map(value => <Tag key={value} label={value} onRemove={removeTag} />)
      )}
    </div>
  );
};
