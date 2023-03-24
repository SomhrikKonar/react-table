import React from "react";
import { TData } from "../../../../interafaces/units";
import { useStore } from "../../../../store/store";
import { Row } from "./Components/Rows";
import styles from "../../styles.module.css";
import { IBodyProps } from "../../../../interafaces/blocks";
import { ActionTypes } from "../../../../store/actions";

const Body: React.FC<IBodyProps> = ({ tableContainerRef }) => {
  const [
    {
      columns,
      current,
      uniqueDataField,
      maxEntryIndex,
      minEntryIndex,
      usePagination,
      pageNumber,
      handleRowClick,
      stylesheet,
      fixedTableHeight,
      loading,
      RowComponent,
      numberOfRows,
    },
    dispatch,
  ] = useStore();

  const [containerHeight, setContainerHeight] = React.useState<number>(0);

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
      if (name === "SelectRow" || name === "PreventClick") return;
      let parsedIndex = parseInt(index);
      handleRowClick(current[parsedIndex]);
    },
    [handleRowClick, current]
  );

  React.useEffect(() => {
    if (!fixedTableHeight) return;

    let headRowHeight =
      parseInt(
        stylesheet["head-row-height"]?.substring(
          0,
          stylesheet["head-row-height"].length - 2
        ) || "0"
      ) + 1;

    if (tableContainerRef.current) {
      setContainerHeight(
        tableContainerRef.current.clientHeight - headRowHeight
      );
    }

    function setHeight() {
      if (tableContainerRef.current) {
        setContainerHeight(
          tableContainerRef.current.clientHeight - headRowHeight
        );
      }
    }

    window.addEventListener("resize", setHeight);

    return () => {
      window.removeEventListener("resize", setHeight);
    };
  }, [fixedTableHeight, stylesheet["head-row-height"]]);

  const totalNumberOfRows = React.useMemo(() => {
    const bodyRowHeight =
      stylesheet["body-row-height"]?.substring(
        0,
        stylesheet["body-row-height"].length - 2
      ) || "0";

    return Math.ceil(containerHeight / parseInt(bodyRowHeight));
  }, [stylesheet["body-row-height"], containerHeight]);

  const dummyRows = React.useMemo(() => {
    if (!tableContainerRef.current) {
      return [];
    }
    const overflowHidden =
      tableContainerRef.current.style.getPropertyValue("overflow-y") ===
      "hidden";

    if (!containerHeight || !fixedTableHeight) {
      if (overflowHidden) tableContainerRef.current.style.overflowY = "auto";
      return [];
    }

    const numberOfAvailableRows =
      current.length - (pageNumber - 1) * numberOfRows;

    if (current.length <= 0 || loading) {
      if (!overflowHidden) tableContainerRef.current.style.overflowY = "hidden";
      return [];
    } else if (numberOfAvailableRows < totalNumberOfRows) {
      if (!overflowHidden) tableContainerRef.current.style.overflowY = "hidden";
      return Array(totalNumberOfRows - numberOfAvailableRows).fill(null);
    }

    if (overflowHidden) tableContainerRef.current.style.overflowY = "auto";
    return [];
  }, [
    containerHeight,
    stylesheet["body-row-height"],
    stylesheet["head-row-height"],
    current,
    loading,
    fixedTableHeight,
    pageNumber,
    numberOfRows,
    totalNumberOfRows,
    numberOfRows,
    totalNumberOfRows,
  ]);

  return (
    <tbody
      className={handleRowClick ? styles.clickableRows + " clickableRows" : ""}
      onClick={handleClick}
    >
      {current.length > 0 && !loading ? (
        <>
          {current.map((row, index) =>
            ((index >= minEntryIndex &&
              index <= maxEntryIndex &&
              usePagination) ||
              !usePagination) &&
            React.isValidElement(RowComponent) ? (
              <React.Fragment key={handleKey(row, index)}>
                {React.cloneElement(RowComponent, { data: row, index: index })}
              </React.Fragment>
            ) : (
              <Row key={handleKey(row, index)} index={index} data={row} />
            )
          )}
          {dummyRows.map((_, index) => (
            <tr className={`${styles["emptyRows"]} emptyTableRows`} key={index}>
              {columns.map(({ name }) => (
                <td key={name}></td>
              ))}
            </tr>
          ))}
        </>
      ) : (
        <></>
      )}
    </tbody>
  );
};

export default React.memo(Body);
