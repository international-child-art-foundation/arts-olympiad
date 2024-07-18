"use client";
import React, { useState, useEffect } from "react";

import CheckBox from "./PastEntriesCheckbox";
import { filterableOptions } from "../../../mock/filterableOptionsData";
import { sortValue as sortValueType } from "../../../mock/sortValueType";

interface FilterProps {
  isFilterOpen: boolean;
  updateFilterOption: (optionName: string, updates: Partial<{ number: number; active: boolean; }>) => void;
  updateSortValue: (sortValue: sortValueType) => void;
  alterFiltersByCategory: (categoryId: string, activeStatus: boolean) => void;
}

export const Filter = (props: FilterProps) => {
  const [isVisible, setIsVisible] = useState(props.isFilterOpen);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (props.isFilterOpen) {
      setIsVisible(true);
    } else {
      // Start the "disappear" animation and wait for it to finish before hiding the component
      timeoutId = setTimeout(() => setIsVisible(false), 1);
    }

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, [props.isFilterOpen]);

  return (
    <div className="relative w-full">
      <section className="">
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
    </div>
  );
};

export default Filter;