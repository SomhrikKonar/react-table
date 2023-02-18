import React from "react";
import { ISearch } from "../../../../../../interafaces/blocks";
import { useStore } from "../../../../../../store/store";
import styles from "./styles.module.css";
import icon from "../../../../../../assests/Search.svg";
const View: React.FC<ISearch> = ({ search, handleSearch }) => {
  const [{ searchPlaceholder, searchAccessors }] = useStore();
  return searchAccessors.length > 0 ? (
    <div className={`${styles.container} tableSearchbar`}>
      <img src={icon} alt="search" />
      <input
        type="text"
        placeholder={searchPlaceholder}
        value={search}
        onChange={handleSearch}
      />
    </div>
  ) : (
    <></>
  );
};

export default React.memo(View);
