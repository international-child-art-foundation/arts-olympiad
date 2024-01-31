import Link from "next/link";
import React from "react";
import usePagination from "./usePagination";
import { LeftIcon } from "../../public/svgs/gallery-svg/LeftIcon";
import { RightIcon } from "../../public/svgs/gallery-svg/RightIcon";
import "../../src/styles/arts.css";

export type PaginationProps = {
  totalItems: number
  currentPage: number
  renderPageLink: (page: number) => string
  itemsPerPage: number
}

export const dotts = "...";

const Pagination = ({
  totalItems,
  currentPage,
  itemsPerPage,
  renderPageLink,
}: PaginationProps) => {
  const pages = usePagination(totalItems, currentPage, itemsPerPage);

  return (
    <div className="flex items-center justify-center py-8 my-12 relative md:px-12 lg:px-16 xl:px-20 max-w-screen-2xl m-auto z-0">
      <a 
        href={currentPage > 1 ? 
          (renderPageLink((currentPage - 1) as number)) : ("#")} 
        className="absolute left-0 w-fit py-3 px-4 border border-neutral-black rounded text-center cursor-pointer lg:hidden">
        <LeftIcon />
      </a>
      <a 
        href={currentPage > 1 ? 
          (renderPageLink((currentPage - 1) as number)) : ("#")} 
        className="absolute left-0 w-fit py-3 px-4 border border-neutral-black rounded text-center text-sm cursor-pointer tracking-wide text-neutral-black hidden lg:block">
        <LeftIcon /> Previous
      </a>
      {pages.map((pageNumber, i) =>
        pageNumber === dotts ? (
          <span
            key={i}
            className="px-4 py-2 text-xl font-light text-black"
          >
            {pageNumber}
          </span>
        ) : (
          <Link
            key={i}
            href={renderPageLink(pageNumber as number)}
            className={`${
              pageNumber === currentPage ? "font-semibold selected_page" : "font-light"
            } px-5 py-3 text-xl`}
          >
            {pageNumber}
          </Link>
        )
      )}
      <a 
        href={currentPage < Math.ceil(totalItems / itemsPerPage) ?
          (renderPageLink((currentPage + 1) as number)) : ("#")}
        className="absolute right-0 w-fit py-3 px-4 border border-neutral-black rounded text-center cursor-pointer lg:hidden">
        <RightIcon />
      </a>
      {/* <Image src={arrow} alt="arrow pointing downwards." className="" /> */}
      <a 
        href={currentPage < Math.ceil(totalItems / itemsPerPage) ?
          (renderPageLink((currentPage + 1) as number)) : ("#")}
        className="absolute right-0 w-fit py-3 px-4 border border-neutral-black rounded text-center text-sm cursor-pointer tracking-wide text-neutral-black hidden lg:block">
          Next <RightIcon />
      </a>
      
    </div>
  );
};

export default Pagination;