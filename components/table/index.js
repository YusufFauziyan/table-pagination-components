import { useMemo, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { RiArrowDropRightLine, RiArrowDropLeftLine } from "react-icons/ri";

const Table = ({
  data,
  column,
  highlightOnHover,
  rowOnclicked,
  loading,
  PageSize = 10,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const currenData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, data]);

  return (
    <div className="p-6 rounded shadow">
      <table className={`table-auto w-full  font-poppins`}>
        <thead className="border-b border-white/50">
          <tr className={``}>
            {column.map((item, index) => {
              return (
                <th
                  key={index}
                  className={`py-1 opacity-95 ${
                    item.center ? "" : "text-left"
                  }`}
                  style={{
                    width: item.width,
                  }}
                >
                  {item.name}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {currenData?.map((item, i) => (
            <tr
              className={`border-b border-white/50 text-sm opacity-95 ${
                highlightOnHover && !loading
                  ? " hover:bg-sky-700/20 cursor-pointer ease-in-out duration-300"
                  : ""
              }`}
              key={i}
              onClick={() => rowOnclicked(item, i)}
            >
              {column.map((row, index) => (
                <td key={index} className={`py-1.5 ${row.width}}`}>
                  {loading ? (
                    <div className="w-[65%]">
                      <SkeletonTheme baseColor="#202020" highlightColor="#444">
                        <Skeleton duration={1} />
                      </SkeletonTheme>
                    </div>
                  ) : (
                    <div>
                      {row.renderValue
                        ? row.renderValue(item, i)
                        : item[row.id]}
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={data.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

// fucntion pagination
const DOTS = "...";

const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);
    const totalPageNumbers = siblingCount + 5;
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};

const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <div className="flex gap-2 items-center justify-end mt-4">
      <button
        className={` ${currentPage === 1 ? "" : "cursor-pointer"}`}
        disabled={currentPage === 1 ? true : false}
        onClick={onPrevious}
      >
        <RiArrowDropLeftLine className="w-6 h-6" />{" "}
      </button>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <div className="pagination-item dots" key={index}>
              &#8230;
            </div>
          );
        }
        return (
          <div
            className={` cursor-pointer hover:bg-white hover:text-black ease-in-out duration-300 px-1 rounded ${
              pageNumber === currentPage
                ? "bg-white px-2 rounded text-black"
                : ""
            }`}
            onClick={() => onPageChange(pageNumber)}
            key={index}
          >
            {pageNumber}
          </div>
        );
      })}
      <button
        className={` ${currentPage === lastPage ? "" : "cursor-pointer"}`}
        disabled={currentPage === lastPage ? true : false}
        onClick={onNext}
      >
        <RiArrowDropRightLine className="w-6 h-6" />{" "}
      </button>
    </div>
  );
};

export default Table;
