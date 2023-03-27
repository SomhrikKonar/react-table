import React, { useEffect } from "react";
import { ITableView } from "../../interafaces/blocks";
import { ActionTypes } from "../../store/actions";
import { useStore } from "../../store/store";
import { Body } from "./components/Body";
import Checkbox from "./components/Checkbox";
import { Head } from "./components/Head";
import Header from "./components/Header";
import Pagination from "./components/Pagination";
import styles from "./styles.module.css";
import EmptyBody from "./components/EmptyBody";
import { TStyleVariables } from "../../interafaces/units";
const View: React.FC<ITableView> = ({
  numberOfRows,
  usePagination,
  uniqueDataField,
  searchPlaceholder,
  canSelectRows,
  handleRowSelection,
  styleVariables,
  fixedTableHeight,
  loading,
  data,
}) => {
  const [{ pageNumber, mounted, stylesheet, current, columns }, dispatch] =
    useStore();
  const tableRef = React.useRef<HTMLDivElement | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!mounted) return;
    dispatch({ type: ActionTypes.SET_NO_OF_ROWS, payload: numberOfRows });
    dispatch({ type: ActionTypes.SET_PAGE_NO, payload: 1 });
  }, [numberOfRows]);

  const updateStyleSheets = React.useCallback(() => {
    if (tableRef.current) {
      let newStyleVariables: TStyleVariables = {};
      const tableChildrens = tableRef.current.children[0].children;
      const tHead = tableChildrens[0];
      if (
        !styleVariables?.["head-row-height"] &&
        stylesheet["head-row-height"] !== tHead.clientHeight + "px"
      ) {
        newStyleVariables["head-row-height"] = tHead.clientHeight + "px";
        containerRef.current?.style.setProperty(
          "--head-row-height",
          newStyleVariables["head-row-height"]
        );
      }

      const tBody_rows = tableChildrens[1].children;
      if (
        !loading &&
        !styleVariables?.["body-row-height"] &&
        tBody_rows.length > 0
      ) {
        const tr = tBody_rows[0];
        const style = window.getComputedStyle(tr);

        if (stylesheet["body-row-height"] !== style.height) {
          newStyleVariables["body-row-height"] = style.height;
          containerRef.current?.style.setProperty(
            "--body-row-height",
            newStyleVariables["body-row-height"]
          );
        }
      }
      if (
        newStyleVariables["head-row-height"] ||
        newStyleVariables["body-row-height"]
      ) {
        dispatch({
          type: ActionTypes.SET_STYLESHEET,
          payload: newStyleVariables,
        });
      }
    }
  }, [stylesheet, loading, styleVariables]);

  React.useEffect(() => {
    Object.entries(stylesheet).map(([k, v]) => {
      containerRef.current?.style.setProperty(`--${k}`, v);
    });
  }, []);

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (!loading) timeout = setTimeout(updateStyleSheets, 25);
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [loading]);

  React.useEffect(() => {
    let newStyleVariables: TStyleVariables = {};
    if (styleVariables) {
      let validObject = Object.keys(styleVariables).length > 0;
      if (validObject) {
        newStyleVariables = { ...styleVariables };
        Object.entries(newStyleVariables).map(([k, v]) => {
          containerRef.current?.style.setProperty(`--${k}`, v);
        });
        dispatch({
          type: ActionTypes.SET_STYLESHEET,
          payload: newStyleVariables,
        });
      }
    }
  }, [styleVariables]);

  React.useEffect(() => {
    if (!mounted) return;
    dispatch({
      type: ActionTypes.UPDATE_PROPS,
      payload: {
        uniqueDataField,
        usePagination,
        searchPlaceholder: searchPlaceholder || "Search here ...",
        fixedTableHeight,
        loading,
      },
    });
  }, [
    uniqueDataField,
    usePagination,
    searchPlaceholder,
    fixedTableHeight,
    loading,
  ]);

  React.useEffect(() => {
    if (!mounted) return;
    dispatch({
      type: ActionTypes.UPDATE_PROPS,
      payload: {
        original: data,
      },
    });
  }, [data]);

  React.useEffect(() => {
    dispatch({ type: ActionTypes.UPDATE_PROPS, payload: { mounted: true } });
  }, []);

  React.useEffect(() => {
    if (!columns || columns.length <= 0) return;
    let newColumns = [...columns];
    if (
      (!handleRowSelection || !canSelectRows) &&
      newColumns[0].name === "SelectRow"
    ) {
      newColumns.shift();
      dispatch({
        type: ActionTypes.UPDATE_PROPS,
        payload: { columns: newColumns },
      });
    } else if (
      canSelectRows &&
      handleRowSelection &&
      newColumns[0].name !== "SelectRow"
    ) {
      newColumns.unshift({
        name: "SelectRow",
        cell: (_, index: number) => (
          <Checkbox
            index={index}
            header={false}
            handleRowSelection={handleRowSelection}
          />
        ),
        headerCell: () => (
          <Checkbox header={true} handleRowSelection={handleRowSelection} />
        ),
      });
      dispatch({
        type: ActionTypes.UPDATE_PROPS,
        payload: { columns: newColumns },
      });
    }
  }, [canSelectRows, columns]);

  React.useEffect(() => {
    if (!mounted) return;
    if (tableRef.current) {
      tableRef.current.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [pageNumber]);

  React.useEffect(() => {
    if (!mounted) return;
    if (tableRef.current) {
      tableRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [current]);

  const MemoisedContent = React.useMemo(
    () => (
      <div
        ref={containerRef}
        className={`${styles.container} tableParentContainer`}
      >
        {
          <>
            <Header />
            <div
              className={`${styles["tableContainer"]} ${
                fixedTableHeight
                  ? styles["fixedTableContainer"] + " fixedTableContainer"
                  : ""
              } tableContainer`}
              ref={tableRef}
            >
              <table className={`${styles.table}  table`}>
                <Head />
                <Body tableContainerRef={tableRef} />
              </table>
              <EmptyBody tableRef={tableRef} />
            </div>
            {usePagination && <Pagination />}
          </>
        }
      </div>
    ),
    [fixedTableHeight]
  );

  return MemoisedContent;
};

export default React.memo(View);
