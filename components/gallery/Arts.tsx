"use client";
import { useSearchParams, useRouter } from "next/navigation";
import React, {
  useEffect,
  useCallback,
  useState,
  useRef,
  useMemo,
} from "react";
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
import {
  UserArtworkSchema,
  GroupOfArtworks,
} from "@/interfaces/artwork_shapes";
import no_results_found from "../../public/svgs/no_results_found_bg.svg";
import LoadingAnimation from "../svgs/LoadingAnimation";
import { getUserVoteData } from "@/utils/api-user";
import { useGlobalContext } from "@/app/GlobalContext";
import { limiter } from "@/utils/api-rate-limit";

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

const ARTWORKS_PER_PAGE = 20;
const FILTER_DEBOUNCE_MS = 300;

function sortValueToApiParams(sortValue: sortValueType): {
  sort_by: "votes" | "timestamp";
  order_by: "ascending" | "descending";
} {
  if (sortValue === "Most Popular")
    return { sort_by: "votes", order_by: "descending" };
  if (sortValue === "Newest")
    return { sort_by: "timestamp", order_by: "descending" };
  if (sortValue === "Oldest")
    return { sort_by: "timestamp", order_by: "ascending" };
  return { sort_by: "votes", order_by: "descending" };
}

function extractActiveFilters(filterableOptions: FilterableOption[]) {
  const sports: string[] = [];
  const countries: string[] = [];
  for (const category of filterableOptions) {
    for (const opt of category.options) {
      if (!opt.active) continue;
      if (category.categoryType === "sport") sports.push(opt.name);
      else if (category.categoryType === "country") countries.push(opt.name);
    }
  }
  return { sports, countries };
}

export const Arts: React.FC<ArtsProps> = ({ contestState }) => {
  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const {
    filterableOptions,
    setFilterableOptions,
    setFilterOption,
    bulkAlterCategoryOptions,
    resetAllFilters,
    pageNumber,
    setPageNumber,
    sortValue,
    setSortValue,
    activeEntrySk,
    setActiveEntrySk,
    votedSk,
    setVotedSk,
  } = useFilters();
  const { handleRealizeSignedOut, isAuthenticated } = useGlobalContext();
  const votingClosed = contestState === ContestState.Complete;
  const [pageLoadArtwork, setPageLoadArtwork] = useState<
    UserArtworkSchema | undefined
  >(undefined);
  const [currentUserSk, setCurrentUserSk] = useState<string | null>(null);

  const { windowWidth } = useWindowDimensions();
  const isMobile = windowWidth < 1024;
  const searchParams = useSearchParams();

  const [activeArtworks, setActiveArtworks] = useState<GroupOfArtworks>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const applyCategoryCountsFromServer = useCallback(
    (counts: {
      sports: Record<string, number>;
      countries: Record<string, number>;
    }) => {
      const updated = filterableOptions.map((category) => {
        const bucket =
          category.categoryType === "sport"
            ? counts.sports
            : category.categoryType === "country"
              ? counts.countries
              : null;
        if (!bucket) return category;
        return {
          ...category,
          options: category.options.map((opt) => ({
            ...opt,
            number: bucket[opt.name] ?? 0,
          })),
        };
      });
      setFilterableOptions(updated);
    },
    [setFilterableOptions],
  );

  const apiParams = useMemo(() => {
    const { sports, countries } = extractActiveFilters(filterableOptions);
    const { sort_by, order_by } = sortValueToApiParams(sortValue);
    const cursor = (pageNumber - 1) * ARTWORKS_PER_PAGE;
    return {
      sort_by,
      order_by,
      sports,
      countries,
      limit: ARTWORKS_PER_PAGE,
      cursor,
    };
  }, [filterableOptions, sortValue, pageNumber]);

  const latestRequestId = useRef(0);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      const myRequestId = ++latestRequestId.current;
      setIsLoading(true);
      setError(null);
      try {
        const response = await limiter.schedule(() => getArtworks(apiParams));
        if (myRequestId !== latestRequestId.current) return;

        if (response.success) {
          setActiveArtworks(response.data.items);
          setTotalCount(response.data.totalCount);
          applyCategoryCountsFromServer(response.data.categoryCounts);

          if (
            response.data.items.length === 0 &&
            pageNumber > 1 &&
            response.data.totalCount > 0
          ) {
            const lastPage = Math.max(
              1,
              Math.ceil(response.data.totalCount / ARTWORKS_PER_PAGE),
            );
            setPageNumber(Math.min(pageNumber, lastPage));
          }
        } else {
          setError("Failed to fetch artwork");
        }
      } catch (err) {
        if (myRequestId !== latestRequestId.current) return;
        setError(typeof err === "string" ? err : "Failed to fetch artwork");
      } finally {
        if (myRequestId === latestRequestId.current) setIsLoading(false);
      }
    }, FILTER_DEBOUNCE_MS);

    return () => clearTimeout(timeoutId);
  }, [
    apiParams.sort_by,
    apiParams.order_by,
    apiParams.cursor,
    apiParams.limit,
    apiParams.sports.join(","),
    apiParams.countries.join(","),
  ]);

  const fetchUserAuthAndVote = useCallback(
    async (userSk: string | null) => {
      if (isAuthenticated || userSk) {
        const userVotedResponse = await limiter.schedule(() =>
          getUserVoteData(),
        );
        if (userVotedResponse.success) {
          if (userVotedResponse.voted_sk)
            setVotedSk(userVotedResponse.voted_sk);
        } else {
          handleRealizeSignedOut();
        }
      }
    },
    [setVotedSk, handleRealizeSignedOut, isAuthenticated],
  );

  useEffect(() => {
    async function handleIdUponPageLoad() {
      if (searchParams) {
        const skFromUrl = searchParams.get("id");
        if (skFromUrl) {
          setActiveEntrySk(skFromUrl);
          setModalOpen(true);
          const singleArtworkResponse = await limiter.schedule(() =>
            getSingleArtworkData(skFromUrl),
          );
          if (
            singleArtworkResponse.success === true &&
            singleArtworkResponse.data
          ) {
            setPageLoadArtwork(singleArtworkResponse.data as UserArtworkSchema);
          }
        }
      }
    }
    const userSk = localStorage.getItem("isAuthenticated");
    setCurrentUserSk(userSk);
    handleIdUponPageLoad();
    if (userSk) fetchUserAuthAndVote(userSk);
  }, []);

  // URL sync — reflect current filter/sort/page/modal state in the URL.
  const updateURLFromState = useCallback(() => {
    const currentParams = new URLSearchParams();
    filterableOptions.forEach((category) => {
      const activeOptions = category.options
        .filter((o) => o.active)
        .map((o) => o.name);
      if (activeOptions.length > 0)
        currentParams.set(category.id, activeOptions.join(","));
    });
    if (pageNumber > 1) currentParams.set("page", pageNumber.toString());
    if (sortValue && sortValue !== "Newest")
      currentParams.set("sort", sortValue);
    if (isModalOpen && activeEntrySk) currentParams.set("id", activeEntrySk);
    router.push(`${window.location.pathname}?${currentParams.toString()}`, {
      scroll: false,
    });
  }, [
    filterableOptions,
    pageNumber,
    sortValue,
    isModalOpen,
    activeEntrySk,
    router,
  ]);

  useEffect(() => {
    updateURLFromState();
  }, [updateURLFromState]);

  const prevFilterSortSig = useRef<string>("");
  useEffect(() => {
    const sig = JSON.stringify({
      sports: apiParams.sports,
      countries: apiParams.countries,
      sort_by: apiParams.sort_by,
      order_by: apiParams.order_by,
    });
    if (
      prevFilterSortSig.current &&
      prevFilterSortSig.current !== sig &&
      pageNumber !== 1
    ) {
      setPageNumber(1);
    }
    prevFilterSortSig.current = sig;
  }, [
    apiParams.sports,
    apiParams.countries,
    apiParams.sort_by,
    apiParams.order_by,
  ]);

  const updatePageNumber = (
    _currentPageNumber: number,
    newPageNumber: number,
  ) => {
    setPageNumber(newPageNumber);
  };

  const openModal = useCallback(
    (sk: string) => {
      if (!isFilterOpen && contestState !== ContestState.Inactive) {
        setActiveEntrySk(sk);
        setModalOpen(true);
      }
    },
    [isFilterOpen, contestState],
  );

  const closeModal = () => {
    setPageLoadArtwork(undefined);
    setModalOpen(false);
    setActiveEntrySk(null);
  };

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  const updateSortValue = (newSort: sortValueType) => setSortValue(newSort);
  const updateFilterOption = (
    optionName: string,
    updates: Partial<{ number: number; active: boolean }>,
  ) => setFilterOption(optionName, updates);
  const alterFiltersByCategory = (categoryId: string, activeStatus: boolean) =>
    bulkAlterCategoryOptions(categoryId, activeStatus);
  const clearAllFilters = () => resetAllFilters();

  const handleGridClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (!target.classList.contains("background-area") && isFilterOpen) {
      setIsFilterOpen(false);
    }
  };

  const handleModifyFilterState = (setValue: boolean) =>
    setIsFilterOpen(setValue);

  useEffect(() => {
    const handleKeyDown = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") setIsFilterOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const openModalToArtwork = (artwork_sk: string) => {
    setModalOpen(true);
    setActiveEntrySk(artwork_sk);
  };

  return (
    <div
      className={`${contestState == ContestState.Inactive && "h-36 w-0 opacity-0 pointer-events-none select-none blur-sm relative"} `}
    >
      {votedSk ? (
        <div className="w-fit mx-auto">
          <button
            className="mx-auto text-center bg-new-blue text-white px-4 py-2 rounded-lg cursor-pointer active:scale-[97%] mb-8 md:mb-0"
            onClick={() => openModalToArtwork(votedSk)}
          >
            See your vote
          </button>
        </div>
      ) : (
        <div className="w-fit mx-auto h-12"></div>
      )}
      <ArtworkModal
        voted={activeEntrySk == votedSk}
        votingClosed={votingClosed}
        pageLoadArtwork={pageLoadArtwork}
        sk={activeEntrySk}
        closeModal={closeModal}
        isMobile={isMobile}
        isModalOpen={isModalOpen}
        currentUserSk={currentUserSk}
      />
      {isMobile && (
        <MobileFilter
          isFilterOpen={isFilterOpen}
          handleModifyFilterState={handleModifyFilterState}
          updateFilterOption={updateFilterOption}
          updateSortValue={updateSortValue}
          alterFiltersByCategory={alterFiltersByCategory}
          resetAllFilters={resetAllFilters}
        />
      )}
      <div className="relative px-8 md:px-12 lg:px-16 xl:px-20 max-w-screen-2xl z-0 m-auto w-screen min-h-[800px]">
        <div className="relative z-[100] flex justify-between">
          <button
            onClick={() => handleModifyFilterState(!isFilterOpen)}
            className="w-[200px] max-w-[40%] h-[50px] text-base font-medium px-5 py-2 border border-gray-600 rounded-md text-neutral-black text-center items-center inline-flex justify-between"
          >
            {isFilterOpen ? "Hide Filter" : "Filter"}
            <span className="ml-6">
              <MenuIcon />
            </span>
          </button>
          {!isMobile && (
            <div className="bg-[#f9faf6] rounded-lg w-[200px] max-w-[40%] absolute right-0">
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
          )}
        </div>
        <div
          className="grid relative z-[60] mt-4"
          style={{
            gridTemplateRows: "auto 1fr",
            gridTemplateColumns: "repeat(20, 1fr)",
          }}
        >
          <section
            className={`transition-all duration-300 ease-in-out background-area pointer-events-auto ${isFilterOpen ? "blur-lg pointer-events-none select-none opacity-40" : ""} justify-center relative row-start-2`}
            onClick={handleGridClick}
            style={{ gridColumn: "1 / 21" }}
          >
            <hr className="my-10 border-new-black border-t-0.5 w-full" />
            {isLoading && (
              <div className="absolute mx-auto left-0 right-0 ml-auto mr-auto">
                <LoadingAnimation scale={100} stroke={2} />
              </div>
            )}
            {(!activeArtworks || activeArtworks.length === 0) &&
            contestState != ContestState.Inactive &&
            !isLoading ? (
              <div>
                <Image
                  className="text-center mx-auto pt-10"
                  src={no_results_found}
                  width={500}
                  alt="No results found."
                />
                <p className="font-bold text-xl mx-auto text-center py-10 font-montserrat">
                  No Result Found
                </p>
                <p className="font-light text-xl mx-auto text-center">
                  We can't find any results matching your filter.
                </p>
              </div>
            ) : (
              <>
                <Image
                  src={blueBlobs}
                  alt=""
                  className="-z-10 absolute top-1/8 right-20 lg:right-40"
                />
              </>
            )}
            <div className={`${isLoading && "opacity-60"}`}>
              {error && contestState == ContestState.Active && (
                <div className="text-red-600 py-6 text-lg mx-auto text-center">
                  We're having some difficulty fetching artworks. Try refreshing
                  the page.
                </div>
              )}
              <div className="grid grid-cols-2 gap-x-2 gap-y-6 xl:grid-cols-4 xl:gap-x-6 xl:gap-y-10">
                {Array.isArray(activeArtworks) &&
                  activeArtworks.length > 0 &&
                  activeArtworks.map((artwork) =>
                    artwork.sk != null ? (
                      <ArtworkCard
                        data={artwork}
                        openModal={openModal}
                        key={artwork.sk}
                        voted={votedSk == artwork.sk}
                        votingClosed={votingClosed}
                      />
                    ) : null,
                  )}
              </div>
              <Pagination
                totalItems={totalCount}
                currentPage={pageNumber}
                itemsPerPage={ARTWORKS_PER_PAGE}
                updatePageNumber={updatePageNumber}
              />
            </div>
          </section>
          <section
            className={`relative z-50 row-start-1 row-span-2 col-start-1 lg:col-span-5 lg:col-start-1 xl:col-span-4 xl:col-start-1
            ${isFilterOpen ? "relative visible ease-in-out duration-500 pointer-events-auto" : "h-0 absolute col-span-0 invisible ease-in-out duration-500 pointer-events-none select-none"}
          `}
          >
            <div className="relative z-50 flex-wrap w-full">
              <section className="relative max-w-screen-2xl m-auto">
                {!isMobile && (
                  <Filter
                    isFilterOpen={isFilterOpen}
                    updateFilterOption={updateFilterOption}
                    updateSortValue={updateSortValue}
                    alterFiltersByCategory={alterFiltersByCategory}
                  />
                )}
              </section>
            </div>
          </section>
          <TagList
            filterableOptions={filterableOptions}
            updateFilterOption={updateFilterOption}
            clearAllFilters={clearAllFilters}
            dropdownActive={isFilterOpen}
          />
        </div>
      </div>
    </div>
  );
};
