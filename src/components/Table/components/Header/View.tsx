import React from "react";
import Filter from "./components/Filter";
import Search from "./components/Search";
import styles from "./styles.module.css";
const View = () => {
  return (
    <div className={`${styles.container} tableHeaderContainer`}>
      <Search />
      <Filter />
    </div>
  );
};

export default React.memo(View);
