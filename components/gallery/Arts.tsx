"use client";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useCallback, useState } from "react";
// import { artworks } from "../../mock/artworks";
import { MenuIcon } from "../../public/svgs/gallery-svg/MenuIcon";
import Checkbox from "./Checkbox";
import ArtworkCard from "./ArtworkCard";
import Pagination from "../pagination/Pagination";
import blueBlobs from "../../public/svgs/gallery-svg/blueBlobs.svg";
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
import { getArtworks, getSingleArtworkData } from "@/utils/api-artworks";
import { filterableOptions as initialFilterableOptions } from "../../mock/filterableOptionsData";
import { UserArtworkSchema, GroupOfArtworks } from "@/interfaces/artwork_shapes";
import no_results_found from "../../public/svgs/no_results_found_bg.svg";
import LoadingAnimation from "../svgs/LoadingAnimation";
import { getUserVoteData } from "@/utils/api-user";
import { useGlobalContext } from "@/app/GlobalContext";
import { limiter } from "@/utils/api-rate-limit";
import { useMemo } from "react";

interface ArtsProps {
  contestState: ContestState;
}

interface Option {
  name: string;
  number: number;
  active: boolean;
}

interface FilterableOption {
  id: string;
  categoryType: string;
  title: string;
  options: Option[];
  filterType: string;
}

interface ActiveFilters {
  sports: string[];
  locations: string[];
}

export const Arts: React.FC<ArtsProps> = ({ contestState }) => {
  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { filterableOptions, setFilterableOptions, setFilterOption, bulkAlterCategoryOptions, resetAllFilters, //activateOptionsByName,
    pageNumber, setPageNumber,
    sortValue, setSortValue,
    activeEntrySk, setActiveEntrySk,
    votedSk, setVotedSk } = useFilters();
  const { handleRealizeSignedOut, isAuthenticated } = useGlobalContext();
  const [pageLoadArtwork, setPageLoadArtwork] = useState<UserArtworkSchema | undefined>(undefined);
  const [currentUserSk, setCurrentUserSk] = useState<string | null>(null);

  const { windowWidth } = useWindowDimensions();
  const isMobile = windowWidth < 1024;
  const searchParams = useSearchParams();
  const artworksPerPage = 20;

  const [allArtworks, setAllArtworks] = useState<GroupOfArtworks>([]);
  const [activeArtworks, setActiveArtworks] = useState<GroupOfArtworks>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  function updateFilterableCounts(artworks: GroupOfArtworks) {
    const newFilterableOptions = filterableOptions.map(category => ({
      ...category,
      options: category.options.map(option => ({
        ...option,
        number: artworks.filter(artwork => 
          category.categoryType === "sport" 
            ? artwork.sport === option.name
            : artwork.location === option.name
        ).length
      }))
    }));
  
    setFilterableOptions(newFilterableOptions);
  };

  // useEffect(() => {
  //   console.log(filterableOptions);
  // }, [filterableOptions]);

  // This function will be used if we decide to load data from URL on page load (other than ID).
  // const activateOneOrManyFilterOptions = (names: string[]) => {
  //   activateOptionsByName(names);
  //   console.log("The filter options have been activated. ");
  //   {/* API call: Get artwork data from filterable options. May need advanced throttling technique here, or just give constant delay. */}
  // };

  // Function to fetch artwork data from API
  const fetchArtworkData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await limiter.schedule(() => getArtworks({}));
      if (response.success) {
        const sortedArtworks = sortArtworks(response.data, sortValue);
        updateFilterableCounts(sortedArtworks);
        setAllArtworks(sortedArtworks);
      } else {
        setError("Failed to fetch artwork");
      }
    } catch (err) {
      if (typeof err == "string") {
        setError(err);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const sortArtworks = useCallback((artworks: GroupOfArtworks, sortValue: sortValueType) => {
    if (artworks) {
      if (sortValue === "Most Popular") {
        return [...artworks].sort((a, b) => b.votes - a.votes);
      } else if (sortValue === "Newest") {
        return [...artworks].sort((a, b) => Number(b.timestamp) - Number(a.timestamp));
      } else if (sortValue === "Oldest") {
        return [...artworks].sort((a, b) => Number(a.timestamp) - Number(b.timestamp));
      }
    }
    return artworks || [];
  }, []);

  const fetchUserAuthAndVote = useCallback(async (userSk: string | null) => {
    // We want to fetch the user's data on page load to set their voted-for artwork
    // and to confirm their authentication status before they try to vote.
    if (isAuthenticated || userSk) {
      const userVotedResponse = await limiter.schedule(() => getUserVoteData());
      if (userVotedResponse.success) {
        if (userVotedResponse.voted_sk) {
          setVotedSk(userVotedResponse.voted_sk);
        }
      } else {
        handleRealizeSignedOut();
      }
    }

  }, [setVotedSk, handleRealizeSignedOut, isAuthenticated]);

  // Populate artwork data on page load
  useEffect(() => {
    async function handleIdUponPageLoad() {
      if (searchParams) {
        const skFromUrl = searchParams.get("id");
        if (skFromUrl) {
          updateActiveEntrySk(skFromUrl);
          setModalOpen(true);
          const singleArtworkResponse = await limiter.schedule(() => getSingleArtworkData(skFromUrl));
          if (singleArtworkResponse.success === true && singleArtworkResponse.data) {
            setPageLoadArtwork(singleArtworkResponse.data as UserArtworkSchema);
          }
        }
      }
    }

    // Set current user ID from local storage
    const userSk = localStorage.getItem("isAuthenticated");
    setCurrentUserSk(localStorage.getItem("isAuthenticated"));
  
    // If 'id' is in the search params, load that id (sk)
    handleIdUponPageLoad();
    fetchArtworkData();
    if (localStorage.getItem("isAuthenticated")) {
      fetchUserAuthAndVote(userSk);
    }
  }, [fetchArtworkData]);

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
      if (activeEntrySk) {
        currentParams.set("id", activeEntrySk);
      }
    }
  
    // Push the updated URL
    router.push(`${window.location.pathname}?${currentParams.toString()}`, { scroll: false });
  }, [filterableOptions, pageNumber, sortValue, isModalOpen, activeEntrySk]);
  useEffect(() => {
    updateURLFromState();
  }, [updateURLFromState]);

  const updatePageNumber = (currentPageNumber: number, newPageNumber: number) => {
    setPageNumber(newPageNumber);
    // console.log("Page number has been updated to " + pageNumber);
  };

  const updateActiveEntrySk = (sk: string) => {
    setActiveEntrySk(sk);
    // console.log("Active entry ID has been updated to " + id);
  };

  const openModal = useCallback((sk: string) => {
    // Only allow user to view artwork if the filter list is closed and the contest has begun.
    if (!isFilterOpen && contestState !== ContestState.Inactive) {
      updateActiveEntrySk(sk);
      setModalOpen(true);
    }
  }, []);
  
  const closeModal = () => {
    // If user has closed the modal, we no longer need pageLoadArtwork.
    setPageLoadArtwork(undefined);
    setModalOpen(false);
    setActiveEntrySk(null);
  };

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

  const updateSortValue = (sortValue: sortValueType) => {
    setSortValue(sortValue);
  };

  const updateFilterOption = (optionName: string, updates: Partial<{ number: number; active: boolean; }>) => {
    setFilterOption(optionName, updates);
  };

  const alterFiltersByCategory = (categoryId: string, activeStatus: boolean) => {
    bulkAlterCategoryOptions(categoryId, activeStatus);
  };

  const clearAllFilters = () => {
    resetAllFilters();
  };

  // Closes filter if background of grid is clicked by the user
  const handleGridClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (!target.classList.contains("background-area")) {
      if (isFilterOpen) {
        handleModifyFilterState(false);
      }
    }
  };
  // const pageData = filteredArts.slice(startIndex, endIndex);

  const handleModifyFilterState = (setValue: boolean) => {
    setIsFilterOpen(setValue);
  };

  useEffect(() => {
    const handleKeyDown = (ev: globalThis.KeyboardEvent) => {
      if (ev.key === "Escape") {
        handleModifyFilterState(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterUserArtworks = useCallback((artworks: GroupOfArtworks, filterableOptionsArg: typeof initialFilterableOptions) => {

    const extractActiveFilters = (filterableOptions: FilterableOption[]): ActiveFilters => {
      const activeSports: string[] = [];
      const activeLocations: string[] = [];
    
      filterableOptions.forEach(optionCategory => {
        if (optionCategory.categoryType === "sport") {
          optionCategory.options.forEach(option => {
            if (option.active) {
              activeSports.push(option.name);
            }
          });
        } else if (optionCategory.categoryType === "country") {
          optionCategory.options.forEach(option => {
            if (option.active) {
              activeLocations.push(option.name);
            }
          });
        }
      });
    
      return { sports: activeSports, locations: activeLocations };
    };
  
    const activeFilters = extractActiveFilters(filterableOptionsArg);
    const locations = activeFilters.locations;
    const sports = activeFilters.sports;
    
    if (!artworks) return [];
    
    return artworks.filter(artwork => {
      if (sports.length > 0 && locations.length > 0) {
        return sports.includes(artwork.sport) && locations.includes(artwork.location);
      } else if (sports.length > 0) {
        return sports.includes(artwork.sport);
      } else if (locations.length > 0) {
        return locations.includes(artwork.location);
      } else {
        return true;
      }
    });
  }, []);
  
  const sortedAndFilteredArtworks = useMemo(() => {
    const sorted = sortArtworks(allArtworks, sortValue);
    return filterUserArtworks(sorted, filterableOptions);
  }, [allArtworks, sortValue, filterableOptions, sortArtworks, filterUserArtworks]);

  useEffect(() => {
    const startIndex = (pageNumber - 1) * artworksPerPage;
    const endIndex = startIndex + artworksPerPage;
    const newActiveArtworksValue = sortedAndFilteredArtworks.slice(startIndex, endIndex);
    setActiveArtworks(newActiveArtworksValue);
  }, [sortedAndFilteredArtworks, pageNumber]);

  const openModalToArtwork = (artwork_sk: string) => {
    setModalOpen(true);
    setActiveEntrySk(artwork_sk);
  };

  return (
    <div className={`${contestState == ContestState.Inactive && "opacity-60 pointer-events-none select-none blur-sm relative"} `}>
      {votedSk ? 
        <div className="w-fit mx-auto">
          <button className={"mx-auto text-center bg-new-blue text-white px-4 py-2 rounded-lg cursor-pointer active:scale-[97%] mb-8 md:mb-0"} onClick={() => openModalToArtwork(votedSk)}>See your vote</button>
        </div> 
        : 
        <div className="w-fit mx-auto h-12">
        </div>
      }
      <ArtworkModal artworks={allArtworks} voted={activeEntrySk == votedSk} pageLoadArtwork={pageLoadArtwork} sk={activeEntrySk} closeModal={closeModal} isMobile={isMobile} isModalOpen={isModalOpen} currentUserSk={currentUserSk} />
      {isMobile && <MobileFilter isFilterOpen={isFilterOpen} handleModifyFilterState={handleModifyFilterState} updateFilterOption={updateFilterOption} updateSortValue={updateSortValue} alterFiltersByCategory={alterFiltersByCategory} resetAllFilters={resetAllFilters} /> }
      <div className="relative px-8 md:px-12 lg:px-16 xl:px-20 max-w-screen-2xl z-0 m-auto w-screen min-h-[800px]">
        {/* Flexbox 1 - Contains filter open/close button on left side, and Sort title/maybe options on right side */}
        <div className="relative z-[100] flex justify-between" >
          <button
            onClick={() => handleModifyFilterState(!isFilterOpen)}
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
            {isLoading &&
            <div className="absolute mx-auto left-0 right-0 ml-auto mr-auto ">

              <LoadingAnimation scale={100} stroke={2}/>
            </div>
            }
            {(!activeArtworks || activeArtworks.length == 0) && contestState != ContestState.Inactive && !isLoading ? 
              <div>
                <Image className="text-center mx-auto pt-10 " src={no_results_found} width={500} alt="No results found."/>
                <p className="font-bold text-xl mx-auto text-center py-10 font-montserrat">No Result Found</p>
                <p className="font-light text-xl mx-auto text-center">We can’t find any results matching your filter.</p>
              </div>
              : (
                <>
                  <Image src={blueBlobs} alt="" className="-z-10 absolute top-1/8 right-20 lg:right-40" />
                  {/* <Image src={multiBlueblobs} alt="" className="-z-10 absolute top-1/4 left-0" />       */}
                </>
              )} 
            {/* <Image src={blueBlobs} alt="" className="-z-10 absolute top-1/4 right-0" /> */}
            {/* <Image src={multiBlueblobs} alt="" className="-z-10 absolute top-1/4 left-0" /> */}
            <div className={`${isLoading && "opacity-60"} `}>
              {error && contestState == ContestState.Active &&  <div className="text-red-600 py-6 text-lg mx-auto text-center">We're having some difficulty fetching artworks. Try refreshing the page. </div>}
              <div className="grid grid-cols-2 gap-x-2 gap-y-6 xl:grid-cols-4 xl:gap-x-6 xl:gap-y-10">
                {Array.isArray(activeArtworks) && activeArtworks.length > 0 && (
                  activeArtworks
                    .map((artwork) => (
                      artwork.sk != null ? (
                        <ArtworkCard
                          data={artwork}
                          openModal={openModal}
                          key={artwork.sk}
                          voted={votedSk == artwork.sk}
                        />
                      ) : null
                    ))
                )}
              </div>
              <Pagination
                totalItems={sortedAndFilteredArtworks?.length || 0}
                currentPage={pageNumber}
                itemsPerPage={artworksPerPage}
                updatePageNumber={updatePageNumber}
              />
            </div>
          </section>
          {/* Filter */}
          <section className={`relative z-50 row-start-1 row-span-2 col-start-1  lg:col-span-5 lg:col-start-1 xl:col-span-4 xl:col-start-1 
          ${isFilterOpen ? "relative visible ease-in-out duration-500 pointer-events-auto " : "h-0 absolute col-span-0 invisible ease-in-out duration-500 pointer-events-none select-none "}
          `}>
            <div className="relative z-50 flex-wrap w-full">
              <section className="relative max-w-screen-2xl m-auto">
                {!isMobile && <Filter isFilterOpen={isFilterOpen} updateFilterOption={updateFilterOption} updateSortValue={updateSortValue} alterFiltersByCategory={alterFiltersByCategory} />}
              </section>
            </div>
          </section>
          {/* Active filters */}
          <TagList filterableOptions={filterableOptions} updateFilterOption={updateFilterOption} clearAllFilters={clearAllFilters} dropdownActive={isFilterOpen}/>
        </div>
      </div>
    </div>
  );
};