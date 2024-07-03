"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { ReadonlyURLSearchParams } from "next/navigation";
import { DownIcon } from "../../svgs/DownIconWithoutMargin";
import { UpIcon } from "../../svgs/UpIcon2";
import { gsap } from "gsap";
import { Flip } from "gsap/all";
import { useFilters } from "./PastEntriesFilterContext";
import { sortValue as sortValueType } from "../../../mock/sortValueType";

gsap.registerPlugin(Flip);

type VisibilityState = "Hidden" | "TransitionIn" | "Shown" | "TransitionOut";

interface CheckboxProps {
  category: string;
  title: string;
  options: Array<{ name: string; number: number }>;
  type: string;
  updateFilterOption: (optionName: string, updates: Partial<{ number: number; active: boolean; }>) => void;
  updateSortValue: (sortOption: sortValueType) => void;
  alterFiltersByCategory: (categoryId: string, activeStatus: boolean) => void;
}

interface CheckboxAndRadioItem
  extends React.ComponentPropsWithoutRef<"input"> {
  label: string;
  number: number;
  category: string;
}

function CheckboxAndRadioItem({ label, number, category, ...props }: CheckboxAndRadioItem) {
  return (
    <div className="text-base font-normal text-md w-full h-fit rounded-md text-neutral-black text-start">
      <div>
        <label data-category={category} className={`grid items-center checkbox-and-radio-item select-none gap-4 py-2 my-1 cursor-pointer ${props.checked ? "font-bold" : "font-normal"} `} style={{gridTemplateColumns: "1.5rem auto"}}>
          <input data-category={category} type="checkbox" className="w-6 h-6 py-2 my-1 cursor-pointer" {...props} />
          {label}
          <span className={`${number === 0 ? "hidden" : "visible"}`}>
            (<span>{number}</span>)
          </span>
        </label>
      </div>
    </div>
  );
}

export function saveAllUserOptions(searchParams: ReadonlyURLSearchParams | null) {
  const selectedQueries: Record<string, string[]> = {};
  searchParams?.forEach((values, key) => {
    const queries = values.split(",");
    if (selectedQueries[key]) {
      selectedQueries[key].push(...queries);
    } else {
      selectedQueries[key] = queries;
    }
  });
  return selectedQueries;
}

const Checkbox = (props: CheckboxProps) => {
  const [selectAllChecked, setSelectAllChecked] = useState<boolean>(false);
  const { filterableOptions, sortValue } = useFilters();  // Access global context
  const [visibilityState, setVisibilityState] = useState<VisibilityState>("Hidden");
  const componentRootRef = useRef<HTMLDivElement>(null);

  const startFlipAnimation = useCallback((targetState: VisibilityState, dataCategory: string) => {
    const dropdownMenu = document.querySelector("[data-category='" + dataCategory + "']") as HTMLElement;
    const stateBeforeAnimation = Flip.getState(dropdownMenu);
    if (targetState == "Hidden") {
      setVisibilityState("TransitionOut");
    } 
    if (targetState == "Shown") {
      setVisibilityState("TransitionIn");
    }
  
    if (dropdownMenu) {
      if (dropdownMenu.style.gridAutoRows === "min-content auto") {
        dropdownMenu.style.gridAutoRows = "min-content 0px";
      } else {
        dropdownMenu.style.gridAutoRows = "min-content auto";
      }
    }
    // Determine the end state based on target state
    Flip.from(stateBeforeAnimation, {
      duration: 0.4,
      ease: "power2.inOut",
      absolute: false,
      scale: false,  
      onComplete: () => {
        setVisibilityState(targetState);
      }
    });
  }, [setVisibilityState]);
  
  {/* Hide sort menu if a click is registered outside of its bounds while open */}
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (props.category === "sort" && (visibilityState === "Shown" || visibilityState === "TransitionIn")) {
        if (componentRootRef.current && !componentRootRef.current.contains(event.target as Node)) {
          startFlipAnimation("Hidden", "sort");
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [visibilityState, props.type, props.category, startFlipAnimation]);

  useEffect(() => {
    const allChecked = props.options.every(option => {
      const category = filterableOptions.find(cat => cat.id === props.category);
      const opt = category?.options.find(opt => opt.name === option.name);
      return opt?.active;
    });
    setSelectAllChecked(allChecked);

    {/* There is a strange functionality that causes the mobile sort menu to scroll down to highlight the selected option if it exists when the menu is rendered. */}
    {/* This is a hacky solution to that problem. */}
    const divContainer = document.getElementById(props.category);
    if (divContainer) {
      divContainer.scrollTop = 0;
    }
  }, [filterableOptions, props.options, props.category]);  

  const handleSelectAllChange = (isChecked: boolean, category: string) => {
    if (isChecked) {
      props.alterFiltersByCategory(category, true);
    } else {
      props.alterFiltersByCategory(category, false);
    }
    setSelectAllChecked(isChecked);
  };  

  const toggleVisibility = (id: string) => {
    if (visibilityState === "Hidden" || visibilityState === "TransitionOut") {
      startFlipAnimation("Shown", id);
    } else if (visibilityState === "Shown" || visibilityState === "TransitionIn") {
      startFlipAnimation("Hidden", id);
    }
  };

  const isOptionChecked = (category: string, option: string) => {
    // Find the current option in the global context and return its 'active' status
    if (props.type === "checkbox") {
      const filterCategories = filterableOptions.find((cat) => cat.id === category);
      const opt = filterCategories?.options.find((opt) => opt.name === option);
      return opt?.active || false;
    } else if (props.type === "radio") {
      if (option == sortValue) {
        return true;
      } else {
        return false;
      }
    }
  };

  const handleValueChange = (optionName: string, isActive: boolean) => {
    if (props.type === "radio") {
      props.updateSortValue(optionName as sortValueType);
    } else {
      props.updateFilterOption(optionName, { active: isActive });
    }
  };
  
  return (
    <>
      <section data-category={props.category} 
        className="overflow-hidden text-base font-medium h-fit px-5 border border-gray-600 rounded-lg text-neutral-black grid" 
        key={props.category}
        style={{gridAutoRows:  "min-content 0px"}}
        ref={componentRootRef}
      >
        <button
          onClick={() => toggleVisibility(props.category)} className="w-full text-base font-medium h-fit text-neutral-black inline-flex py-3">
          {props.title}
          <p className="ms-auto self-center">
            {(visibilityState == "Hidden" || visibilityState == "TransitionOut") &&  <UpIcon />}
            {(visibilityState == "Shown" || visibilityState == "TransitionIn") &&  <DownIcon />}
          </p>
        </button>
        <div className={`w-full flex flex-col py-4 ${visibilityState == "Hidden" ? "border-t-0" : "border-t-1 border-black"}`}>
          {props.type == "checkbox" && (
            <CheckboxAndRadioItem
              type={props.type}
              category={props.category}
              number={0}
              label={"Select All"}
              onChange={(e) => handleSelectAllChange(e.target.checked, props.category)}
              checked={selectAllChecked}
            />
          )}
          {/* <div className="h-px w-40 bg-gray-400"></div> */}
          {props.options.map((option) => {
            return (
              <CheckboxAndRadioItem
                key={option.name}
                type={props.type}
                category={props.category}
                number={option.number}
                label={option.name}
                onChange={(e) => handleValueChange(option.name, e.target.checked)}
                checked={isOptionChecked(props.category, option.name)}
              />
            );
          })}
          <button 
            className={`text-black cursor-pointer font-semibold pt-4 m-auto ${props.type == "radio" ? "hidden" : "visible"}`}
            onClick={() => {toggleVisibility(props.category);
              props.alterFiltersByCategory(props.category, false);
            }}
          >
            Clear filters
          </button>
        </div>
      </section>
    </>
  );
};

export default Checkbox;