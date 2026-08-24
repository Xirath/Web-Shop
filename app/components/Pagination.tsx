import Link from "next/link";
import { createQueryString } from "@/lib/util";

interface PaginationProps {
  currentPage: number;
  pages: number;
  searchParams: Record<string, string | string[] | undefined>;

}


export default function Pagination({
  currentPage,
  pages,
  searchParams,
}: PaginationProps) {



  let visiblePages: (number | string)[];

  if (currentPage <= 3) {
    visiblePages = [1, 2, 3, 4, "...", pages];
  } else if (currentPage >= pages - 2) {
    visiblePages = [1, "...", pages - 3, pages - 2, pages - 1, pages];
  } else {
    visiblePages = [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      pages,
    ];
  }




  return (
    <div className="flex items-center justify-center gap-2">
      {currentPage > 1 && <Link 

      href={`?${createQueryString(searchParams, {
  page: currentPage + 1,
})}`}>
        
        ‹</Link>}

      {visiblePages.map((item, index) => {
        if (item === "...") {
          return (
            <span
              key={`dots-${index}`}
              className="flex h-8 w-8 items-center justify-center"
            >
              ...
            </span>
          );
        }

        const pageNumber = Number(item);

        return (
          <Link
            key={`page-${pageNumber}-${index}`}
            href={`?${createQueryString(searchParams, { page: pageNumber })}`}
            scroll={false}
            className={
              pageNumber === currentPage
                ? "flex h-8 w-8 items-center justify-center rounded border bg-gray-600 text-white"
                : "flex h-8 w-8 items-center justify-center rounded border border-gray-300 bg-white"
            }
          >
            {pageNumber}
          </Link>
        );
      })}

      {currentPage < pages && (
        <Link 
        href={`?${createQueryString(searchParams, {
  page: currentPage - 1,
})}`}>
          ›
        </Link>
      )}
    </div>
  );
}
