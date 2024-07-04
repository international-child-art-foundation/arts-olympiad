"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { filterableOptions as initialFilterableOptions } from "../../mock/filterableOptionsData";
import { sortValue as sortValueType } from "../../mock/sortValueType";

interface FilterContextType {
  filterableOptions: typeof initialFilterableOptions;
  setFilterOption: (optionName: string, updates: Partial<{ number: number; active: boolean; }>) => void;
  activateOptionsByName: (names: string[]) => void;
  bulkAlterCategoryOptions: (categoryId: string, activeStatus: boolean) => void;
  resetAllFilters: () => void;
  pageNumber: number;
  setPageNumber: (newPageNumber: number) => void;
  sortValue: sortValueType; 
  setSortValue: (newSortOption: sortValueType) => void;
  activeEntryId: string | null;
  setActiveEntryId: (newActiveEntryId: string | null) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

interface FilterProviderProps {
  children: ReactNode;
}

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
  const [filterableOptions, setFilterableOptions] = useState(initialFilterableOptions);
  const [pageNumber, setPageNumber] = useState(1);
  const [sortValue, setSortValue] = useState<sortValueType>("Newest");
  const [activeEntryId, setActiveEntryId] = useState<string | null>(null);

  // Sets the attributes of one filter option
  const setFilterOption = (optionName: string, updates: Partial<{ number: number; active: boolean; }>) => {
    setFilterableOptions((prevOptions) => {
      return prevOptions.map((category) => ({
        ...category,
        options: category.options.map((option) => {
          if (option.name === optionName) {
            return { ...option, ...updates };
          }
          return option;
        }),
      }));
    });
  };
  
  // Activates an individual option within a category
  const activateOptionsByName = (names: string[]) => {
    setFilterableOptions((prevOptions) => {
      return prevOptions.map((category) => ({
        ...category,
        options: category.options.map((option) => ({
          ...option,
          active: names.includes(option.name) ? true : option.active,
        })),
      }));
    });
  };

  // Deactivates all options within a specified category
  const bulkAlterCategoryOptions = (categoryId: string, activeStatus: boolean) => {
    setFilterableOptions((prevOptions) => {
      return prevOptions.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            options: category.options.map((option) => ({
              ...option,
              active: activeStatus,
            })),
          };
        }
        return category;
      });
    });
  };

  // Resets all filters to their default state
  const resetAllFilters = () => {
    setFilterableOptions((prevOptions) => {
      return prevOptions.map((category) => ({
        ...category,
        options: category.options.map((option) => ({
          ...option,
          active: false,
        })),
      }));
    });
  };
  
  return (
    <FilterContext.Provider value={{
      filterableOptions, setFilterOption,
      activateOptionsByName, bulkAlterCategoryOptions,
      resetAllFilters,
      pageNumber, setPageNumber,
      sortValue, setSortValue,
      activeEntryId, setActiveEntryId
    }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilters must be used within a FilterProvider");
  }
  return context;
};
