"use client";
import React, { useState, useEffect } from "react";

import CheckBox from "./Checkbox";
import { filterableOptions } from "../../mock/filterableOptionsData";
import { sortValue as sortValueType } from "../../mock/sortValueType";
import Checkbox from "./Checkbox";
import { sortBy } from "../../mock/sortBy";

interface FilterProps {
  isFilterOpen: boolean;
  setIsFilterOpen: (drop: boolean) => void;
  updateFilterOption: (optionName: string, updates: Partial<{ number: number; active: boolean; }>) => void;
  updateSortValue: (sortValue: sortValueType) => void;
  alterFiltersByCategory: (categoryId: string, activeStatus: boolean) => void;
  resetAllFilters: () => void;
}

export const MobileFilter = (props: FilterProps) => {
  const [isVisible, setIsVisible] = useState(props.isFilterOpen);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (props.isFilterOpen) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      // Start the "disappear" animation and wait for it to finish before hiding the component
      timeoutId = setTimeout(() => setIsVisible(false), 1);
    }

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, [props.isFilterOpen]);

  return (
    <div className={`transition-all duration-300 fixed w-full h-full top-0 bg-[#f9faf6] z-[100] p-6 overflow-scroll ${props.isFilterOpen == true ? "opacity-100" : "opacity-0 select-none pointer-events-none"}`}>
      <div className="w-full text-right">

        <span className="cursor-pointer text-4xl p-4 select-none" onClick={() => {
          props.setIsFilterOpen(false);
        }}> &times; </span>
      </div>
      <section className="overflow-y-auto mt-4">
        <div className="bg-[#f9faf6] rounded-lg w-full  ">
          <Checkbox
            category="sort-mobile"
            title="Sort"
            options={sortBy}
            type="radio"
            updateFilterOption={props.updateFilterOption}
            updateSortValue={props.updateSortValue}
            alterFiltersByCategory={props.alterFiltersByCategory}
          />
        </div>

        <div className="p-4 text-center text-xl"> Filter Options </div>
        {filterableOptions.map(({ id, title, options, filterType }) => {
          return (
            <React.Fragment key={id + title}>
              <section className={`transition-all duration-300 ${isVisible ? "mb-4 opacity-100" : "mb-0 opacity-0"}`}>
                <CheckBox
                  category={id}
                  title={title}
                  type={filterType}
                  options={options}
                  updateFilterOption={props.updateFilterOption}
                  updateSortValue={props.updateSortValue}
                  alterFiltersByCategory={props.alterFiltersByCategory}
                />
              </section>
            </React.Fragment>
          );
        })}
      </section>
      <div className="grid grid-cols-2 gap-2">        
        <button 
          className="font-semibold rounded-md border-1 border-black p-2"
          onClick={() => {props.resetAllFilters();}}>Reset Filters</button>
        <button className="rounded-md font-semibold text-white bg-new-blue" onClick={() => {props.setIsFilterOpen(false);}}>
          Apply
        </button>
      </div>
    </div>
  );
};

export default MobileFilter;
