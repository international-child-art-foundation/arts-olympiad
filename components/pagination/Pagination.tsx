import React from "react";
import { LeftIcon } from "../../public/svgs/gallery-svg/LeftIcon";
import { RightIcon } from "../../public/svgs/gallery-svg/RightIcon";
import "../../src/styles/arts.css";

export type PaginationProps = {
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  updatePageNumber: (currentPageNumber: number, newPageNumber: number) => void;
};

export const dotts = "...";

const Pagination = ({
  totalItems,
  currentPage,
  itemsPerPage,
  updatePageNumber,
}: PaginationProps) => {
  const hasNextPage = currentPage < Math.ceil(totalItems / itemsPerPage);
  const hasPreviousPage = currentPage > 1;

  return (
    <div className="flex items-center justify-center py-8 my-12 relative md:px-12 lg:px-16 xl:px-20 max-w-screen-2xl m-auto z-0">
      {hasPreviousPage && (
        <div
          className="absolute left-0 w-fit py-3 px-4 border border-neutral-black rounded text-center cursor-pointer lg:hidden"
          onClick={() => updatePageNumber(currentPage, currentPage > 1 ? currentPage - 1 : currentPage)}
        >
          <LeftIcon />
        </div>
      )}

      {hasNextPage && (
        <div
          className="absolute right-0 w-fit py-3 px-4 border border-neutral-black rounded text-center cursor-pointer lg:hidden"
          onClick={() => updatePageNumber(currentPage, currentPage + 1)}
        >
          <RightIcon />
        </div>
      )}

      {hasPreviousPage && (
        <div
          className="absolute left-0 w-fit py-3 px-4 border border-neutral-black rounded text-center text-sm cursor-pointer tracking-wide text-neutral-black hidden lg:block"
          onClick={() => updatePageNumber(currentPage, currentPage > 1 ? currentPage - 1 : currentPage)}
        >
          Previous <LeftIcon />
        </div>
      )}

      {hasNextPage && (
        <div
          className="absolute right-0 w-fit py-3 px-4 border border-neutral-black rounded text-center text-sm cursor-pointer tracking-wide text-neutral-black hidden lg:block"
          onClick={() => updatePageNumber(currentPage, currentPage + 1)}
        >
          Next <RightIcon />
        </div>
      )}
    </div>
  );
};

export default Pagination;
