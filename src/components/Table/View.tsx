import React from "react";
import { ITableView } from "../../interafaces/blocks";
import { ActionTypes } from "../../store/actions";
import { useStore } from "../../store/store";
import { Body } from "./components/Body";
import Checkbox from "./components/Checkbox";
import { Head } from "./components/Head";
import Header from "./components/Header";
import Pagination from "./components/Pagination";
import styles from "./styles.module.css";
const View: React.FC<ITableView> = ({
  numberOfRows,
  usePagination,
  uniqueDataField,
  searchPlaceholder,
  canSelectRows,
  handleRowSelection,
  styleVariables,
}) => {
  const [state, dispatch] = useStore();
  const tableRef = React.useRef<HTMLDivElement | null>(null);
  const { pageNumber, columns, mounted, stylesheet } = state;

  React.useEffect(() => {
    if (!mounted) return;
    dispatch({ type: ActionTypes.SET_NO_OF_ROWS, payload: numberOfRows });
    dispatch({ type: ActionTypes.SET_PAGE_NO, payload: 1 });
  }, [numberOfRows]);

  React.useEffect(() => {
    let newStyleVariables = { ...stylesheet };
    if (styleVariables) {
      let validObject = Object.keys(styleVariables).length > 0;
      if (validObject)
        newStyleVariables = { ...newStyleVariables, ...styleVariables };
    }
    Object.entries(newStyleVariables).map(([k, v]) => {
      document.documentElement.style.setProperty(`--${k}`, v);
    });
  }, [styleVariables]);

  React.useEffect(() => {
    if (!mounted) return;
    dispatch({
      type: ActionTypes.UPDATE_PROPS,
      payload: {
        uniqueDataField,
        usePagination,
        searchPlaceholder: searchPlaceholder || "Search here ...",
      },
    });
  }, [uniqueDataField, usePagination, searchPlaceholder]);

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
  }, [canSelectRows]);

  React.useEffect(() => {
    if (tableRef.current) {
      tableRef.current.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [pageNumber]);

  const MemoisedContent = React.useMemo(
    () => (
      <div className={styles.container}>
        {
          <>
            <Header />
            <div className={styles["tableContainer"]} ref={tableRef}>
              <table className={styles.table}>
                <Head />
                <Body />
              </table>
            </div>
            {usePagination && <Pagination />}
          </>
        }
      </div>
    ),
    []
  );

  return MemoisedContent;
};

export default React.memo(View);
