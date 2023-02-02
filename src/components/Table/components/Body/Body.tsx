import React from "react";
import { TData } from "../../../../interafaces/units";
import { useStore } from "../../../../store/store";
import { Row } from "./Components/Rows";
import styles from "../../styles.module.css";

const Body: React.FC = () => {
  const [
    {
      current,
      uniqueDataField,
      maxEntryIndex,
      minEntryIndex,
      usePagination,
      handleRowClick,
    },
  ] = useStore();

  const handleKey = React.useCallback(
    (row: TData, index: number) => {
      let key;
      if (uniqueDataField) {
        if (typeof uniqueDataField === "function") {
          key = uniqueDataField(row);
        } else {
          key = row[uniqueDataField];
        }
      } else {
        key = index;
      }
      if (key === undefined || key === null) key = index;
      return key;
    },
    [uniqueDataField]
  );

  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLTableSectionElement>) => {
      if (!handleRowClick) return;
      let currentTarget = e.target as HTMLElement;
      while (currentTarget.tagName !== "TD") {
        if (currentTarget.parentElement === null) return;
        currentTarget = currentTarget.parentElement;
      }
      let accessKey = currentTarget.accessKey;
      let [name, index] = accessKey.split(" ");
      if (!name || !index) return;
      if (name === "SelectRow") return;
      let parsedIndex = parseInt(index);
      handleRowClick(current[parsedIndex]);
    },
    [handleRowClick, current]
  );

  return (
    <tbody onClick={handleClick}>
      {current.length > 0 ? (
        current.map(
          (row, index) =>
            ((index >= minEntryIndex &&
              index <= maxEntryIndex &&
              usePagination) ||
              !usePagination) && (
              <Row key={handleKey(row, index)} index={index} data={row} />
            )
        )
      ) : (
        <tr className={styles.noRowContainer}>
          <div className={styles.noRowMessage}>No Rows Found</div>
        </tr>
      )}
    </tbody>
  );
};

export default React.memo(Body);
