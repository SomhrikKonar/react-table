import React from "react";
import { ISearch } from "../../../../../../interafaces/blocks";
import { useStore } from "../../../../../../store/store";
import styles from "./styles.module.css";
import icon from "../../../../../../assests/Search.svg";
const View: React.FC<ISearch> = ({ search, handleSearch }) => {
  const [{ searchPlaceholder }] = useStore();
  return (
    <div className={styles.container}>
      <img src={icon} alt="search" />
      <input
        type="text"
        placeholder={searchPlaceholder}
        value={search}
        onChange={handleSearch}
      />
    </div>
  );
};

export default React.memo(View);
