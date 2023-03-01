import React from "react";
import { IEmptyBody } from "../../../../interafaces/blocks";
import { useStore } from "../../../../store/store";
import styles from "../../styles.module.css";
const View = ({ tableRef }: IEmptyBody) => {
  const [{ current, loading, fixedTableHeight, loadingComponent }] = useStore();
  React.useEffect(() => {
    if (!tableRef.current) return;
    const tableRef_childrens = tableRef.current.getElementsByTagName("table");
    if (tableRef_childrens.length === 0) return;
    let table = tableRef_childrens[0];
    if (current.length === 0 || loading) {
      table.style.height = "auto";
    } else {
      table.style.height = "100%";
    }
  }, [current, loading]);
  return loading || current.length === 0 ? (
    <div
      className={styles.emptyBody}
      style={{
        height: fixedTableHeight
          ? "calc(100% - 45px)"
          : "var(--empty-cell-height)",
      }}
    >
      {loading ? loadingComponent || "Loading" : "No Rows Found"}
    </div>
  ) : (
    <></>
  );
};

export default React.memo(View);
