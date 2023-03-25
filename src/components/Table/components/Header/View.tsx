import React from "react";
import { useStore } from "../../../../store/store";
import Filter from "./components/Filter";
import Search from "./components/Search";
import styles from "./styles.module.css";
const View = () => {
  const [{ searchAccessors, filters }] = useStore();
  const filterOptions = React.useMemo(
    () => Object.keys(filters).length,
    [filters]
  );

  return (
    <div
      className={`${styles.container} ${
        searchAccessors.length > 0 || filterOptions > 0
          ? "tableHeaderContainer"
          : ""
      }`}
    >
      <Search />
      <Filter />
    </div>
  );
};

export default React.memo(View);
