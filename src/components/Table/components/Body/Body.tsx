import React from "react";
import { TData } from "../../../../interafaces/units";
import { useStore } from "../../../../store/store";
import { Row } from "./Components/Rows";
import styles from "../../styles.module.css";
import { IBodyProps } from "../../../../interafaces/blocks";

const Body: React.FC<IBodyProps> = ({ tableContainerRef }) => {
  const [
    {
      columns,
      current,
      uniqueDataField,
      maxEntryIndex,
      minEntryIndex,
      usePagination,
      handleRowClick,
      stylesheet,
      fixedTableHeight,
      loading,
      loadingComponent,
    },
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

    const headRowHeight = parseInt(
      stylesheet["head-row-height"]?.substring(
        0,
        stylesheet["head-row-height"].length - 2
      ) || "0"
    );

    if (tableContainerRef.current && !containerHeight) {
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

  const dummyRows = React.useMemo(() => {
    if (!tableContainerRef.current) {
      return [];
    }
    const overflowHidden =
      tableContainerRef.current.style.getPropertyValue("overflow") === "hidden";

    if (!containerHeight || !fixedTableHeight) {
      if (overflowHidden) tableContainerRef.current.style.overflow = "auto";
      return [];
    }

    const bodyRowHeight =
      stylesheet["body-row-height"]?.substring(
        0,
        stylesheet["body-row-height"].length - 2
      ) || "0";

    const numberOfRows = Math.ceil(containerHeight / parseInt(bodyRowHeight));

    if (current.length < numberOfRows) {
      if (!overflowHidden) tableContainerRef.current.style.overflow = "hidden";
      return Array(numberOfRows - current.length).fill(null);
    }

    if (overflowHidden) tableContainerRef.current.style.overflow = "auto";
    return [];
  }, [
    containerHeight,
    stylesheet["body-row-height"],
    stylesheet["head-row-height"],
    current,
    fixedTableHeight,
  ]);

  const noRowAlertContainerHeight = React.useMemo(() => {
    if (!fixedTableHeight) return "50px";
    return (containerHeight || 50) + "px";
  }, [containerHeight, fixedTableHeight]);

  return (
    <tbody
      className={handleRowClick ? styles.clickableRows : ""}
      onClick={handleClick}
    >
      {current.length > 0 && !loading ? (
        <>
          {current.map(
            (row, index) =>
              ((index >= minEntryIndex &&
                index <= maxEntryIndex &&
                usePagination) ||
                !usePagination) && (
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
      ) : loading ? (
        <tr
          className={`${styles.emptyBody} emptyTableBody`}
          style={{
            height: noRowAlertContainerHeight,
          }}
        >
          {loadingComponent ? (
            <td style={{ visibility: "hidden", padding: 0 }}>
              <div>{loadingComponent}</div>
            </td>
          ) : (
            ""
          )}
          <td className={`${styles.emptyBodyMessage} emptyTableBodyMessage`}>
            {loadingComponent || "Loading ..."}
          </td>
        </tr>
      ) : (
        <tr
          className={`${styles.emptyBody} emptyTableBody`}
          style={{
            height: noRowAlertContainerHeight,
          }}
        >
          <td className={`${styles.emptyBodyMessage} emptyTableBodyMessage`}>
            No Rows Found
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default React.memo(Body);
