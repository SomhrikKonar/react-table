import React from "react";
import { ISearch } from "../../../../../../interafaces/blocks";
import { useStore } from "../../../../../../store/store";
import styles from "./styles.module.css";
const View: React.FC<ISearch> = ({ search, handleSearch }) => {
  const [{ searchPlaceholder }] = useStore();
  return (
    <div className={styles.contaienr}>
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
