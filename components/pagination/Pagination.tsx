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

export const dots = "...";

const Pagination = ({
  totalItems,
  currentPage,
  itemsPerPage,
  updatePageNumber,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  const getPageNumbers = () => {
    const pageNumbers = [];
    const showEllipsis = totalPages > 7;

    if (showEllipsis) {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push(dots);
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pageNumbers.push(1);
        pageNumbers.push(dots);
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push(dots);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push(dots);
        pageNumbers.push(totalPages);
      }
    } else {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-center py-8 my-12 relative md:px-12 lg:px-16 xl:px-20 max-w-screen-2xl m-auto z-0">
      {hasPreviousPage && (
        <button
          className="absolute left-0 w-fit py-3 px-4 border border-neutral-black rounded text-center cursor-pointer"
          onClick={() => updatePageNumber(currentPage, currentPage - 1)}
        >
          <LeftIcon/>
          <span className="hidden lg:inline">Previous</span>
        </button>
      )}

      <div className="hidden sm:flex space-x-2">
        {totalItems > itemsPerPage && getPageNumbers().map((pageNumber, index) => (
          <button
            key={index}
            className={`w-10 py-3 px-4 border border-neutral-black rounded  font-xl h-10 flex items-center justify-center rounded ${pageNumber === dots ? "cursor-default" : "cursor-pointer"}`}
            onClick={() => {
              if (pageNumber !== dots) {
                updatePageNumber(currentPage, pageNumber as number);
              }
            }}
            disabled={pageNumber === dots}
          >
            {pageNumber}
          </button>
        ))}
      </div>

      {hasNextPage && (
        <button
          className="absolute right-0 w-fit py-3 px-4 border border-neutral-black rounded text-center cursor-pointer"
          onClick={() => updatePageNumber(currentPage, currentPage + 1)}
        >
          <span className="hidden lg:inline">Next</span>
          <RightIcon />
        </button>
      )}
    </div>
  );
};

export default Pagination;