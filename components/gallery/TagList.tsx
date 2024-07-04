import React from "react";
import { Tag } from "./Tag"; 
import { gsap } from "gsap";
import { Flip } from "gsap/all";
import { useEffect, useRef } from "react";
import { filterableOptions as initialFilterableOptions } from "../../mock/filterableOptionsData";


gsap.registerPlugin(Flip);

interface TagListProps {
  filterableOptions: typeof initialFilterableOptions;
  updateFilterOption: (optionName: string, updates: Partial<{ number: number; active: boolean; }>) => void;
  clearAllFilters: () => void;
  dropdownActive: boolean;
}

export const TagList = (props: TagListProps) => {

  const paramsObj: { [key: string]: string[] } = {};
    
  props.filterableOptions.forEach(option => {
    const activeOptions = option.options
      .filter((item: { active: boolean }) => item.active)
      .map((item: { name: string }) => item.name);

    if (activeOptions.length > 0) {
      paramsObj[option.id] = activeOptions;
    }
  });

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const state = Flip.getState(containerRef.current);

      // Update classList based on dropdownActive
      if (props.dropdownActive) {
        // Dropdown active classes
        containerRef.current.classList.add("col-start-7", "xl:col-span-15", "xl:col-start-6");
      } else {
        // Dropdown inactive classes
        containerRef.current.classList.add("col-start-1", "col-span-20");
        containerRef.current.classList.remove("col-start-7", "xl:col-span-15", "xl:col-start-6");
      }

      Flip.from(state, {
        duration: 0.3,
        ease: "power1.inOut",
        onComplete: () => {
        }
      });
    }
  }, [props.dropdownActive]);

  const removeTag = (filterType: string, filterValue: string) => {
    const updatedParams = paramsObj;
    Object.keys(updatedParams).forEach(key => {
      updatedParams[key] = updatedParams[key].filter(value => value !== filterValue);
      if (updatedParams[key].length === 0) {
        delete updatedParams[key];
      }
    });
    props.updateFilterOption(filterValue, {active: false}); // False to delete
  };

  // Ignore keys that shouldn't be displayed as filters to the user 
  const filteredKeys = Object.keys(paramsObj).filter(key => key !== "page" && key !== "sort" && key !== "id");

  // Check if there are multiple active filters
  const hasMultipleActiveFilters = filteredKeys.some(key => paramsObj[key].length > 1);

  return (
    <div ref={containerRef} className="relative flex flex-wrap gap-2 row-start-1 ">
      {hasMultipleActiveFilters && (
        <button onClick={() => props.clearAllFilters()} className="px-5 py-2 text-black cursor-pointer font-semibold h-[40px] select-none">
          Clear filters
        </button>
      )}
      {filteredKeys.map(key =>
        paramsObj[key].map(value => <Tag key={value} label={value} filterType={key} onRemove={() => removeTag(key, value)} dropdownActive={props.dropdownActive}/>)
      )}
    </div>
  );
};
