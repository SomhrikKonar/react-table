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
  const [{ pageNumber, current, numberOfRows, minEntryIndex, maxEntryIndex }] =
    useStore();

  let minEntryNumber: number = minEntryIndex + 1;
  let maxEntryNumber: number = maxEntryIndex + 1;
  if (minEntryNumber > current.length) minEntryNumber = current.length;
  if (maxEntryNumber > current.length) maxEntryNumber = current.length;

  const maxPageNumber: number = Math.ceil(current.length / numberOfRows);
  const currentPageNumber = current.length > 0 ? pageNumber : 0;

  return (
    <div className={styles.container}>
      <p className={styles.description}>
        Showing {minEntryNumber} to {maxEntryNumber} of {current.length} entries
      </p>
      <div className={styles.btnsContainer}>
        <button
          className={styles.btn}
          onClick={goToFirstPage}
          disabled={pageNumber === 1}
        >
          {"<<"}
        </button>
        <button
          className={styles.btn}
          onClick={goToPreviousPage}
          disabled={pageNumber === 1}
        >
          {"<"}
        </button>
        <div className={styles.pagesInfo}>
          {currentPageNumber}/{maxPageNumber}
        </div>
        <button
          className={styles.btn}
          onClick={goToNextPage}
          disabled={pageNumber === maxPageNumber}
        >
          {">"}
        </button>
        <button
          className={styles.btn}
          onClick={goToLastPage}
          disabled={pageNumber === maxPageNumber}
        >
          {">>"}
        </button>
      </div>
    </div>
  );
};

export default React.memo(View);
