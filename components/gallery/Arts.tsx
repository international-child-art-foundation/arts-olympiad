"use client";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useCallback, useState } from "react";
import { artworks } from "../../mock/artworks";
import { MenuIcon } from "../../public/svgs/gallery-svg/MenuIcon";
import Checkbox from "./Checkbox";
import ArtworkCard from "./ArtworkCard";
import Pagination from "../pagination/Pagination";
import blueBlobs from "../../public/svgs/gallery-svg/blueBlobs.svg";
import multiBlueblobs from "../../public/svgs/gallery-svg/multiBlueblobs.svg";
import Image from "next/image";
import Filter from "./Filter";
import { TagList } from "./TagList";
import ArtworkModal from "./ArtworkModal";
import { useFilters } from "./FilterContext";
import MobileFilter from "./MobileFilter";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { sortValue as sortValueType } from "../../mock/sortValueType";
import { sortBy } from "../../mock/sortBy";
import { ContestState } from "../../mock/contestState";
import { filterableOptions as initialFilterableOptions } from "../../mock/filterableOptionsData";

interface ArtsProps {
  contestState: ContestState;
}

type ParamsObjType = Record<string, string[]>;

function isArtworkAvailable(arr1?: string[], arr2?: string[]) {
  if (!arr1 || !arr2) {
    return true;
  }
  return arr1.some((item) => arr2?.includes(item));
}

export const Arts: React.FC<ArtsProps> = ({ contestState }) => {
  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { filterableOptions, setFilterOption, bulkAlterCategoryOptions, resetAllFilters, //activateOptionsByName,
    pageNumber, setPageNumber,
    sortValue, setsortValue,
    activeEntryId, setActiveEntryId } = useFilters();

  const [paramsObj, setParamsObj] = useState<Record<string, string[]>>({});

  const { windowWidth, windowHeight } = useWindowDimensions();
  const isMobile = windowWidth < 1024;
  const isHorizontal = windowWidth > windowHeight;
  const searchParams = useSearchParams();
  const artworksPerPage = 20;
  const startIndex = (pageNumber - 1) * artworksPerPage;
  const endIndex = startIndex + artworksPerPage;

  // paramsObj is derivable from filterableOptions and thus unnecessary.
  // Will likely be removed during API integration.
  function createParamsObj(filterableOptions: typeof initialFilterableOptions): ParamsObjType {
    const paramsObj: { [key: string]: string[] } = {};
    
    filterableOptions.forEach(option => {
      const activeOptions = option.options
        .filter((item: { active: boolean }) => item.active)
        .map((item: { name: string }) => item.name);
  
      if (activeOptions.length > 0) {
        paramsObj[option.id] = activeOptions;
      }
    });
  
    return paramsObj;
  }

  useEffect(() => {
    setParamsObj(createParamsObj(filterableOptions));
  }, [filterableOptions]);
  
  

  // const [prevUrl, setPrevUrl] = useState("");

  // When filter list is opened, snapshot our data objects. When filter list is closed, compare to snapshot, and call API if changed.
  // useEffect(() => {
  //   if (isFilterOpen) {
  //     // Capture the current URL when the dropdown is opened
  //     setPrevUrl(window.location.href);
  //   } else {
  //     // When the dropdown is closed, check if the URL has changed
  //     const currentUrl = window.location.href;
  //     if (prevUrl !== currentUrl) {
  //       // API call occurs
  //     }
  //   }
  // }, [isFilterOpen, prevUrl]);

  {/* The state of our application is handled by our FilterContext.tsx file. Variables imported from useFilters() represent our state.*/}
  {/* Generally when an action occurs that changes the state of our application, we update the URL to reflect those changes to the user. */}
  const updateURLFromState = useCallback(() => {
    const currentParams = new URLSearchParams();
  
    // Update URL based on filterableOptions
    filterableOptions.forEach((category) => {
      const activeOptions = category.options
        .filter(option => option.active)
        .map(option => option.name);
  
      if (activeOptions.length > 0) {
        currentParams.set(category.id, activeOptions.join(","));
      }
    });
  
    // Update URL based on pageNumber
    if (pageNumber > 1) {
      currentParams.set("page", pageNumber.toString());
    }
  
    // Update URL based on sortValue
    if (sortValue && sortValue !== "Newest") {
      currentParams.set("sort", sortValue);
    }
  
    // If modal is open, add ID to the url
    if (isModalOpen) {
      currentParams.set("id", activeEntryId);
    }
  
    // Push the updated URL
    router.push(`${window.location.pathname}?${currentParams.toString()}`, { scroll: false });
  }, [filterableOptions, pageNumber, sortValue, isModalOpen, activeEntryId, router]);
  
  useEffect(() => {
    updateURLFromState();
  }, [updateURLFromState, filterableOptions, pageNumber, sortValue, isModalOpen, activeEntryId]);

  const getShareUrl = () => {
    const baseUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
    const shareUrl = new URL(baseUrl);
    shareUrl.searchParams.set("id", activeEntryId); // Append the activeEntryId as a query parameter
  
    return shareUrl.toString();
  };

  const updatePageNumber = (currentPageNumber: number, newPageNumber: number) => {
    setPageNumber(newPageNumber);
    // console.log("Page number has been updated to " + pageNumber);
    {/* API call: Receive next/previous set of page results based on delta between current and new page number */}
  };
  const updateActiveEntryId = (id: string) => {
    setActiveEntryId(id);
    // console.log("Active entry ID has been updated to " + id);
    {/* API call: Receive enlarged image data/extra attributes of specified artwork of id=id */}
  };

  const openModal = (id: string) => {
    // Only allow user to view artwork if the filter list is closed and the contest has begun.
    if (!isFilterOpen && contestState != ContestState.Inactive) {
      setModalOpen(true);
      updateActiveEntryId(id);
    }
  };

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  {/* If modal is open, prevent page scrolling */}
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);
  
  {/* Listen for "Esc" key to close modal if open*/}
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeModal]);

  {/* Open modal to artwork ID if provided in URl */}
  useEffect(() => {
    const idFromUrl = searchParams.get("id");
    if (idFromUrl) {
      updateActiveEntryId(idFromUrl);
      setModalOpen(true);
    }
  // We ignore the dependency warning because we only intend to run this function one time at page load
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);  
  

  const updateSortValue = (sortValue: sortValueType) => {
    setsortValue(sortValue);
    // console.log("The new sort value is: " + sortValue);
    {/* API call: Get artwork with sort value applied */}
  };

  const updateFilterOption = (optionName: string, updates: Partial<{ number: number; active: boolean; }>) => {
    setFilterOption(optionName, updates);
    // console.log("The new filter object is:" + optionName);
    {/* API call does not occur here, it occurs when filter menu is closed. */}
  };

  // This function will be used if we decide to load data from URL on page load (other than ID).
  // const activateOneOrManyFilterOptions = (names: string[]) => {
  //   activateOptionsByName(names);
  //   console.log("The filter options have been activated. ");
  //   {/* API call: Get artwork data from filterable options. May need advanced throttling technique here, or just give constant delay. */}
  // };

  const alterFiltersByCategory = (categoryId: string, activeStatus: boolean) => {
    bulkAlterCategoryOptions(categoryId, activeStatus);
    // console.log("Filters of type " + categoryId + " now have an active status of: " + activeStatus);
  };

  const clearAllFilters = () => {
    resetAllFilters();
    // console.log("All filters have been cleared.");
  };


  let filteredArts = artworks.filter((artwork) => {
    const hasSport = isArtworkAvailable(artwork.sport, paramsObj?.sport);
    const isLocationAvailable = isArtworkAvailable(artwork.country, paramsObj?.country);
    return isLocationAvailable && hasSport;
  });
  filteredArts = filteredArts.sort((artwork1, artwork2) => {
    switch (paramsObj?.sort?.[0]) {
    case "Oldest":
      return Date.parse(artwork1.uploadAt) - Date.parse(artwork2.uploadAt);
    case "Newest":
      return Date.parse(artwork2.uploadAt) - Date.parse(artwork1.uploadAt);
    case "Most Popular":
      return artwork2.votes - artwork1.votes;
    default:
      return 0;
    }
  });

  if (Object.keys(paramsObj).length === 0) {
    filteredArts = artworks;
  }
  // Closes filter if background of grid is clicked by the user
  const handleGridClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (!target.classList.contains("background-area")) {
      if (isFilterOpen) {
        setIsFilterOpen(false);
      }
    }
  };
  const pageData = filteredArts.slice(startIndex, endIndex);

  return (
    <div className={`${contestState == ContestState.Inactive && "opacity-60 pointer-events-none select-none blur-sm relative"} `}>
      <ArtworkModal id={activeEntryId} closeModal={closeModal} isMobile={isMobile} isHorizontal={isHorizontal} modalState={isModalOpen} getShareUrl={getShareUrl}/>
      {isMobile && <MobileFilter isFilterOpen={isFilterOpen} setIsFilterOpen={setIsFilterOpen} updateFilterOption={updateFilterOption} updateSortValue={updateSortValue} alterFiltersByCategory={alterFiltersByCategory} resetAllFilters={resetAllFilters} /> }
      <div className="relative px-8 md:px-12 lg:px-16 xl:px-20 max-w-screen-2xl z-0 m-auto w-screen">
        {/* Flexbox 1 - Contains filter open/close button on left side, and Sort title/maybe options on right side */}
        <div className="relative z-[100] flex justify-between" >
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-[200px] max-w-[40%] h-[50px] text-base font-medium px-5 py-2 border border-gray-600 rounded-md text-neutral-black text-center items-center inline-flex justify-between ">
            {isFilterOpen ? "Hide Filter" : "Filter"}
            <span className="ml-6"><MenuIcon /></span>
          </button>
          {/* Sort section, disabled on mobile */}
          { !isMobile && 
          <div className="bg-[#f9faf6] rounded-lg w-[200px] max-w-[40%] absolute right-0 ">
            <Checkbox
              category="sort"
              title="Sort"
              options={sortBy}
              type="radio"
              updateFilterOption={updateFilterOption}
              updateSortValue={updateSortValue}
              alterFiltersByCategory={alterFiltersByCategory}
            />
          </div>
          }
        </div>
        {/* Grid 2 - Filter list active: leftmost columns contain filter options, middle columns contain active filters, last columns contain Sort options (optionally) */}
        {/* Filter list inactive - leftmost columns contain active filters, last column contains sort options (potentially) */}
        <div className="grid relative z-[60] mt-4 " style={{gridTemplateRows: "auto 1fr", gridTemplateColumns: "repeat(20, 1fr)"}} >
          {/* Artwork content section */}
          <section 
            className={`transition-all duration-300 ease-in-out background-area pointer-events-auto ${isFilterOpen ? "blur-lg pointer-events-none select-none opacity-40" : ""} justify-center relative row-start-2`} 
            onClick={handleGridClick}
            style={{gridColumn: "1 / 21"}} 
          >
            <hr className="my-10 border-new-black border-t-0.5 w-full"></hr>
            <div className="">
              <Image src={blueBlobs} alt="" className="-z-10 absolute top-1/4 right-0" />
              <Image src={multiBlueblobs} alt="" className="-z-10 absolute top-1/4 left-0" />
              <div className="grid grid-cols-2 gap-x-2 gap-y-6 xl:grid-cols-4 xl:gap-x-6 xl:gap-y-10">
                {pageData.map((artwork) =>
                  <div className="flex h-full bg-neutral-white" key={artwork.id}>
                    <ArtworkCard
                      paramsObj={paramsObj}
                      id={artwork.id.toString()}
                      name={artwork.name}
                      votes={artwork.votes}
                      url={artwork.url}
                      country={artwork.country}
                      age={artwork.age}
                      sport={artwork.sport}
                      openModal={openModal}
                    />
                  </div>
                )}
              </div>
              <Pagination
                totalItems={filteredArts.length}
                currentPage={pageNumber}
                itemsPerPage={artworksPerPage}
                updatePageNumber={updatePageNumber}
              />
            </div>
          </section>
          {/* Filter */}
          <section className={`relative z-50 row-start-1 row-span-2 col-start-1  lg:col-span-5 lg:col-start-1 xl:col-span-4 xl:col-start-1 
          ${isFilterOpen ? "relative visible ease-in-out duration-500 pointer-events-auto " : "absolute col-span-0 invisible ease-in-out duration-500 pointer-events-none select-none "}
          `}>
            <div className="relative z-50 flex-wrap w-full">
              <section className="relative max-w-screen-2xl m-auto">
                {!isMobile && <Filter isFilterOpen={isFilterOpen} updateFilterOption={updateFilterOption} updateSortValue={updateSortValue} alterFiltersByCategory={alterFiltersByCategory} />}
              </section>
            </div>
          </section>
          {/* Active filters */}
          <TagList paramsObj={paramsObj} updateFilterOption={updateFilterOption} clearAllFilters={clearAllFilters} dropdownActive={isFilterOpen}/>
        </div>
      </div>
    </div>
  );
};