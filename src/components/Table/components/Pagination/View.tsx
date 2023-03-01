import React from "react";
import { IPagination } from "../../../../interafaces/blocks";
import { useStore } from "../../../../store/store";
import styles from "./styles.module.css";
const View: React.FC<IPagination> = ({
  goToFirstPage,
  goToLastPage,
  goToNextPage,
  goToPreviousPage,
}) => {
  const [
    {
      pageNumber,
      current,
      numberOfRows,
      minEntryIndex,
      maxEntryIndex,
      loading,
    },
  ] = useStore();

  let minEntryNumber: number = minEntryIndex + 1;
  let maxEntryNumber: number = maxEntryIndex + 1;

  minEntryNumber =
    loading || current.length <= 0
      ? 0
      : minEntryNumber > current.length
      ? current.length
      : minEntryNumber;

  maxEntryNumber =
    loading || current.length <= 0
      ? 0
      : maxEntryNumber > current.length
      ? current.length
      : maxEntryNumber;

  const maxPageNumber: number =
    loading || current.length <= 0
      ? 0
      : Math.ceil(current.length / numberOfRows);

  const currentPageNumber =
    loading || current.length <= 0 ? 0 : current.length > 0 ? pageNumber : 0;

  const totalEntries = loading || current.length <= 0 ? 0 : current.length;

  return (
    <div className={`${styles.container} tablePaginationContainer`}>
      <p className={`${styles.description} tablePaginationDescription`}>
        Showing {minEntryNumber} to {maxEntryNumber} of {totalEntries} entries
      </p>
      <div className={styles.btnsContainer}>
        <button
          className={`${styles.btn} tablePaginationButtons`}
          onClick={goToFirstPage}
          disabled={pageNumber === 1 || loading || current.length <= 0}
        >
          {"<<"}
        </button>
        <button
          className={`${styles.btn} tablePaginationButtons`}
          onClick={goToPreviousPage}
          disabled={pageNumber === 1 || loading || current.length <= 0}
        >
          {"<"}
        </button>
        <div className={styles.pagesInfo}>
          {currentPageNumber}/{maxPageNumber}
        </div>
        <button
          className={`${styles.btn} tablePaginationButtons`}
          onClick={goToNextPage}
          disabled={
            pageNumber === maxPageNumber || loading || current.length <= 0
          }
        >
          {">"}
        </button>
        <button
          className={`${styles.btn} tablePaginationButtons`}
          onClick={goToLastPage}
          disabled={
            pageNumber === maxPageNumber || loading || current.length <= 0
          }
        >
          {">>"}
        </button>
      </div>
    </div>
  );
};

export default React.memo(View);
