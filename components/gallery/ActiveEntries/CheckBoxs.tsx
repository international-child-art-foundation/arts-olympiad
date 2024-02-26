"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { ReadonlyURLSearchParams, useSearchParams, useRouter } from "next/navigation";
import { DownIcon } from "../../svgs/DownIcon2";
import { UpIcon } from "../../svgs/UpIcon2";
import Link from "next/link";
// import { gsap } from "gsap";

interface CheBoxcksProps {
  id: string;
  title: string;
  options: Array<Provider>;
  type: string;
}

interface Provider {
  name: string,
  number: number
}

interface FilterUsingCheckboxAndRadioButtons {
  children: React.ReactNode;
}

interface CheckboxAndRadioItems
  extends React.ComponentPropsWithoutRef<"input"> {
  label: string;
  number: number;
}

function CheckboxesAndRadioButtons({
  children,
}: FilterUsingCheckboxAndRadioButtons) {
  return <div className="text-base font-medium w-full h-fit rounded-md text-neutral-black text-start">{children}</div>;
}

function CheckboxAndRadioItem({ id, label, number, ...props }: CheckboxAndRadioItems) {
  return (
    <div className="relative">
      <input id={id} className="w-4 h-4" {...props} />
      <label htmlFor={id} className="ml-3 text-md">
        {label}
        <span className={` ${number == 0 ? "hidden" : "visible"}`}>
          (<span>{number}</span>)
        </span>
      </label>
    </div>
  );
}

function convertValidStringQueries(queries: Record<string, string[]>) {
  let query = "";
  for (const [key, value] of Object.entries(queries)) {
    query = query + `${query === "" ? "" : "&"}${key}=${value}`;
  }
  return query;
}

function checkValidQuery(queries: string[]) {
  return queries.filter((query) => query !== "").length > 0;
}

export function saveAllUserOptions(searchParams: ReadonlyURLSearchParams) {
  const selectedQueries: Record<string, string[]> = {};

  searchParams.forEach((values, key) => {
    const queries = values.split(",");

    if (selectedQueries[key]) {
      selectedQueries[key].push(...queries);
    } else {
      selectedQueries[key] = queries;
    }
  });

  return selectedQueries;
}

const CheBoxcks = (props: CheBoxcksProps) => {
  const [isExpanded, SetIsExpanded] = useState(false);
  // const manageExpand = () => {
  //   SetIsExpanded(true);
  //   gsap.fromTo(".drop", {opacity:1, y:0 }, {opacity:1, y:0, duration: 0.7, ease: "power3.out"});
  // };

  // const manageClose = () => {
  //   //delay 500ms then hidden so that the animation can show
  //   const timeout = setTimeout(() => {
  //     SetIsExpanded(false)
  //   }, 500);
  //   gsap.fromTo(".drop", {opacity:1, y:20 }, {opacity:0, y:0, duration: 0.7, ease: "power3.out"});
  // }; 

  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedFilterQueries, setSelectedFilterQueries] = useState<Record<string, string[]>>({});

  useEffect(() => {
    const paramsObj = saveAllUserOptions(searchParams);
    setSelectedFilterQueries(paramsObj);
  }, [searchParams]);

  function selectedFilterOptions(event: ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    const value = event.target.value;
    const filterType = event.target.type;

    const selectedQueries = selectedFilterQueries;
    if (selectedQueries[name]) {
      if (filterType === "radio") {
        selectedQueries[name] = [value];
      }
      else if (selectedQueries[name].includes(value)) {
        selectedQueries[name] = selectedQueries[name].filter(
          (query) => query !== value
        );
        if (!checkValidQuery(selectedQueries[name])) {
          delete selectedQueries[name];
        }
      }
      else {
        selectedQueries[name].push(value);
      }
    }
    else if (selectedQueries) {
      selectedQueries[name] = [value];
    }
    router.push(`/ActiveEntries/?${convertValidStringQueries(selectedQueries)}`, { scroll: false, });
  }

  function isOptionChecked(id: string, option: string) {
    return (
      Boolean(selectedFilterQueries[id]) &&
      selectedFilterQueries[id].includes(option)
    );

  }

  return (
    <>
      {!isExpanded &&
        <button
          onClick={() => SetIsExpanded(true)} className="w-full text-base font-medium h-fit px-5 py-2 border border-gray-600 rounded-md text-neutral-black inline-flex">
          {props.title}
          <p className="ms-auto">
            <DownIcon />
          </p>
        </button>
      }

      {isExpanded &&
        <div className="drop">
          <section className="text-base font-medium h-fit px-5 border border-gray-600 rounded-lg text-neutral-black" key={props.id}>
            <button
              onClick={() => SetIsExpanded(false)} className="w-full text-base font-medium h-fit text-neutral-black inline-flex py-2">
              {props.title}
              <p className="ms-auto">
                <UpIcon />
              </p>
            </button>

            <hr className="w-full mb-4 border-new-black border-t-0.5"></hr>
            <div className="w-full">
              {props.options.map((option) => {
                return (
                  <CheckboxesAndRadioButtons key={option.name}>
                    <CheckboxAndRadioItem
                      type={props.type}
                      name={props.id}
                      number={option.number}
                      label={option.name}
                      id={option.name}
                      value={option.name}
                      onChange={selectedFilterOptions}
                      checked={isOptionChecked(props.id, option.name)}
                    />

                  </CheckboxesAndRadioButtons>

                );
              })}
              <Link href="/ActiveEntries/">
                <button className={`ml-16 text-black cursor-pointer font-semibold ${props.id == "sort" ? "hidden" : "visible"}`}>
                  Clear filters
                </button>
              </Link>
            </div>
          </section>
          {/* <section>
        {selectedFilterQueries.map((ss) => 
        {
          {ss.name}
        })}
      </section> */}
        </div>
      }
    </>
  );
};

export default CheBoxcks;