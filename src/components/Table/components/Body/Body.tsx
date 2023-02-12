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
      loadingComponent,
      numberOfRows,
    },
    dispatch,
  ] = useStore();

  const [containerHeight, setContainerHeight] = React.useState<number>(0);

  React.useEffect(() => {
    if (tableContainerRef.current) {
      const table_head_row_height =
        tableContainerRef.current.children[0].children[0].clientHeight + "px";

      document.documentElement.style.setProperty(
        "head-row-height",
        table_head_row_height
      );

      const tr =
        tableContainerRef.current.children[0].children[1].querySelector("tr");
      const table_body_row_height = !!tr
        ? tr.clientHeight + "px"
        : stylesheet["body-row-height"] || "auto";

      document.documentElement.style.setProperty(
        "head-row-height",
        table_body_row_height
      );

      if (
        table_head_row_height !== stylesheet["head-row-height"] ||
        table_body_row_height !== stylesheet["body-row-height"]
      ) {
        let variables = { ...stylesheet };
        variables["head-row-height"] = table_head_row_height;
        variables["body-row-height"] = table_body_row_height;
        dispatch({
          type: ActionTypes.UPDATE_PROPS,
          payload: { stylesheet: variables },
        });
      }
    }
  }, []);

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
