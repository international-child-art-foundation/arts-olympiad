"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { filterableOptions as initialFilterableOptions } from "../../mock/filterableOptionsData";
import { sortValue as sortValueType } from "../../mock/sortValueType";

type FilterableOption = {
  id: string;
  categoryType: string;
  title: string;
  options: { name: string; number: number; active: boolean; }[];
  filterType: string;
};

interface FilterContextType {
  filterableOptions: FilterableOption[];
  setFilterOption: (optionName: string, updates: Partial<{ number: number; active: boolean; }>) => void;
  setFilterableOptions: (newOptions: FilterableOption[]) => void;
  activateOptionsByName: (names: string[]) => void;
  bulkAlterCategoryOptions: (categoryId: string, activeStatus: boolean) => void;
  resetAllFilters: () => void;
  pageNumber: number;
  setPageNumber: (newPageNumber: number) => void;
  sortValue: sortValueType; 
  setSortValue: (newSortOption: sortValueType) => void;
  activeEntrySk: string | null;
  setActiveEntrySk: (newActiveEntrySk: string | null) => void;
  votedSk: string | undefined;
  setVotedSk: (artwork_sk: string) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

interface FilterProviderProps {
  children: ReactNode;
}

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
  const [filterableOptions, setFilterableOptionsState] = useState<FilterableOption[]>(initialFilterableOptions);
  const [pageNumber, setPageNumber] = useState(1);
  const [sortValue, setSortValue] = useState<sortValueType>("Newest");
  const [activeEntrySk, setActiveEntrySk] = useState<string | null>(null);
  const [votedSk, setVotedSk] = useState<string | undefined>(undefined);

  const setFilterableOptions = (newOptions: FilterableOption[]) => {
    setFilterableOptionsState(newOptions);
  };

  const setFilterOption = (optionName: string, updates: Partial<{ number: number; active: boolean; }>) => {
    setFilterableOptionsState(prevOptions => 
      prevOptions.map(category => ({
        ...category,
        options: category.options.map(option => 
          option.name === optionName ? { ...option, ...updates } : option
        ),
      }))
    );
  };
  
  const activateOptionsByName = (names: string[]) => {
    setFilterableOptionsState(prevOptions => 
      prevOptions.map(category => ({
        ...category,
        options: category.options.map(option => ({
          ...option,
          active: names.includes(option.name) ? true : option.active,
        })),
      }))
    );
  };

  const bulkAlterCategoryOptions = (categoryId: string, activeStatus: boolean) => {
    setFilterableOptionsState(prevOptions => 
      prevOptions.map(category => 
        category.id === categoryId
          ? {
            ...category,
            options: category.options.map(option => ({
              ...option,
              active: activeStatus,
            })),
          }
          : category
      )
    );
  };

  const resetAllFilters = () => {
    setFilterableOptionsState(prevOptions => 
      prevOptions.map(category => ({
        ...category,
        options: category.options.map(option => ({
          ...option,
          active: false,
        })),
      }))
    );
  };
  
  return (
    <FilterContext.Provider value={{
      filterableOptions, setFilterOption, setFilterableOptions,
      activateOptionsByName, bulkAlterCategoryOptions,
      resetAllFilters,
      pageNumber, setPageNumber,
      sortValue, setSortValue,
      activeEntrySk, setActiveEntrySk,
      votedSk, setVotedSk
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